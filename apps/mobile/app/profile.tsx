import { useQuery } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen } from "@nija-to-native/ui";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";
import { getHome } from "../src/services/api";

export default function ProfileScreen() {
  const { data } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });
  const preferredSpeaker = data?.modelSpeakers.find(
    (speaker) => speaker.id === data.userProfile.preferredSpeakerId,
  );

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Settings
          </AppText>
          <AppText variant="title">Profile</AppText>
          <AppText muted>Mock settings for the production MVP shell.</AppText>
        </View>

        <Card style={styles.card}>
          <Badge tone="primary">Preferred speaker</Badge>
          <AppText variant="subtitle">{preferredSpeaker?.name ?? "Clear Professional"}</AppText>
          <AppText muted>
            Changeable later from settings once persisted profile storage is wired.
          </AppText>
        </Card>

        <Card style={styles.card}>
          <AppText variant="subtitle">Daily reminder</AppText>
          <AppText muted>
            {data?.userProfile.reminderTime ?? "08:30"} in{" "}
            {data?.userProfile.timezone ?? "your timezone"}
          </AppText>
        </Card>

        <Card style={styles.card}>
          <AppText variant="subtitle">Privacy</AppText>
          <AppText muted>
            Recordings are private by default. Account deletion and recording cleanup will be wired
            with auth/storage.
          </AppText>
        </Card>

        <Link href="/" asChild>
          <PrimaryButton>Back to home</PrimaryButton>
        </Link>
      </ScrollView>
      <BottomNav />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 20,
    paddingTop: 72,
  },
  content: {
    gap: 18,
    paddingBottom: 18,
  },
  header: {
    gap: 8,
  },
  card: {
    gap: 8,
  },
});
