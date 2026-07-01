import { useQuery } from "@tanstack/react-query";
import {
  AppText,
  Badge,
  Card,
  Screen,
  PrimaryButton,
  SecondaryButton,
  useAppTheme,
} from "@nija-to-native/ui";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { BottomNav } from "../src/components/BottomNav";
import { getHome } from "../src/services/api";

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export default function HomeScreen() {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const carouselCardWidth = Math.min(width - 56, 360);
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });
  const recentMedia = data?.recentMedia[0];

  return (
    <Screen style={styles.screen}>
      <StatusBar style={theme.name === "dark" ? "light" : "dark"} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View
            style={[
              styles.heroPanel,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: "#0B1110",
                shadowOffset: { width: 0, height: 14 },
                shadowOpacity: theme.name === "dark" ? 0 : 0.08,
                shadowRadius: 28,
                elevation: theme.name === "dark" ? 0 : 3,
              },
            ]}
          >
            <View style={styles.rowBetween}>
              <View style={styles.heroTitleGroup}>
                <AppText
                  variant="caption"
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "700",
                  }}
                >
                  ShadowTech
                </AppText>
                <AppText
                  variant="title"
                  style={{
                    color: theme.colors.textPrimary,
                  }}
                >
                  Start practice
                </AppText>
              </View>
              <View
                style={[
                  styles.profileDot,
                  {
                    backgroundColor: theme.colors.primaryMuted,
                    borderColor: theme.colors.primaryMuted,
                  },
                ]}
              >
                <AppText
                  variant="caption"
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "700",
                  }}
                >
                  DT
                </AppText>
              </View>
            </View>
            <AppText
              style={{
                color: theme.colors.textSecondary,
              }}
            >
              {isLoading
                ? "Loading your daily practice..."
                : "Bring in real speech, follow the words, shadow a short section, and retry."}
            </AppText>
            <View
              style={[
                styles.practicePill,
                {
                  backgroundColor: theme.colors.surfaceMuted,
                },
              ]}
            >
              <View style={styles.flex}>
                <AppText variant="caption" muted>
                  MVP loop
                </AppText>
                <AppText style={{ fontWeight: "700" }}>
                  Add media, select a section, record, improve
                </AppText>
              </View>
              <Link href="/sound-bank" asChild>
                <SecondaryButton style={styles.pillAction}>Sound Bank</SecondaryButton>
              </Link>
            </View>
            {data ? (
              <View
                style={[
                  styles.compactStreak,
                  {
                    backgroundColor: theme.colors.surfaceMuted,
                  },
                ]}
              >
                <View style={styles.flex}>
                  <AppText
                    variant="caption"
                    style={{
                      color: theme.colors.textSecondary,
                      fontWeight: "700",
                    }}
                  >
                    {data.weeklyStreak.currentStreakCount} day streak
                  </AppText>
                </View>
                <View style={styles.compactStreakDays}>
                  {data.weeklyStreak.days.map((day, index) => (
                    <View
                      key={day.date}
                      style={[
                        styles.compactStreakDot,
                        {
                          backgroundColor: day.openedApp
                            ? theme.colors.primaryMuted
                            : "transparent",
                          borderColor: day.openedApp
                            ? theme.colors.primaryMuted
                            : theme.colors.border,
                        },
                      ]}
                    >
                      <AppText
                        variant="caption"
                        style={{
                          color: day.openedApp
                            ? theme.colors.primary
                            : theme.name === "dark"
                              ? theme.colors.textMuted
                              : theme.colors.textSecondary,
                          fontWeight: "700",
                        }}
                      >
                        {day.openedApp ? "●" : dayLabels[index]}
                      </AppText>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.pageContent}>
          {data ? (
            <>
              <View style={styles.sectionHeader}>
                <AppText variant="subtitle">Add media</AppText>
                <AppText variant="caption" muted>
                  Swipe for YouTube, upload, or recent practice
                </AppText>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={carouselCardWidth + 14}
                decelerationRate="fast"
                contentContainerStyle={styles.carouselContent}
              >
                <Card style={[styles.practiceCard, { width: carouselCardWidth }]}>
                  <View style={[styles.cardAccent, { backgroundColor: theme.colors.primary }]} />
                  <View style={styles.rowBetween}>
                    <Badge tone="primary">YouTube</Badge>
                    <AppText variant="caption" muted>
                      Validate first
                    </AppText>
                  </View>
                  <AppText variant="display">Paste a clip</AppText>
                  <AppText muted>
                    Check a public YouTube video, preview it, then open the transcript practice
                    player when it can be used.
                  </AppText>
                  <Link href="/add-youtube" asChild>
                    <PrimaryButton>Paste YouTube link</PrimaryButton>
                  </Link>
                </Card>

                <Card style={[styles.practiceCard, { width: carouselCardWidth }]}>
                  <View style={[styles.cardAccent, { backgroundColor: theme.colors.accent }]} />
                  <View style={styles.rowBetween}>
                    <Badge tone="accent">Audio upload</Badge>
                    <AppText variant="caption" muted>
                      MVP
                    </AppText>
                  </View>
                  <AppText variant="subtitle">Upload clear speech</AppText>
                  <AppText muted>
                    Start with mp3, m4a, or wav. The mock flow creates a signed upload and opens the
                    player with transcript data.
                  </AppText>
                  <Link href="/upload-audio" asChild>
                    <SecondaryButton>Upload audio</SecondaryButton>
                  </Link>
                </Card>

                <Card style={[styles.practiceCard, { width: carouselCardWidth }]}>
                  <View style={[styles.cardAccent, { backgroundColor: theme.colors.warning }]} />
                  <View style={styles.rowBetween}>
                    <Badge tone="warning">Continue</Badge>
                    <AppText variant="caption" muted>
                      {recentMedia?.durationSeconds ? `${recentMedia.durationSeconds}s` : "Recent"}
                    </AppText>
                  </View>
                  <AppText variant="subtitle">{recentMedia?.title ?? "Recent practice"}</AppText>
                  <AppText muted>
                    Jump back into the transcript player, select a short section, and shadow it
                    again for feedback.
                  </AppText>
                  {recentMedia ? (
                    <Link
                      href={{
                        pathname: "/media/[mediaId]",
                        params: { mediaId: recentMedia.id },
                      }}
                      asChild
                    >
                      <SecondaryButton>Open player</SecondaryButton>
                    </Link>
                  ) : (
                    <Link href="/add-youtube" asChild>
                      <SecondaryButton>Add practice media</SecondaryButton>
                    </Link>
                  )}
                </Card>
              </ScrollView>

              <View style={styles.sectionHeader}>
                <AppText variant="subtitle">Practice skills</AppText>
                <AppText variant="caption" muted>
                  Fast paths for daily work
                </AppText>
              </View>

              <View style={styles.quickActionRow}>
                <Link href="/add-youtube" asChild>
                  <Pressable style={styles.quickAction}>
                    <View
                      style={[styles.quickIcon, { backgroundColor: theme.colors.streakBackground }]}
                    >
                      <AppText style={[styles.quickIconText, { color: theme.colors.streakIcon }]}>
                        YT
                      </AppText>
                    </View>
                    <AppText variant="caption" style={styles.quickLabel}>
                      YouTube
                    </AppText>
                  </Pressable>
                </Link>
                <Link href="/sound-bank" asChild>
                  <Pressable style={styles.quickAction}>
                    <View
                      style={[styles.quickIcon, { backgroundColor: theme.colors.surfaceMuted }]}
                    >
                      <AppText style={[styles.quickIconText, { color: theme.colors.primary }]}>
                        EE
                      </AppText>
                    </View>
                    <AppText variant="caption" style={styles.quickLabel}>
                      Sounds
                    </AppText>
                  </Pressable>
                </Link>
                <Link href="/progress" asChild>
                  <Pressable style={styles.quickAction}>
                    <View style={[styles.quickIcon, { backgroundColor: theme.colors.primary }]}>
                      <AppText style={[styles.quickIconText, { color: theme.colors.primaryText }]}>
                        %
                      </AppText>
                    </View>
                    <AppText variant="caption" style={styles.quickLabel}>
                      Progress
                    </AppText>
                  </Pressable>
                </Link>
                <Link href="/upload-audio" asChild>
                  <Pressable style={styles.quickAction}>
                    <View style={[styles.quickIcon, { backgroundColor: theme.colors.accentMuted }]}>
                      <AppText style={[styles.quickIconText, { color: theme.colors.textPrimary }]}>
                        UP
                      </AppText>
                    </View>
                    <AppText variant="caption" style={styles.quickLabel}>
                      Upload
                    </AppText>
                  </Pressable>
                </Link>
              </View>
            </>
          ) : (
            <Card style={styles.practiceCard}>
              <AppText variant="subtitle">Preparing your practice</AppText>
              <AppText muted>
                Mock content will appear here once the app data layer is ready.
              </AppText>
            </Card>
          )}
        </View>
      </ScrollView>
      <BottomNav />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    paddingBottom: 20,
  },
  content: {
    paddingBottom: 18,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  heroPanel: {
    borderRadius: 28,
    gap: 16,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 56,
  },
  heroTitleGroup: {
    flex: 1,
    gap: 4,
  },
  profileDot: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  practicePill: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 12,
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  pillAction: {
    minHeight: 42,
    paddingHorizontal: 16,
  },
  pageContent: {
    gap: 18,
  },
  sectionHeader: {
    gap: 2,
    paddingHorizontal: 20,
  },
  carouselContent: {
    gap: 14,
    paddingHorizontal: 20,
  },
  practiceCard: {
    gap: 14,
    minHeight: 326,
    overflow: "hidden",
    paddingTop: 20,
  },
  cardAccent: {
    borderBottomLeftRadius: 999,
    borderTopLeftRadius: 999,
    height: 64,
    position: "absolute",
    right: 0,
    top: 28,
    width: 6,
  },
  compactStreak: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 12,
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  compactStreakDays: {
    flexDirection: "row",
    gap: 6,
  },
  compactStreakDot: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  rowBetween: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
  lineList: {
    gap: 8,
  },
  quickActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  quickAction: {
    alignItems: "center",
    gap: 8,
    width: 72,
  },
  quickIcon: {
    alignItems: "center",
    borderRadius: 999,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  quickIconText: {
    fontWeight: "800",
  },
  quickLabel: {
    fontWeight: "700",
    textAlign: "center",
  },
});
