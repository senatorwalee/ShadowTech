import { useMutation } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen, SecondaryButton } from "@nija-to-native/ui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../../src/components/BottomNav";
import { evaluateAttempt } from "../../src/services/api";

export default function FeedbackScreen() {
  const router = useRouter();
  const { attemptId } = useLocalSearchParams<{ attemptId: string }>();
  const safeAttemptId = attemptId ?? "attempt_pending_media_shadowing";
  const evaluation = useMutation({
    mutationFn: evaluateAttempt,
  });
  const result = evaluation.data?.evaluation;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Private feedback
          </AppText>
          <AppText variant="title">Shadowing score</AppText>
          <AppText muted>
            This keeps the MVP focused on useful coaching, not public posting or permanent audio
            storage.
          </AppText>
        </View>

        {result ? (
          <>
            <Card style={styles.scoreCard}>
              <Badge tone="success">Evaluation complete</Badge>
              <AppText variant="display">{result.overallScore ?? result.overallClarity}%</AppText>
              <AppText muted>
                {result.feedbackMessage ?? result.coachingFeedback.positiveNote}
              </AppText>
            </Card>

            <View style={styles.grid}>
              <Metric
                label="Pronunciation"
                value={result.pronunciationScore ?? result.pronunciationMatch}
              />
              <Metric label="Timing" value={result.timingScore ?? result.rhythmPacing} />
              <Metric
                label="Word accuracy"
                value={result.wordAccuracyScore ?? result.overallClarity}
              />
            </View>

            <Card style={styles.card}>
              <AppText variant="subtitle">Retry focus</AppText>
              <AppText muted>{result.coachingFeedback.retryFocus}</AppText>
              {result.unclearWords.length ? (
                <AppText variant="caption" muted>
                  Unclear words: {result.unclearWords.join(", ")}
                </AppText>
              ) : null}
            </Card>
          </>
        ) : (
          <Card style={styles.card}>
            <Badge tone="accent">Ready</Badge>
            <AppText variant="subtitle">Evaluate your attempt</AppText>
            <AppText muted>
              The mock API returns overall score, pronunciation, timing, word accuracy, unclear
              words, and a friendly retry focus.
            </AppText>
            <PrimaryButton
              disabled={evaluation.isPending}
              onPress={() => evaluation.mutate(safeAttemptId)}
            >
              {evaluation.isPending ? "Checking speech" : "Show feedback"}
            </PrimaryButton>
          </Card>
        )}

        <View style={styles.actions}>
          <SecondaryButton onPress={() => router.back()}>Retry</SecondaryButton>
          <Link href="/" asChild>
            <PrimaryButton>Back home</PrimaryButton>
          </Link>
        </View>
      </ScrollView>
      <BottomNav />
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Card style={styles.metricCard}>
      <AppText variant="caption" muted>
        {label}
      </AppText>
      <AppText variant="title">{value}</AppText>
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
    gap: 12,
  },
  scoreCard: {
    gap: 12,
  },
  grid: {
    gap: 10,
  },
  metricCard: {
    gap: 4,
  },
  actions: {
    gap: 10,
  },
});
