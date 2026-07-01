import { z } from "zod";

export const practiceTrackSchema = z.enum([
  "professional",
  "interview",
  "school",
  "daily_life",
  "social",
]);

export const confidenceLevelSchema = z.enum(["asked_to_repeat", "want_clearer", "polish_delivery"]);

export const speakerStyleSchema = z.enum([
  "clear_professional",
  "conversational_natural",
  "slow_coaching",
]);

export const isoDateTimeSchema = z.string().datetime({ offset: true });
export const localDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/u);
export const clockTimeSchema = z.string().regex(/^\d{2}:\d{2}$/u);

export const userProfileSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().optional(),
  displayName: z.string().min(1).optional(),
  practiceTrack: practiceTrackSchema.optional(),
  confidenceLevel: confidenceLevelSchema.optional(),
  dailyGoalMinutes: z.union([z.literal(5), z.literal(10), z.literal(15)]).optional(),
  preferredSpeakerId: z.string().min(1).optional(),
  timezone: z.string().min(1).optional(),
  reminderTime: clockTimeSchema.optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const modelSpeakerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  style: speakerStyleSchema,
  previewAudioUrl: z.string().min(1).optional(),
});

export const speechLineSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().nonnegative(),
  text: z.string().min(1),
  targetWords: z.array(z.string()).default([]),
});

export const speechSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  track: practiceTrackSchema,
  scenario: z.string().min(1),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  durationSeconds: z.number().int().positive(),
  targetSounds: z.array(z.string()).default([]),
  rhythmFocus: z.string().optional(),
  lines: z.array(speechLineSchema).min(1),
  speakerAudio: z.record(z.string(), z.string().min(1)),
  isPublished: z.boolean(),
});

export const soundVisualGuideSchema = z.object({
  status: z.enum(["placeholder", "published"]),
  title: z.string().min(1),
  assetUrl: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const wordArrayDrillSchema = z.object({
  id: z.string().min(1),
  type: z.literal("word_array"),
  targetSound: z.string().min(1),
  words: z.array(z.string().min(1)).min(1),
  referenceScript: z.string().min(1),
});

export const minimalPairSchema = z.object({
  pairId: z.string().min(1),
  position: z.number().int().positive(),
  expectedWord: z.string().min(1),
  targetSound: z.string().min(1),
  contrastSound: z.string().min(1),
});

export const minimalPairDrillSchema = z.object({
  id: z.string().min(1),
  type: z.literal("minimal_pair"),
  title: z.string().min(1),
  pairs: z.array(minimalPairSchema).min(2),
  referenceScript: z.string().min(1),
});

export const sentencePracticeSchema = z.object({
  id: z.string().min(1),
  sentence: z.string().min(1),
  focusWords: z.array(z.string().min(1)).default([]),
  contrastWords: z.array(z.string().min(1)).default([]),
  referenceScript: z.string().min(1),
});

export const soundLessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  soundKey: z.string().min(1),
  overview: z.string().min(1),
  coachVideoId: z.string().min(1).optional(),
  backupCoachVideoIds: z.array(z.string().min(1)).default([]),
  visualGuide: soundVisualGuideSchema,
  wordDrills: z.array(wordArrayDrillSchema).default([]),
  minimalPairDrills: z.array(minimalPairDrillSchema).default([]),
  sentencePractice: z.array(sentencePracticeSchema).default([]),
  isPublished: z.boolean(),
});

export const mediaSourceTypeSchema = z.enum(["youtube", "upload"]);
export const mediaProcessingStatusSchema = z.enum([
  "pending_upload",
  "uploaded",
  "validating",
  "processing",
  "completed",
  "failed",
]);

export const mediaSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  sourceType: mediaSourceTypeSchema,
  sourceUrl: z.string().min(1).optional(),
  youtubeVideoId: z.string().min(1).optional(),
  audioObjectKey: z.string().min(1).optional(),
  title: z.string().min(1),
  thumbnailUrl: z.string().url().optional(),
  durationSeconds: z.number().positive().optional(),
  mimeType: z.string().min(1).optional(),
  fileSizeBytes: z.number().int().positive().optional(),
  embeddable: z.boolean().optional(),
  processingStatus: mediaProcessingStatusSchema,
  processingError: z.string().min(1).optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const transcriptWordSchema = z.object({
  index: z.number().int().nonnegative(),
  word: z.string().min(1),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
});

export const transcriptSegmentSchema = z.object({
  id: z.string().min(1),
  mediaId: z.string().min(1),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
  text: z.string().min(1),
  startWordIndex: z.number().int().nonnegative(),
  endWordIndex: z.number().int().nonnegative(),
});

export const transcriptSchema = z.object({
  id: z.string().min(1),
  mediaId: z.string().min(1),
  fullText: z.string().min(1),
  language: z.string().min(1).optional(),
  source: z.enum(["azure_stt", "tts_word_boundary", "youtube_authorized_caption", "mock"]),
  words: z.array(transcriptWordSchema),
  segments: z.array(transcriptSegmentSchema),
  objectKey: z.string().min(1).optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const practiceSectionSchema = z.object({
  id: z.string().min(1).optional(),
  mediaId: z.string().min(1),
  startWordIndex: z.number().int().nonnegative(),
  endWordIndex: z.number().int().nonnegative(),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
  selectedText: z.string().min(1),
});

export const youtubeValidationResultSchema = z.object({
  valid: z.boolean(),
  videoId: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  thumbnailUrl: z.string().url().optional(),
  duration: z.string().min(1).optional(),
  durationSeconds: z.number().int().positive().optional(),
  embeddable: z.boolean().optional(),
  transcriptAvailable: z.boolean().optional(),
  reason: z.string().min(1).optional(),
});

export const attemptStatusSchema = z.enum([
  "draft",
  "waiting_to_sync",
  "pending_upload",
  "uploaded",
  "queued",
  "evaluating",
  "complete",
  "failed",
]);

export const practiceAttemptSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  contentType: z.enum([
    "speech",
    "sound_lesson",
    "custom_practice",
    "diagnostic",
    "media_shadowing",
  ]),
  contentId: z.string().min(1),
  status: attemptStatusSchema,
  audioObjectKey: z.string().min(1).optional(),
  practiceSection: practiceSectionSchema.optional(),
  durationSeconds: z.number().positive().optional(),
  savedAsBest: z.boolean().default(false),
  audioExpiresAt: isoDateTimeSchema.optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

const scoreSchema = z.number().min(0).max(100);

export const evaluationResultSchema = z.object({
  attemptId: z.string().min(1),
  overallClarity: scoreSchema,
  pronunciationMatch: scoreSchema,
  rhythmPacing: scoreSchema,
  prosody: scoreSchema.optional(),
  targetSoundScore: scoreSchema.optional(),
  overallScore: scoreSchema.optional(),
  pronunciationScore: scoreSchema.optional(),
  wordAccuracyScore: scoreSchema.optional(),
  timingScore: scoreSchema.optional(),
  paceFeedback: z.enum(["too_slow", "too_fast", "close"]).optional(),
  missedWords: z.array(z.string().min(1)).default([]),
  unclearWords: z.array(z.string().min(1)).default([]),
  feedbackMessage: z.string().min(1).optional(),
  coachingFeedback: z.object({
    positiveNote: z.string().min(1),
    fixes: z.array(z.string().min(1)).max(3),
    retryFocus: z.string().min(1),
  }),
  provider: z.enum(["azure_pronunciation_assessment", "mock"]),
  evaluatedAt: isoDateTimeSchema,
});

export const weeklyStreakDaySchema = z.object({
  date: localDateSchema,
  openedApp: z.boolean(),
  completedPractice: z.boolean(),
});

export const weeklyStreakSchema = z.object({
  weekStartsOn: localDateSchema,
  timezone: z.string().min(1),
  currentStreakCount: z.number().int().nonnegative(),
  days: z.array(weeklyStreakDaySchema).length(7),
});

export const progressSummarySchema = z.object({
  userId: z.string().min(1),
  firstAttemptId: z.string().min(1).optional(),
  latestAttemptId: z.string().min(1).optional(),
  bestAttemptId: z.string().min(1).optional(),
  baselineAttemptId: z.string().min(1).optional(),
  recentImprovementMessage: z.string().optional(),
  scoreDelta: z.number().optional(),
});

export const userQuotaSchema = z.object({
  userId: z.string().min(1),
  plan: z.enum(["free", "premium", "beta"]),
  dailyEvaluationsUsed: z.number().int().nonnegative(),
  monthlyEvaluationsUsed: z.number().int().nonnegative(),
  dailyEvaluationLimit: z.number().int().positive(),
  monthlyEvaluationLimit: z.number().int().positive(),
});

export const offlineAttemptSchema = z.object({
  localId: z.string().min(1),
  contentId: z.string().min(1),
  contentType: z.enum([
    "speech",
    "sound_lesson",
    "custom_practice",
    "diagnostic",
    "media_shadowing",
  ]),
  localAudioUri: z.string().min(1),
  status: z.enum(["saved_on_device", "waiting_for_connection", "uploading", "failed"]),
  createdAt: isoDateTimeSchema,
});

export const notificationPreferenceSchema = z.object({
  userId: z.string().min(1),
  enabled: z.boolean(),
  reminderTime: clockTimeSchema,
  timezone: z.string().min(1),
});

export const pushDeviceSchema = z.object({
  deviceId: z.string().min(1),
  userId: z.string().min(1),
  pushToken: z.string().min(1),
  platform: z.enum(["ios", "android"]),
  createdAt: isoDateTimeSchema,
});

export const apiErrorResponseSchema = z.object({
  requestId: z.string().min(1),
  code: z.string().min(1),
  message: z.string().min(1),
  retryAfterSeconds: z.number().int().positive().optional(),
});

export const homeResponseSchema = z.object({
  requestId: z.string().min(1),
  userProfile: userProfileSchema,
  modelSpeakers: z.array(modelSpeakerSchema),
  todaySpeech: speechSchema,
  weeklyStreak: weeklyStreakSchema,
  recommendedSoundLesson: soundLessonSchema,
  recentMedia: z.array(mediaSchema).default([]),
  progressProof: progressSummarySchema.optional(),
  recentImprovement: z.string().optional(),
});

export const listSpeechesResponseSchema = z.object({
  requestId: z.string().min(1),
  data: z.array(speechSchema),
});

export const listSoundLessonsResponseSchema = z.object({
  requestId: z.string().min(1),
  data: z.array(soundLessonSchema),
});

export const getSoundLessonResponseSchema = z.object({
  requestId: z.string().min(1),
  data: soundLessonSchema,
});

export const progressResponseSchema = z.object({
  requestId: z.string().min(1),
  progress: progressSummarySchema,
  attempts: z.array(practiceAttemptSchema),
  evaluations: z.array(evaluationResultSchema),
});

export const youtubeValidationResponseSchema = z.object({
  requestId: z.string().min(1),
  data: youtubeValidationResultSchema,
});

export const youtubeValidationRequestSchema = z.object({
  url: z.string().min(1),
});

export const createYoutubeMediaRequestSchema = z.object({
  youtubeUrl: z.string().min(1),
});

export const createYoutubeMediaResponseSchema = z.object({
  requestId: z.string().min(1),
  data: mediaSchema,
});

export const mediaUploadUrlRequestSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.enum(["audio/mpeg", "audio/mp4", "audio/m4a", "audio/wav", "audio/x-wav"]),
  fileSizeBytes: z
    .number()
    .int()
    .positive()
    .max(100 * 1024 * 1024),
  durationSeconds: z.number().positive().max(600).optional(),
});

export const mediaUploadUrlResponseSchema = z.object({
  requestId: z.string().min(1),
  media: mediaSchema,
  upload: z.object({
    uploadUrl: z.string().url(),
    objectKey: z.string().min(1),
    expiresAt: isoDateTimeSchema,
  }),
});

export const getMediaResponseSchema = z.object({
  requestId: z.string().min(1),
  data: mediaSchema,
});

export const getTranscriptResponseSchema = z.object({
  requestId: z.string().min(1),
  data: transcriptSchema,
});

export const attemptUploadUrlRequestSchema = z.object({
  mediaId: z.string().min(1),
  practiceSection: practiceSectionSchema,
  contentType: z.literal("media_shadowing").default("media_shadowing"),
  contentTypeHeader: z.enum(["audio/m4a", "audio/mp4", "audio/mpeg", "audio/wav"]).optional(),
});

export const attemptUploadUrlResponseSchema = z.object({
  requestId: z.string().min(1),
  attempt: practiceAttemptSchema,
  upload: z.object({
    uploadUrl: z.string().url(),
    objectKey: z.string().min(1),
    expiresAt: isoDateTimeSchema,
  }),
});

export const evaluateAttemptResponseSchema = z.object({
  requestId: z.string().min(1),
  attempt: practiceAttemptSchema,
  evaluation: evaluationResultSchema,
});

export const completeAttemptUploadResponseSchema = z.object({
  requestId: z.string().min(1),
  attemptId: z.string().min(1),
  status: z.literal("uploaded"),
});

export type PracticeTrack = z.infer<typeof practiceTrackSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type ModelSpeaker = z.infer<typeof modelSpeakerSchema>;
export type Speech = z.infer<typeof speechSchema>;
export type SoundLesson = z.infer<typeof soundLessonSchema>;
export type SoundVisualGuide = z.infer<typeof soundVisualGuideSchema>;
export type MinimalPair = z.infer<typeof minimalPairSchema>;
export type SentencePractice = z.infer<typeof sentencePracticeSchema>;
export type Media = z.infer<typeof mediaSchema>;
export type MediaSourceType = z.infer<typeof mediaSourceTypeSchema>;
export type MediaProcessingStatus = z.infer<typeof mediaProcessingStatusSchema>;
export type Transcript = z.infer<typeof transcriptSchema>;
export type TranscriptWord = z.infer<typeof transcriptWordSchema>;
export type TranscriptSegment = z.infer<typeof transcriptSegmentSchema>;
export type PracticeSection = z.infer<typeof practiceSectionSchema>;
export type YouTubeValidationResult = z.infer<typeof youtubeValidationResultSchema>;
export type PracticeAttempt = z.infer<typeof practiceAttemptSchema>;
export type EvaluationResult = z.infer<typeof evaluationResultSchema>;
export type WeeklyStreak = z.infer<typeof weeklyStreakSchema>;
export type ProgressSummary = z.infer<typeof progressSummarySchema>;
export type UserQuota = z.infer<typeof userQuotaSchema>;
export type OfflineAttempt = z.infer<typeof offlineAttemptSchema>;
export type NotificationPreference = z.infer<typeof notificationPreferenceSchema>;
export type PushDevice = z.infer<typeof pushDeviceSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
export type HomeResponse = z.infer<typeof homeResponseSchema>;
export type ListSpeechesResponse = z.infer<typeof listSpeechesResponseSchema>;
export type ListSoundLessonsResponse = z.infer<typeof listSoundLessonsResponseSchema>;
export type GetSoundLessonResponse = z.infer<typeof getSoundLessonResponseSchema>;
export type ProgressResponse = z.infer<typeof progressResponseSchema>;
export type YouTubeValidationRequest = z.infer<typeof youtubeValidationRequestSchema>;
export type YouTubeValidationResponse = z.infer<typeof youtubeValidationResponseSchema>;
export type CreateYoutubeMediaRequest = z.infer<typeof createYoutubeMediaRequestSchema>;
export type CreateYoutubeMediaResponse = z.infer<typeof createYoutubeMediaResponseSchema>;
export type MediaUploadUrlRequest = z.infer<typeof mediaUploadUrlRequestSchema>;
export type MediaUploadUrlResponse = z.infer<typeof mediaUploadUrlResponseSchema>;
export type GetMediaResponse = z.infer<typeof getMediaResponseSchema>;
export type GetTranscriptResponse = z.infer<typeof getTranscriptResponseSchema>;
export type AttemptUploadUrlRequest = z.infer<typeof attemptUploadUrlRequestSchema>;
export type AttemptUploadUrlResponse = z.infer<typeof attemptUploadUrlResponseSchema>;
export type EvaluateAttemptResponse = z.infer<typeof evaluateAttemptResponseSchema>;
export type CompleteAttemptUploadResponse = z.infer<typeof completeAttemptUploadResponseSchema>;
