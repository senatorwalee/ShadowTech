import { useQuery } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen } from "@nija-to-native/ui";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";
import { getProgress } from "../src/services/api";

export default function ProgressScreen() {
  const { data } = useQuery({
    queryKey: ["progress"],
    queryFn: getProgress,
  });

  const firstEvaluation = data?.evaluations.find(
    (evaluation) => evaluation.attemptId === data.progress.firstAttemptId,
  );
  const latestEvaluation = data?.evaluations.find(
    (evaluation) => evaluation.attemptId === data.progress.latestAttemptId,
  );
  const bestEvaluation = data?.evaluations.find(
    (evaluation) => evaluation.attemptId === data.progress.bestAttemptId,
  );

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Private progress
          </AppText>
          <AppText variant="title">Progress proof</AppText>
          <AppText muted>
            Compare your first, latest, and best attempts without posting anything publicly.
          </AppText>
        </View>

        <Card style={styles.card}>
          <Badge tone="success">Improvement</Badge>
          <AppText variant="subtitle">
            {data?.progress.recentImprovementMessage ??
              "Complete a scored attempt to see progress."}
          </AppText>
          {typeof data?.progress.scoreDelta === "number" ? (
            <AppText muted>Score change: +{data.progress.scoreDelta}</AppText>
          ) : null}
        </Card>

        <View style={styles.grid}>
          <ProgressCard label="First attempt" score={firstEvaluation?.overallClarity} />
          <ProgressCard label="Latest attempt" score={latestEvaluation?.overallClarity} />
          <ProgressCard label="Best attempt" score={bestEvaluation?.overallClarity} />
        </View>

        <Card style={styles.card}>
          <AppText variant="subtitle">Saved recordings</AppText>
          <AppText muted>
            Recording replay cards will land here when upload and private R2 playback are wired.
          </AppText>
        </Card>

        <Link href="/" asChild>
          <PrimaryButton>Practice again</PrimaryButton>
        </Link>
      </ScrollView>
      <BottomNav />
    </Screen>
  );
}

function ProgressCard({ label, score }: { label: string; score?: number }) {
  return (
    <Card style={styles.progressCard}>
      <AppText variant="caption" muted>
        {label}
      </AppText>
      <AppText variant="title">{score ?? "--"}</AppText>
      <AppText variant="caption" muted>
        Overall clarity
      </AppText>
    </Card>
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
  grid: {
    gap: 10,
  },
  progressCard: {
    gap: 4,
  },
});
