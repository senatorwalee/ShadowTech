import { useMutation } from "@tanstack/react-query";
import { AppText, Badge, Card, PrimaryButton, Screen, SecondaryButton } from "@nija-to-native/ui";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";
import { createYouTubeMedia, validateYouTubeLink } from "../src/services/api";

const sampleUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default function AddYouTubeScreen() {
  const router = useRouter();
  const [url, setUrl] = useState(sampleUrl);
  const validation = useMutation({
    mutationFn: validateYouTubeLink,
  });
  const createMedia = useMutation({
    mutationFn: createYouTubeMedia,
    onSuccess: (response) => {
      router.push({
        pathname: "/media/[mediaId]",
        params: { mediaId: response.data.id },
      });
    },
  });

  const result = validation.data?.data;
  const canUseVideo = Boolean(result?.valid && result.videoId);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Add real speech
          </AppText>
          <AppText variant="title">Paste a YouTube link</AppText>
          <AppText muted>
            We validate the video first, then prepare a practice player when captions are available.
          </AppText>
        </View>

        <Card style={styles.card}>
          <AppText variant="caption" muted>
            YouTube URL
          </AppText>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            onChangeText={setUrl}
            placeholder="https://www.youtube.com/watch?v=..."
            style={styles.input}
            value={url}
          />
          <PrimaryButton disabled={validation.isPending} onPress={() => validation.mutate(url)}>
            {validation.isPending ? "Checking video" : "Check video"}
          </PrimaryButton>
        </Card>

        {result ? (
          <Card style={styles.card}>
            <View style={styles.rowBetween}>
              <Badge tone={canUseVideo ? "success" : "warning"}>
                {canUseVideo ? "Looks good" : "Needs another link"}
              </Badge>
              {result.durationSeconds ? (
                <AppText variant="caption" muted>
                  {result.durationSeconds}s
                </AppText>
              ) : null}
            </View>
            <AppText variant="subtitle">
              {result.title ?? result.reason ?? "We could not use this video."}
            </AppText>
            <AppText muted>
              {canUseVideo
                ? "This mock flow will create a media record and open the transcript player. Real caption checks will be wired to the backend provider later."
                : "Try another public YouTube video under the MVP duration limit."}
            </AppText>
            {canUseVideo ? (
              <PrimaryButton
                disabled={createMedia.isPending}
                onPress={() => createMedia.mutate(url)}
              >
                {createMedia.isPending ? "Preparing practice" : "Use this video"}
              </PrimaryButton>
            ) : null}
          </Card>
        ) : null}

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
  input: {
    borderColor: "#D8DFDA",
    borderRadius: 16,
    borderWidth: 1,
    color: "#1F2933",
    fontSize: 16,
    minHeight: 54,
    paddingHorizontal: 16,
  },
  rowBetween: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
});
