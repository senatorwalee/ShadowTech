import { useQuery } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen, useAppTheme } from "@nija-to-native/ui";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";
import { getSoundLessons } from "../src/services/api";

export default function SoundBankScreen() {
  const theme = useAppTheme();
  const { data, isLoading } = useQuery({
    queryKey: ["sound-lessons"],
    queryFn: getSoundLessons,
  });

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Targeted practice
          </AppText>
          <AppText variant="title">Sound Bank</AppText>
          <AppText muted>
            Short lessons for the sounds that affect clarity inside real speech.
          </AppText>
        </View>

        {isLoading ? (
          <Card style={styles.card}>
            <AppText variant="subtitle">Loading lessons</AppText>
            <AppText muted>Preparing sound practice.</AppText>
          </Card>
        ) : null}

        {data?.data.map((lesson) => (
          <Card key={lesson.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Badge tone="primary">{lesson.soundKey}</Badge>
              <Badge tone="warning">{lesson.visualGuide.status}</Badge>
            </View>
            <AppText variant="subtitle">{lesson.title}</AppText>
            <AppText muted>{lesson.overview}</AppText>
            <View style={styles.metaRow}>
              <AppText variant="caption" muted>
                {lesson.wordDrills.length} word drills
              </AppText>
              <AppText variant="caption" muted>
                {lesson.minimalPairDrills.length} pair drills
              </AppText>
              <AppText variant="caption" muted>
                {lesson.sentencePractice.length} sentences
              </AppText>
            </View>
            <Link
              href={{
                pathname: "/sound-lessons/[soundLessonId]",
                params: { soundLessonId: lesson.id },
              }}
              asChild
            >
              <PrimaryButton>Open lesson</PrimaryButton>
            </Link>
          </Card>
        ))}

        <Link href="/" style={[styles.link, { color: theme.colors.primary }]}>
          Back to Today&apos;s Speech
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
  rowBetween: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  link: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
