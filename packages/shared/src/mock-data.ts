import type {
  AttemptUploadUrlResponse,
  EvaluationResult,
  EvaluateAttemptResponse,
  GetMediaResponse,
  GetTranscriptResponse,
  HomeResponse,
  Media,
  MediaUploadUrlRequest,
  MediaUploadUrlResponse,
  ModelSpeaker,
  PracticeAttempt,
  PracticeSection,
  ProgressResponse,
  ProgressSummary,
  SoundLesson,
  Speech,
  Transcript,
  UserProfile,
  WeeklyStreak,
  YouTubeValidationResponse,
  YouTubeValidationResult,
} from "./schemas";

const now = "2026-06-25T12:00:00-04:00";

export const mockUserProfile: UserProfile = {
  id: "user_demo",
  email: "demo@example.com",
  displayName: "Demo Learner",
  practiceTrack: "professional",
  confidenceLevel: "want_clearer",
  dailyGoalMinutes: 10,
  preferredSpeakerId: "speaker_clear_professional",
  timezone: "America/Toronto",
  reminderTime: "08:30",
  createdAt: now,
  updatedAt: now,
};

export const mockModelSpeakers: ModelSpeaker[] = [
  {
    id: "speaker_clear_professional",
    name: "Clear Professional",
    style: "clear_professional",
    previewAudioUrl: "https://cdn.example.com/model-audio/clear-professional-preview.mp3",
  },
  {
    id: "speaker_conversational",
    name: "Conversational Natural",
    style: "conversational_natural",
    previewAudioUrl: "https://cdn.example.com/model-audio/conversational-preview.mp3",
  },
  {
    id: "speaker_slow_coaching",
    name: "Slow Coaching",
    style: "slow_coaching",
    previewAudioUrl: "https://cdn.example.com/model-audio/slow-coaching-preview.mp3",
  },
];

export const mockSpeeches: Speech[] = [
  {
    id: "speech_professional_intro",
    title: "Introducing Yourself at Work",
    track: "professional",
    scenario: "First team meeting",
    difficulty: "beginner",
    durationSeconds: 38,
    targetSounds: ["th", "r", "final_consonants"],
    rhythmFocus: "Stress the content words and pause after each thought.",
    lines: [
      {
        id: "speech_professional_intro_1",
        order: 0,
        text: "Hi, I’m Daniel. I just joined the product team.",
        targetWords: ["joined", "product", "team"],
      },
      {
        id: "speech_professional_intro_2",
        order: 1,
        text: "I’ll be working on customer research and weekly reports.",
        targetWords: ["working", "research", "reports"],
      },
      {
        id: "speech_professional_intro_3",
        order: 2,
        text: "I’m excited to learn from everyone and contribute where I can.",
        targetWords: ["excited", "learn", "contribute"],
      },
    ],
    speakerAudio: {
      speaker_clear_professional:
        "https://cdn.example.com/speeches/professional-intro/clear-professional.mp3",
      speaker_conversational:
        "https://cdn.example.com/speeches/professional-intro/conversational.mp3",
      speaker_slow_coaching:
        "https://cdn.example.com/speeches/professional-intro/slow-coaching.mp3",
    },
    isPublished: true,
  },
  {
    id: "speech_interview_tell_me",
    title: "Tell Me About Yourself",
    track: "interview",
    scenario: "Opening interview answer",
    difficulty: "intermediate",
    durationSeconds: 42,
    targetSounds: ["ee_vs_short_i", "r", "sentence_stress"],
    rhythmFocus: "Keep the pace steady and land clearly on experience, teams, and results.",
    lines: [
      {
        id: "speech_interview_tell_me_1",
        order: 0,
        text: "I’m a product-focused professional with five years of experience.",
        targetWords: ["product", "professional", "experience"],
      },
      {
        id: "speech_interview_tell_me_2",
        order: 1,
        text: "I enjoy working with teams to turn customer needs into clear solutions.",
        targetWords: ["working", "teams", "needs"],
      },
      {
        id: "speech_interview_tell_me_3",
        order: 2,
        text: "I’m looking for a role where I can keep learning and deliver strong results.",
        targetWords: ["role", "learning", "results"],
      },
    ],
    speakerAudio: {
      speaker_clear_professional:
        "https://cdn.example.com/speeches/interview-tell-me/clear-professional.mp3",
      speaker_conversational:
        "https://cdn.example.com/speeches/interview-tell-me/conversational.mp3",
      speaker_slow_coaching: "https://cdn.example.com/speeches/interview-tell-me/slow-coaching.mp3",
    },
    isPublished: true,
  },
];

export const mockSoundLessons: SoundLesson[] = [
  {
    id: "sound_ee_vs_short_i",
    title: "EE vs Short I",
    soundKey: "ee_vs_short_i",
    overview: "Practice making long EE words clear and distinct from short I words in real speech.",
    coachVideoId: "dQw4w9WgXcQ",
    backupCoachVideoIds: [],
    visualGuide: {
      status: "placeholder",
      title: "Mouth and tongue guide",
      description:
        "A future 2D guide will show tongue height, lip shape, and common placement mistakes.",
    },
    wordDrills: [
      {
        id: "ee_word_array_1",
        type: "word_array",
        targetSound: "ee",
        words: ["sheep", "beach", "keep", "seat", "leave"],
        referenceScript: "sheep beach keep seat leave",
      },
      {
        id: "short_i_word_array_1",
        type: "word_array",
        targetSound: "short_i",
        words: ["ship", "bit", "sit", "live", "fill"],
        referenceScript: "ship bit sit live fill",
      },
    ],
    minimalPairDrills: [
      {
        id: "ee_short_i_pairs_1",
        type: "minimal_pair",
        title: "Make the pair sound different",
        referenceScript: "ship sheep bit beat sit seat live leave fill feel",
        pairs: [
          {
            pairId: "ship_sheep",
            position: 1,
            expectedWord: "ship",
            targetSound: "short_i",
            contrastSound: "ee",
          },
          {
            pairId: "ship_sheep",
            position: 2,
            expectedWord: "sheep",
            targetSound: "ee",
            contrastSound: "short_i",
          },
          {
            pairId: "bit_beat",
            position: 3,
            expectedWord: "bit",
            targetSound: "short_i",
            contrastSound: "ee",
          },
          {
            pairId: "bit_beat",
            position: 4,
            expectedWord: "beat",
            targetSound: "ee",
            contrastSound: "short_i",
          },
          {
            pairId: "sit_seat",
            position: 5,
            expectedWord: "sit",
            targetSound: "short_i",
            contrastSound: "ee",
          },
          {
            pairId: "sit_seat",
            position: 6,
            expectedWord: "seat",
            targetSound: "ee",
            contrastSound: "short_i",
          },
          {
            pairId: "live_leave",
            position: 7,
            expectedWord: "live",
            targetSound: "short_i",
            contrastSound: "ee",
          },
          {
            pairId: "live_leave",
            position: 8,
            expectedWord: "leave",
            targetSound: "ee",
            contrastSound: "short_i",
          },
          {
            pairId: "fill_feel",
            position: 9,
            expectedWord: "fill",
            targetSound: "short_i",
            contrastSound: "ee",
          },
          {
            pairId: "fill_feel",
            position: 10,
            expectedWord: "feel",
            targetSound: "ee",
            contrastSound: "short_i",
          },
        ],
      },
    ],
    sentencePractice: [
      {
        id: "ee_sentence_1",
        sentence: "She will sit in the seat.",
        focusWords: ["She", "seat"],
        contrastWords: ["sit"],
        referenceScript: "She will sit in the seat.",
      },
      {
        id: "ee_sentence_2",
        sentence: "Please keep the receipt in the file.",
        focusWords: ["Please", "keep", "receipt"],
        contrastWords: ["file"],
        referenceScript: "Please keep the receipt in the file.",
      },
    ],
    isPublished: true,
  },
];

export const mockMedia: Media[] = [
  {
    id: "media_youtube_confident_intro",
    userId: mockUserProfile.id,
    sourceType: "youtube",
    sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    title: "Confident introduction practice",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    durationSeconds: 92,
    embeddable: true,
    processingStatus: "completed",
    createdAt: "2026-06-25T08:20:00-04:00",
    updatedAt: "2026-06-25T08:21:00-04:00",
  },
  {
    id: "media_upload_team_update",
    userId: mockUserProfile.id,
    sourceType: "upload",
    audioObjectKey: "users/user_demo/media/team-update.m4a",
    title: "Team update audio",
    durationSeconds: 48,
    mimeType: "audio/mp4",
    fileSizeBytes: 1_864_204,
    processingStatus: "completed",
    createdAt: "2026-06-24T18:12:00-04:00",
    updatedAt: "2026-06-24T18:13:00-04:00",
  },
];

export const mockPracticeSection: PracticeSection = {
  id: "section_confident_intro_1",
  mediaId: "media_youtube_confident_intro",
  startWordIndex: 0,
  endWordIndex: 13,
  startMs: 0,
  endMs: 6200,
  selectedText: "Hi, I am Daniel. I just joined the product team this week.",
};

export const mockTranscripts: Transcript[] = [
  {
    id: "transcript_confident_intro",
    mediaId: "media_youtube_confident_intro",
    fullText:
      "Hi, I am Daniel. I just joined the product team this week. I am excited to learn from everyone and contribute where I can.",
    language: "en-US",
    source: "mock",
    words: [
      { index: 0, word: "Hi", startMs: 0, endMs: 220 },
      { index: 1, word: "I", startMs: 260, endMs: 360 },
      { index: 2, word: "am", startMs: 370, endMs: 520 },
      { index: 3, word: "Daniel", startMs: 560, endMs: 980 },
      { index: 4, word: "I", startMs: 1260, endMs: 1360 },
      { index: 5, word: "just", startMs: 1380, endMs: 1620 },
      { index: 6, word: "joined", startMs: 1660, endMs: 2040 },
      { index: 7, word: "the", startMs: 2070, endMs: 2180 },
      { index: 8, word: "product", startMs: 2200, endMs: 2640 },
      { index: 9, word: "team", startMs: 2680, endMs: 3020 },
      { index: 10, word: "this", startMs: 3360, endMs: 3580 },
      { index: 11, word: "week", startMs: 3620, endMs: 3980 },
      { index: 12, word: "I", startMs: 4420, endMs: 4520 },
      { index: 13, word: "am", startMs: 4540, endMs: 4700 },
      { index: 14, word: "excited", startMs: 4720, endMs: 5260 },
      { index: 15, word: "to", startMs: 5280, endMs: 5400 },
      { index: 16, word: "learn", startMs: 5420, endMs: 5780 },
      { index: 17, word: "from", startMs: 5800, endMs: 6040 },
      { index: 18, word: "everyone", startMs: 6060, endMs: 6620 },
      { index: 19, word: "and", startMs: 6900, endMs: 7060 },
      { index: 20, word: "contribute", startMs: 7080, endMs: 7720 },
      { index: 21, word: "where", startMs: 7760, endMs: 8040 },
      { index: 22, word: "I", startMs: 8060, endMs: 8160 },
      { index: 23, word: "can", startMs: 8180, endMs: 8520 },
    ],
    segments: [
      {
        id: "segment_confident_intro_1",
        mediaId: "media_youtube_confident_intro",
        startMs: 0,
        endMs: 3980,
        text: "Hi, I am Daniel. I just joined the product team this week.",
        startWordIndex: 0,
        endWordIndex: 11,
      },
      {
        id: "segment_confident_intro_2",
        mediaId: "media_youtube_confident_intro",
        startMs: 4420,
        endMs: 8520,
        text: "I am excited to learn from everyone and contribute where I can.",
        startWordIndex: 12,
        endWordIndex: 23,
      },
    ],
    objectKey: "users/user_demo/transcripts/confident-intro.json",
    createdAt: "2026-06-25T08:21:00-04:00",
    updatedAt: "2026-06-25T08:21:00-04:00",
  },
];

export const mockYoutubeValidationResult: YouTubeValidationResult = {
  valid: true,
  videoId: "dQw4w9WgXcQ",
  title: "Confident introduction practice",
  thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  duration: "PT1M32S",
  durationSeconds: 92,
  embeddable: true,
  transcriptAvailable: true,
};

export const mockWeeklyStreak: WeeklyStreak = {
  weekStartsOn: "2026-06-22",
  timezone: "America/Toronto",
  currentStreakCount: 4,
  days: [
    { date: "2026-06-22", openedApp: true, completedPractice: true },
    { date: "2026-06-23", openedApp: true, completedPractice: true },
    { date: "2026-06-24", openedApp: true, completedPractice: false },
    { date: "2026-06-25", openedApp: true, completedPractice: true },
    { date: "2026-06-26", openedApp: false, completedPractice: false },
    { date: "2026-06-27", openedApp: false, completedPractice: false },
    { date: "2026-06-28", openedApp: false, completedPractice: false },
  ],
};

export const mockAttempts: PracticeAttempt[] = [
  {
    id: "attempt_first_professional_intro",
    userId: mockUserProfile.id,
    contentType: "media_shadowing",
    contentId: "media_youtube_confident_intro",
    status: "complete",
    practiceSection: mockPracticeSection,
    durationSeconds: 39,
    savedAsBest: false,
    audioExpiresAt: "2026-06-22T09:36:00-04:00",
    createdAt: "2026-06-22T08:35:00-04:00",
    updatedAt: "2026-06-22T08:36:00-04:00",
  },
  {
    id: "attempt_latest_professional_intro",
    userId: mockUserProfile.id,
    contentType: "media_shadowing",
    contentId: "media_youtube_confident_intro",
    status: "complete",
    practiceSection: mockPracticeSection,
    durationSeconds: 37,
    savedAsBest: true,
    audioExpiresAt: "2026-06-25T09:32:00-04:00",
    createdAt: "2026-06-25T08:31:00-04:00",
    updatedAt: "2026-06-25T08:32:00-04:00",
  },
];

export const mockEvaluations: EvaluationResult[] = [
  {
    attemptId: "attempt_first_professional_intro",
    overallClarity: 62,
    pronunciationMatch: 58,
    rhythmPacing: 66,
    prosody: 61,
    overallScore: 62,
    pronunciationScore: 58,
    wordAccuracyScore: 64,
    timingScore: 66,
    paceFeedback: "too_slow",
    missedWords: ["joined"],
    unclearWords: ["product", "research"],
    feedbackMessage:
      "Your pace was steady enough to follow. Try finishing joined and stressing product more clearly.",
    coachingFeedback: {
      positiveNote: "Your pace was steady enough to follow.",
      fixes: ["Finish the final sound in joined.", "Stress product and research more clearly."],
      retryFocus: "Pause after the first sentence and keep the final consonants complete.",
    },
    provider: "mock",
    evaluatedAt: "2026-06-22T08:36:00-04:00",
  },
  {
    attemptId: "attempt_latest_professional_intro",
    overallClarity: 78,
    pronunciationMatch: 75,
    rhythmPacing: 82,
    prosody: 76,
    overallScore: 78,
    pronunciationScore: 75,
    wordAccuracyScore: 80,
    timingScore: 82,
    paceFeedback: "close",
    missedWords: [],
    unclearWords: ["research"],
    feedbackMessage:
      "This is your clearest attempt so far. Keep the r in research strong and slow the final line slightly.",
    coachingFeedback: {
      positiveNote: "This is your clearest attempt so far.",
      fixes: ["Keep the r in research strong.", "Do not rush the final line."],
      retryFocus: "Repeat the last line once more with a slower ending.",
    },
    provider: "mock",
    evaluatedAt: "2026-06-25T08:32:00-04:00",
  },
];

export const mockProgressSummary: ProgressSummary = {
  userId: mockUserProfile.id,
  firstAttemptId: "attempt_first_professional_intro",
  latestAttemptId: "attempt_latest_professional_intro",
  bestAttemptId: "attempt_latest_professional_intro",
  recentImprovementMessage: "Clarity improved from 62 to 78 on Introducing Yourself at Work.",
  scoreDelta: 16,
};

export function createMockHomeResponse(requestId: string): HomeResponse {
  const preferredTrackSpeech =
    mockSpeeches.find((speech) => speech.track === mockUserProfile.practiceTrack) ??
    mockSpeeches[0];

  if (!preferredTrackSpeech) {
    throw new Error("Mock speeches are not configured");
  }

  const recommendedSoundLesson = mockSoundLessons[0];

  if (!recommendedSoundLesson) {
    throw new Error("Mock sound lessons are not configured");
  }

  return {
    requestId,
    userProfile: mockUserProfile,
    modelSpeakers: mockModelSpeakers,
    todaySpeech: preferredTrackSpeech,
    weeklyStreak: mockWeeklyStreak,
    recommendedSoundLesson,
    recentMedia: mockMedia,
    progressProof: mockProgressSummary,
    recentImprovement: mockProgressSummary.recentImprovementMessage,
  };
}

export function createMockProgressResponse(requestId: string): ProgressResponse {
  return {
    requestId,
    progress: mockProgressSummary,
    attempts: mockAttempts,
    evaluations: mockEvaluations,
  };
}

export function createMockYouTubeValidationResponse(
  requestId: string,
  videoId?: string | null,
): YouTubeValidationResponse {
  if (!videoId) {
    return {
      requestId,
      data: {
        valid: false,
        reason: "This does not look like a valid YouTube link.",
      },
    };
  }

  return {
    requestId,
    data: {
      ...mockYoutubeValidationResult,
      videoId,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    },
  };
}

function getDefaultMockMedia(): Media {
  const media = mockMedia[0];

  if (!media) {
    throw new Error("Mock media is not configured");
  }

  return media;
}

function getDefaultMockTranscript(): Transcript {
  const transcript = mockTranscripts[0];

  if (!transcript) {
    throw new Error("Mock transcripts are not configured");
  }

  return transcript;
}

function getDefaultMockAttempt(): PracticeAttempt {
  const attempt = mockAttempts[1] ?? mockAttempts[0];

  if (!attempt) {
    throw new Error("Mock attempts are not configured");
  }

  return attempt;
}

function getDefaultMockEvaluation(): EvaluationResult {
  const evaluation = mockEvaluations[1] ?? mockEvaluations[0];

  if (!evaluation) {
    throw new Error("Mock evaluations are not configured");
  }

  return evaluation;
}

export function createMockYoutubeMediaResponse(
  requestId: string,
  videoId = mockYoutubeValidationResult.videoId ?? "dQw4w9WgXcQ",
): GetMediaResponse {
  return {
    requestId,
    data: {
      ...getDefaultMockMedia(),
      id: `media_youtube_${videoId}`,
      sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
      youtubeVideoId: videoId,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    },
  };
}

export function createMockMediaUploadUrlResponse(
  requestId: string,
  request: MediaUploadUrlRequest,
): MediaUploadUrlResponse {
  const mediaId = "media_upload_pending_demo";
  const objectKey = `users/${mockUserProfile.id}/media/${mediaId}/${request.fileName}`;

  return {
    requestId,
    media: {
      id: mediaId,
      userId: mockUserProfile.id,
      sourceType: "upload",
      audioObjectKey: objectKey,
      title: request.fileName,
      durationSeconds: request.durationSeconds,
      mimeType: request.contentType,
      fileSizeBytes: request.fileSizeBytes,
      processingStatus: "pending_upload",
      createdAt: now,
      updatedAt: now,
    },
    upload: {
      uploadUrl: `https://upload.example.com/${encodeURIComponent(objectKey)}`,
      objectKey,
      expiresAt: "2026-06-25T12:15:00-04:00",
    },
  };
}

export function createMockGetMediaResponse(requestId: string, mediaId: string): GetMediaResponse {
  const uploadedFallback = mockMedia.find((item) => item.sourceType === "upload");
  const fallback = mediaId.startsWith("media_upload")
    ? (uploadedFallback ?? getDefaultMockMedia())
    : getDefaultMockMedia();
  const media = mockMedia.find((item) => item.id === mediaId) ?? {
    ...fallback,
    id: mediaId,
    processingStatus: "completed" as const,
    updatedAt: now,
  };

  return {
    requestId,
    data: media,
  };
}

export function createMockTranscriptResponse(
  requestId: string,
  mediaId: string,
): GetTranscriptResponse {
  const transcript =
    mockTranscripts.find((item) => item.mediaId === mediaId) ?? getDefaultMockTranscript();

  return {
    requestId,
    data: transcript,
  };
}

export function createMockAttemptUploadUrlResponse(requestId: string): AttemptUploadUrlResponse {
  const attempt: PracticeAttempt = {
    id: "attempt_pending_media_shadowing",
    userId: mockUserProfile.id,
    contentType: "media_shadowing",
    contentId: mockPracticeSection.mediaId,
    practiceSection: mockPracticeSection,
    status: "pending_upload",
    durationSeconds: 6.2,
    savedAsBest: false,
    audioExpiresAt: "2026-06-25T13:00:00-04:00",
    createdAt: now,
    updatedAt: now,
  };
  const objectKey = `users/${mockUserProfile.id}/attempts/${attempt.id}.m4a`;

  return {
    requestId,
    attempt: {
      ...attempt,
      audioObjectKey: objectKey,
    },
    upload: {
      uploadUrl: `https://upload.example.com/${encodeURIComponent(objectKey)}`,
      objectKey,
      expiresAt: "2026-06-25T12:15:00-04:00",
    },
  };
}

export function createMockEvaluateAttemptResponse(requestId: string): EvaluateAttemptResponse {
  return {
    requestId,
    attempt: {
      ...getDefaultMockAttempt(),
      status: "complete",
      updatedAt: now,
    },
    evaluation: getDefaultMockEvaluation(),
  };
}
