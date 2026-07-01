import { useMutation } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen, SecondaryButton } from "@nija-to-native/ui";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";
import { completeMediaUpload, createMediaUploadUrl } from "../src/services/api";

const sampleAudio = {
  fileName: "team-update-practice.m4a",
  contentType: "audio/mp4" as const,
  fileSizeBytes: 1_864_204,
  durationSeconds: 48,
};

export default function UploadAudioScreen() {
  const router = useRouter();
  const uploadFlow = useMutation({
    mutationFn: async () => {
      const upload = await createMediaUploadUrl(sampleAudio);

      return completeMediaUpload(upload.media.id);
    },
    onSuccess: (response) => {
      router.push({
        pathname: "/media/[mediaId]",
        params: { mediaId: response.data.id },
      });
    },
  });

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Upload audio
          </AppText>
          <AppText variant="title">Choose clear speech</AppText>
          <AppText muted>
            Audio-first keeps the MVP fast and cheaper while we validate the shadowing loop.
          </AppText>
        </View>

        <Card style={styles.card}>
          <Badge tone="primary">MVP guidance</Badge>
          <AppText variant="subtitle">Best files for practice</AppText>
          <AppText muted>
            Use clear audio with one main speaker, low background noise, and steady volume. MVP
            uploads support mp3, m4a, and wav up to 100MB or 10 minutes.
          </AppText>
        </Card>

        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <Badge tone="accent">Mock upload</Badge>
            <AppText variant="caption" muted>
              {sampleAudio.durationSeconds}s
            </AppText>
          </View>
          <AppText variant="subtitle">{sampleAudio.fileName}</AppText>
          <AppText muted>
            This button exercises the signed-upload API shape and opens the player with sample
            transcript data. A real file picker can plug into the same service function later.
          </AppText>
          <PrimaryButton disabled={uploadFlow.isPending} onPress={() => uploadFlow.mutate()}>
            {uploadFlow.isPending ? "Preparing audio" : "Use sample audio"}
          </PrimaryButton>
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
  rowBetween: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
});
