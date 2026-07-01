import { mockModelSpeakers } from "@nija-to-native/shared";
import {
  AppText,
  Badge,
  Card,
  PrimaryButton,
  Screen,
  SecondaryButton,
  useAppTheme,
} from "@nija-to-native/ui";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";

const tracks = [
  { id: "professional", label: "Professional", detail: "Meetings, updates, and workplace clarity" },
  { id: "interview", label: "Interview", detail: "Answers, stories, and confident delivery" },
  { id: "school", label: "School", detail: "Class, presentations, and group work" },
  { id: "daily_life", label: "Daily Life", detail: "Calls, appointments, errands, and support" },
  { id: "social", label: "Social", detail: "Introductions, small talk, and casual stories" },
] as const;

const confidenceLevels = [
  { id: "asked_to_repeat", label: "I get asked to repeat myself" },
  { id: "want_clearer", label: "I am understood, but I want to sound clearer" },
  { id: "polish_delivery", label: "I want to polish rhythm and delivery" },
] as const;

export default function OnboardingScreen() {
  const theme = useAppTheme();
  const [trackId, setTrackId] = useState<(typeof tracks)[number]["id"]>("professional");
  const [confidenceId, setConfidenceId] =
    useState<(typeof confidenceLevels)[number]["id"]>("want_clearer");
  const [dailyGoal, setDailyGoal] = useState(10);
  const [speakerId, setSpeakerId] = useState(mockModelSpeakers[0]?.id ?? "");

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Setup
          </AppText>
          <AppText variant="title">Make practice feel personal</AppText>
          <AppText muted>
            Choose a goal, reminder, and model speaker. The diagnostic will come next.
          </AppText>
        </View>

        <Card style={styles.card}>
          <AppText variant="subtitle">What are you practicing for?</AppText>
          <View style={styles.optionList}>
            {tracks.map((track) => {
              const isSelected = track.id === trackId;

              return (
                <Pressable
                  key={track.id}
                  accessibilityRole="button"
                  onPress={() => setTrackId(track.id)}
                  style={[
                    styles.option,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.surfaceMuted
                        : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : "transparent",
                    },
                  ]}
                >
                  <View style={styles.optionText}>
                    <AppText>{track.label}</AppText>
                    <AppText variant="caption" muted>
                      {track.detail}
                    </AppText>
                  </View>
                  {isSelected ? <Badge tone="primary">Selected</Badge> : null}
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card style={styles.card}>
          <AppText variant="subtitle">How does speaking feel right now?</AppText>
          <View style={styles.optionList}>
            {confidenceLevels.map((level) => (
              <SecondaryButton key={level.id} onPress={() => setConfidenceId(level.id)}>
                {confidenceId === level.id ? "Selected: " : ""}
                {level.label}
              </SecondaryButton>
            ))}
          </View>
        </Card>

        <Card style={styles.card}>
          <AppText variant="subtitle">Daily goal</AppText>
          <View style={styles.segmentedRow}>
            {[5, 10, 15].map((minutes) => (
              <Pressable
                key={minutes}
                accessibilityRole="button"
                onPress={() => setDailyGoal(minutes)}
                style={[
                  styles.segment,
                  {
                    backgroundColor:
                      dailyGoal === minutes ? theme.colors.primary : theme.colors.surface,
                    borderColor: dailyGoal === minutes ? theme.colors.primary : "transparent",
                  },
                ]}
              >
                <AppText
                  style={{
                    color:
                      dailyGoal === minutes ? theme.colors.primaryText : theme.colors.textPrimary,
                    fontWeight: "700",
                  }}
                >
                  {minutes} min
                </AppText>
              </Pressable>
            ))}
          </View>
          <AppText variant="caption" muted>
            Reminder placeholder: 8:30 AM daily.
          </AppText>
        </Card>

        <Card style={styles.card}>
          <AppText variant="subtitle">Choose your model speaker</AppText>
          <AppText muted>
            This becomes your default voice for Today&apos;s Speech and custom practice.
          </AppText>
          <View style={styles.optionList}>
            {mockModelSpeakers.map((speaker) => {
              const isSelected = speaker.id === speakerId;

              return (
                <Pressable
                  key={speaker.id}
                  accessibilityRole="button"
                  onPress={() => setSpeakerId(speaker.id)}
                  style={[
                    styles.option,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.surfaceMuted
                        : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : "transparent",
                    },
                  ]}
                >
                  <View style={styles.optionText}>
                    <AppText>{speaker.name}</AppText>
                    <AppText variant="caption" muted>
                      Preview sample will play here once model audio is connected.
                    </AppText>
                  </View>
                  {isSelected ? <Badge tone="primary">Default</Badge> : null}
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card style={styles.card}>
          <AppText variant="subtitle">Baseline recording</AppText>
          <AppText muted>
            Next build: a short private passage that recommends Sound Bank practice areas.
          </AppText>
        </Card>

        <Link href="/" asChild>
          <PrimaryButton>Save mock setup</PrimaryButton>
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
  optionList: {
    gap: 10,
  },
  option: {
    alignItems: "flex-start",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 12,
  },
  optionText: {
    flex: 1,
    gap: 4,
  },
  segmentedRow: {
    flexDirection: "row",
    gap: 8,
  },
  segment: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
  },
});
