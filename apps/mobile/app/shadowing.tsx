import { useMutation } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen, SecondaryButton } from "@nija-to-native/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";
import { completeAttemptUpload, createAttemptUploadUrl } from "../src/services/api";

function toNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

export default function ShadowingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    mediaId?: string;
    startWordIndex?: string;
    endWordIndex?: string;
    startMs?: string;
    endMs?: string;
    selectedText?: string;
  }>();
  const mediaId = params.mediaId ?? "media_youtube_confident_intro";
  const practiceSection = {
    mediaId,
    startWordIndex: toNumber(params.startWordIndex, 0),
    endWordIndex: toNumber(params.endWordIndex, 11),
    startMs: toNumber(params.startMs, 0),
    endMs: toNumber(params.endMs, 6000),
    selectedText:
      params.selectedText ?? "Hi, I am Daniel. I just joined the product team this week.",
  };
  const durationSeconds = Math.round((practiceSection.endMs - practiceSection.startMs) / 1000);
  const recordFlow = useMutation({
    mutationFn: async () => {
      const upload = await createAttemptUploadUrl({
        mediaId,
        practiceSection,
        contentType: "media_shadowing",
        contentTypeHeader: "audio/m4a",
      });
      await completeAttemptUpload(upload.attempt.id);

      return upload.attempt.id;
    },
    onSuccess: (attemptId) => {
      router.push({
        pathname: "/feedback/[attemptId]",
        params: { attemptId },
      });
    },
  });

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Speak along
          </AppText>
          <AppText variant="title">Shadow this section</AppText>
          <AppText muted>
            The original speaker plays while you record. This mock step exercises the upload and
            evaluation flow.
          </AppText>
        </View>

        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <Badge tone="primary">Selected section</Badge>
            <AppText variant="caption" muted>
              {durationSeconds}s
            </AppText>
          </View>
          <AppText variant="subtitle">Read with the speaker</AppText>
          <AppText>{practiceSection.selectedText}</AppText>
        </Card>

        <Card style={styles.recordCard}>
          <Badge tone="accent">Microphone mock</Badge>
          <AppText variant="subtitle">Ready to record</AppText>
          <AppText muted>
            Next, this button will request microphone permission and record real audio. For now it
            creates a temporary attempt and sends you to mock feedback.
          </AppText>
          <PrimaryButton disabled={recordFlow.isPending} onPress={() => recordFlow.mutate()}>
            {recordFlow.isPending ? "Uploading attempt" : "Start shadowing"}
          </PrimaryButton>
        </Card>

        <SecondaryButton onPress={() => router.back()}>Back to transcript</SecondaryButton>
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
    gap: 12,
  },
  recordCard: {
    gap: 12,
  },
  rowBetween: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
});
