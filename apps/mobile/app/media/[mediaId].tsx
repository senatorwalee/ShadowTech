import { useQuery } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen, SecondaryButton } from "@nija-to-native/ui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../../src/components/BottomNav";
import { getMedia, getMediaTranscript } from "../../src/services/api";

export default function MediaPlayerScreen() {
  const router = useRouter();
  const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
  const safeMediaId = mediaId ?? "media_youtube_confident_intro";
  const mediaQuery = useQuery({
    queryKey: ["media", safeMediaId],
    queryFn: () => getMedia(safeMediaId),
  });
  const transcriptQuery = useQuery({
    queryKey: ["media-transcript", safeMediaId],
    queryFn: () => getMediaTranscript(safeMediaId),
  });

  const media = mediaQuery.data?.data;
  const transcript = transcriptQuery.data?.data;
  const selectedSegment = transcript?.segments[0];
  const selectedText = selectedSegment?.text ?? transcript?.fullText ?? "";

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Practice player
          </AppText>
          <AppText variant="title">{media?.title ?? "Preparing media"}</AppText>
          <AppText muted>
            Follow the transcript, loop a short section, then shadow it for feedback.
          </AppText>
        </View>

        <Card style={styles.playerCard}>
          <View style={styles.rowBetween}>
            <Badge tone={media?.sourceType === "youtube" ? "primary" : "accent"}>
              {media?.sourceType ?? "media"}
            </Badge>
            <AppText variant="caption" muted>
              {media?.durationSeconds ? `${media.durationSeconds}s` : "--"}
            </AppText>
          </View>
          <View style={styles.mediaSurface}>
            <AppText variant="subtitle">Embedded player placeholder</AppText>
            <AppText muted>
              YouTube iframe or uploaded audio playback will attach here. Transcript timing is
              already flowing through the shared API contract.
            </AppText>
          </View>
          <View style={styles.controlsRow}>
            <SecondaryButton style={styles.controlButton}>Play</SecondaryButton>
            <SecondaryButton style={styles.controlButton}>0.75x</SecondaryButton>
            <SecondaryButton style={styles.controlButton}>Focus</SecondaryButton>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <Badge tone="warning">Selected section</Badge>
            <AppText variant="caption" muted>
              {selectedSegment
                ? `${Math.round((selectedSegment.endMs - selectedSegment.startMs) / 1000)}s`
                : "--"}
            </AppText>
          </View>
          <AppText variant="subtitle">Listen, loop, then shadow</AppText>
          <AppText muted>{selectedText || "Transcript is loading."}</AppText>
          <View style={styles.controlsRow}>
            <SecondaryButton style={styles.controlButton}>Listen</SecondaryButton>
            <SecondaryButton style={styles.controlButton}>Loop</SecondaryButton>
          </View>
          <Link
            href={{
              pathname: "/shadowing",
              params: {
                mediaId: safeMediaId,
                startWordIndex: String(selectedSegment?.startWordIndex ?? 0),
                endWordIndex: String(selectedSegment?.endWordIndex ?? 0),
                startMs: String(selectedSegment?.startMs ?? 0),
                endMs: String(selectedSegment?.endMs ?? 6000),
                selectedText,
              },
            }}
            asChild
          >
            <PrimaryButton>Shadow this section</PrimaryButton>
          </Link>
        </Card>

        <Card style={styles.card}>
          <AppText variant="subtitle">Transcript</AppText>
          <View style={styles.wordWrap}>
            {(transcript?.words ?? []).map((word, index) => (
              <View
                key={`${word.index}-${word.word}`}
                style={index === 0 ? styles.activeWord : styles.wordPill}
              >
                <AppText variant="caption" style={styles.wordText}>
                  {word.word}
                </AppText>
              </View>
            ))}
          </View>
        </Card>

        <SecondaryButton onPress={() => router.back()}>Back</SecondaryButton>
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
  playerCard: {
    gap: 14,
  },
  mediaSurface: {
    backgroundColor: "#E3F4F1",
    borderRadius: 18,
    gap: 8,
    minHeight: 172,
    padding: 18,
  },
  rowBetween: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  controlsRow: {
    flexDirection: "row",
    gap: 8,
  },
  controlButton: {
    flex: 1,
    minHeight: 44,
  },
  wordWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wordPill: {
    backgroundColor: "#F3F5F2",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  activeWord: {
    backgroundColor: "#FFF1ED",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  wordText: {
    fontWeight: "700",
  },
});
