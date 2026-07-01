import { useQuery } from "@tanstack/react-query";
import {
  AppText,
  Badge,
  Card,
  PrimaryButton,
  Screen,
  SecondaryButton,
  useAppTheme,
} from "@nija-to-native/ui";
import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomNav } from "../../src/components/BottomNav";
import { getSoundLesson } from "../../src/services/api";

export default function SoundLessonDetailScreen() {
  const theme = useAppTheme();
  const { soundLessonId } = useLocalSearchParams<{ soundLessonId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["sound-lesson", soundLessonId],
    queryFn: () => getSoundLesson(soundLessonId),
    enabled: Boolean(soundLessonId),
  });
  const lesson = data?.data;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="caption" muted>
            Sound lesson
          </AppText>
          <AppText variant="title">{lesson?.title ?? "Loading sound"}</AppText>
          <AppText muted>
            {lesson?.overview ?? "Preparing the word, pair, and sentence practice flow."}
          </AppText>
        </View>

        {isLoading ? (
          <Card style={styles.card}>
            <AppText variant="subtitle">Loading lesson</AppText>
            <AppText muted>Getting your sound practice ready.</AppText>
          </Card>
        ) : null}

        {lesson ? (
          <>
            <Card style={styles.card}>
              <View style={styles.rowBetween}>
                <Badge tone="primary">Coach video</Badge>
                <Badge tone="warning">Supplemental</Badge>
              </View>
              <AppText variant="subtitle">Watch a coach explain it</AppText>
              <AppText muted>
                The MVP will embed a curated YouTube video here when available, with an Open in
                YouTube fallback.
              </AppText>
              <SecondaryButton>
                {lesson.coachVideoId ? "YouTube placeholder ready" : "No video selected yet"}
              </SecondaryButton>
            </Card>

            <Card style={styles.card}>
              <View style={styles.rowBetween}>
                <Badge tone="accent">Visual guide</Badge>
                <Badge>{lesson.visualGuide.status}</Badge>
              </View>
              <View
                style={[
                  styles.visualPlaceholder,
                  {
                    backgroundColor: theme.colors.surfaceMuted,
                    borderColor: "transparent",
                  },
                ]}
              >
                <AppText variant="subtitle">{lesson.visualGuide.title}</AppText>
                <AppText muted>
                  {lesson.visualGuide.description ??
                    "Future 2D/3D mouth and tongue placement assets will appear here."}
                </AppText>
              </View>
            </Card>

            <Card style={styles.card}>
              <AppText variant="subtitle">Word-level practice</AppText>
              {lesson.wordDrills.map((drill) => (
                <View key={drill.id} style={styles.drillBlock}>
                  <Badge tone="primary">{drill.targetSound}</Badge>
                  <View style={styles.wrapRow}>
                    {drill.words.map((word) => (
                      <View
                        key={word}
                        style={[
                          styles.wordChip,
                          {
                            backgroundColor: theme.colors.surfaceMuted,
                            borderColor: "transparent",
                          },
                        ]}
                      >
                        <AppText>{word}</AppText>
                      </View>
                    ))}
                  </View>
                  <PrimaryButton>Evaluate word set</PrimaryButton>
                </View>
              ))}
            </Card>

            <Card style={styles.card}>
              <AppText variant="subtitle">Common mistaken sounds</AppText>
              {lesson.minimalPairDrills.map((drill) => (
                <View key={drill.id} style={styles.drillBlock}>
                  <AppText>{drill.title}</AppText>
                  <AppText variant="caption" muted>
                    Script: {drill.referenceScript}
                  </AppText>
                  <View style={styles.pairList}>
                    {Array.from(new Set(drill.pairs.map((pair) => pair.pairId))).map((pairId) => {
                      const pairWords = drill.pairs
                        .filter((pair) => pair.pairId === pairId)
                        .sort((a, b) => a.position - b.position)
                        .map((pair) => pair.expectedWord);

                      return (
                        <View key={pairId} style={styles.pairRow}>
                          <Badge>{pairId.replace("_", " / ")}</Badge>
                          <AppText muted>{pairWords.join(" -> ")}</AppText>
                        </View>
                      );
                    })}
                  </View>
                  <PrimaryButton>Evaluate pair set</PrimaryButton>
                </View>
              ))}
            </Card>

            <Card style={styles.card}>
              <AppText variant="subtitle">Sentence practice</AppText>
              {lesson.sentencePractice.map((sentence) => (
                <View key={sentence.id} style={styles.sentenceBlock}>
                  <AppText>“{sentence.sentence}”</AppText>
                  <AppText variant="caption" muted>
                    Feedback focus: {sentence.focusWords.join(", ")}
                  </AppText>
                  <AppText variant="caption" muted>
                    Contrast words: {sentence.contrastWords.join(", ")}
                  </AppText>
                </View>
              ))}
              <PrimaryButton>Evaluate focused sentences</PrimaryButton>
            </Card>
          </>
        ) : null}

        <Link href="/sound-bank" style={[styles.link, { color: theme.colors.primary }]}>
          Back to Sound Bank
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
    gap: 12,
  },
  rowBetween: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  visualPlaceholder: {
    borderRadius: 18,
    borderWidth: 0,
    gap: 8,
    minHeight: 160,
    padding: 16,
  },
  drillBlock: {
    gap: 12,
  },
  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wordChip: {
    borderRadius: 999,
    borderWidth: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pairList: {
    gap: 8,
  },
  pairRow: {
    gap: 4,
  },
  sentenceBlock: {
    gap: 4,
  },
  link: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
