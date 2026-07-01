import {
  attemptUploadUrlResponseSchema,
  completeAttemptUploadResponseSchema,
  createMockAttemptUploadUrlResponse,
  createMockEvaluateAttemptResponse,
  createMockGetMediaResponse,
  createMockHomeResponse,
  createMockMediaUploadUrlResponse,
  createMockProgressResponse,
  createMockTranscriptResponse,
  createMockYouTubeValidationResponse,
  createMockYoutubeMediaResponse,
  getSoundLessonResponseSchema,
  getMediaResponseSchema,
  getTranscriptResponseSchema,
  homeResponseSchema,
  mediaUploadUrlResponseSchema,
  listSoundLessonsResponseSchema,
  listSpeechesResponseSchema,
  mockSoundLessons,
  mockSpeeches,
  progressResponseSchema,
  evaluateAttemptResponseSchema,
  extractYouTubeVideoId,
  type AttemptUploadUrlRequest,
  type AttemptUploadUrlResponse,
  type CompleteAttemptUploadResponse,
  type CreateYoutubeMediaResponse,
  type EvaluateAttemptResponse,
  type GetSoundLessonResponse,
  type GetMediaResponse,
  type GetTranscriptResponse,
  type HomeResponse,
  type ListSoundLessonsResponse,
  type ListSpeechesResponse,
  type MediaUploadUrlRequest,
  type MediaUploadUrlResponse,
  type ProgressResponse,
  type YouTubeValidationResponse,
  youtubeValidationResponseSchema,
  createYoutubeMediaResponseSchema,
} from "@nija-to-native/shared";
import type { z } from "zod";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8787";

async function fetchJson<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
): Promise<z.infer<TSchema>> {
  const response = await fetch(`${apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return schema.parse(await response.json());
}

async function postJson<TSchema extends z.ZodTypeAny>(
  path: string,
  body: unknown,
  schema: TSchema,
): Promise<z.infer<TSchema>> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return schema.parse(await response.json());
}

export async function getHome(): Promise<HomeResponse> {
  try {
    return await fetchJson("/v1/home", homeResponseSchema);
  } catch {
    return createMockHomeResponse("mobile_fallback_home");
  }
}

export async function getSpeeches(): Promise<ListSpeechesResponse> {
  try {
    return await fetchJson("/v1/speeches", listSpeechesResponseSchema);
  } catch {
    return {
      requestId: "mobile_fallback_speeches",
      data: mockSpeeches,
    };
  }
}

export async function getSoundLessons(): Promise<ListSoundLessonsResponse> {
  try {
    return await fetchJson("/v1/sound-lessons", listSoundLessonsResponseSchema);
  } catch {
    return {
      requestId: "mobile_fallback_sound_lessons",
      data: mockSoundLessons,
    };
  }
}

export async function getSoundLesson(soundLessonId: string): Promise<GetSoundLessonResponse> {
  try {
    return await fetchJson(`/v1/sound-lessons/${soundLessonId}`, getSoundLessonResponseSchema);
  } catch {
    const soundLesson = mockSoundLessons.find((lesson) => lesson.id === soundLessonId);

    if (!soundLesson) {
      throw new Error("Sound lesson not found");
    }

    return {
      requestId: "mobile_fallback_sound_lesson",
      data: soundLesson,
    };
  }
}

export async function getProgress(): Promise<ProgressResponse> {
  try {
    return await fetchJson("/v1/progress", progressResponseSchema);
  } catch {
    return createMockProgressResponse("mobile_fallback_progress");
  }
}

export async function validateYouTubeLink(url: string): Promise<YouTubeValidationResponse> {
  try {
    return await postJson("/v1/youtube/validate", { url }, youtubeValidationResponseSchema);
  } catch {
    return createMockYouTubeValidationResponse(
      "mobile_fallback_youtube_validation",
      extractYouTubeVideoId(url),
    );
  }
}

export async function createYouTubeMedia(youtubeUrl: string): Promise<CreateYoutubeMediaResponse> {
  try {
    return await postJson("/v1/media/youtube", { youtubeUrl }, createYoutubeMediaResponseSchema);
  } catch {
    return createMockYoutubeMediaResponse(
      "mobile_fallback_youtube_media",
      extractYouTubeVideoId(youtubeUrl) ?? undefined,
    );
  }
}

export async function createMediaUploadUrl(
  request: MediaUploadUrlRequest,
): Promise<MediaUploadUrlResponse> {
  try {
    return await postJson("/v1/media/upload-url", request, mediaUploadUrlResponseSchema);
  } catch {
    return createMockMediaUploadUrlResponse("mobile_fallback_media_upload", request);
  }
}

export async function completeMediaUpload(mediaId: string): Promise<GetMediaResponse> {
  try {
    return await postJson(`/v1/media/${mediaId}/complete-upload`, {}, getMediaResponseSchema);
  } catch {
    return createMockGetMediaResponse("mobile_fallback_complete_media_upload", mediaId);
  }
}

export async function getMedia(mediaId: string): Promise<GetMediaResponse> {
  try {
    return await fetchJson(`/v1/media/${mediaId}`, getMediaResponseSchema);
  } catch {
    return createMockGetMediaResponse("mobile_fallback_media", mediaId);
  }
}

export async function getMediaTranscript(mediaId: string): Promise<GetTranscriptResponse> {
  try {
    return await fetchJson(`/v1/media/${mediaId}/transcript`, getTranscriptResponseSchema);
  } catch {
    return createMockTranscriptResponse("mobile_fallback_transcript", mediaId);
  }
}

export async function createAttemptUploadUrl(
  request: AttemptUploadUrlRequest,
): Promise<AttemptUploadUrlResponse> {
  try {
    return await postJson("/v1/attempts/upload-url", request, attemptUploadUrlResponseSchema);
  } catch {
    return createMockAttemptUploadUrlResponse("mobile_fallback_attempt_upload");
  }
}

export async function completeAttemptUpload(
  attemptId: string,
): Promise<CompleteAttemptUploadResponse> {
  try {
    return await postJson(
      `/v1/attempts/${attemptId}/complete-upload`,
      {},
      completeAttemptUploadResponseSchema,
    );
  } catch {
    return {
      requestId: "mobile_fallback_complete_attempt_upload",
      attemptId,
      status: "uploaded",
    };
  }
}

export async function evaluateAttempt(attemptId: string): Promise<EvaluateAttemptResponse> {
  try {
    return await postJson(`/v1/attempts/${attemptId}/evaluate`, {}, evaluateAttemptResponseSchema);
  } catch {
    return createMockEvaluateAttemptResponse("mobile_fallback_evaluate_attempt");
  }
}
