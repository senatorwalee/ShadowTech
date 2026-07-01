import {
  attemptUploadUrlRequestSchema,
  apiErrorResponseSchema,
  createMockAttemptUploadUrlResponse,
  createMockEvaluateAttemptResponse,
  createMockGetMediaResponse,
  createMockHomeResponse,
  createMockMediaUploadUrlResponse,
  createMockProgressResponse,
  createMockTranscriptResponse,
  createMockYouTubeValidationResponse,
  createMockYoutubeMediaResponse,
  createYoutubeMediaRequestSchema,
  extractYouTubeVideoId,
  mediaUploadUrlRequestSchema,
  mockSoundLessons,
  mockSpeeches,
  mockWeeklyStreak,
  youtubeValidationRequestSchema,
} from "@nija-to-native/shared";
import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { createErrorResponse } from "./errors";
import { requestIdMiddleware } from "./middleware/request-id";
import type { AppVariables, Env } from "./types";

type AppContext = {
  Bindings: Env;
  Variables: AppVariables;
};

const app = new Hono<AppContext>();
const v1 = new Hono<AppContext>();

async function readJsonBody(c: Context<AppContext>): Promise<unknown> {
  try {
    return await c.req.json();
  } catch {
    throw new HTTPException(400, {
      message: "Request body must be valid JSON.",
    });
  }
}

app.use("*", requestIdMiddleware);
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["authorization", "content-type", "x-request-id"],
  }),
);

app.get("/health", (c) =>
  c.json({
    status: "ok",
    service: "daily-fluency-api",
    requestId: c.get("requestId"),
  }),
);

v1.get("/health", (c) =>
  c.json({
    status: "ok",
    version: "v1",
    requestId: c.get("requestId"),
  }),
);

v1.get("/home", (c) => c.json(createMockHomeResponse(c.get("requestId"))));

v1.get("/speeches", (c) =>
  c.json({
    requestId: c.get("requestId"),
    data: mockSpeeches,
  }),
);

v1.post("/youtube/validate", async (c) => {
  const body = youtubeValidationRequestSchema.parse(await readJsonBody(c));
  const videoId = extractYouTubeVideoId(body.url);

  return c.json(createMockYouTubeValidationResponse(c.get("requestId"), videoId));
});

v1.post("/media/youtube", async (c) => {
  const body = createYoutubeMediaRequestSchema.parse(await readJsonBody(c));
  const videoId = extractYouTubeVideoId(body.youtubeUrl);

  if (!videoId) {
    throw new HTTPException(400, {
      message: "This does not look like a valid YouTube link.",
    });
  }

  return c.json(createMockYoutubeMediaResponse(c.get("requestId"), videoId));
});

v1.post("/media/upload-url", async (c) => {
  const body = mediaUploadUrlRequestSchema.parse(await readJsonBody(c));

  return c.json(createMockMediaUploadUrlResponse(c.get("requestId"), body));
});

v1.post("/media/:mediaId/complete-upload", (c) => {
  const response = createMockGetMediaResponse(c.get("requestId"), c.req.param("mediaId"));

  return c.json({
    ...response,
    data: {
      ...response.data,
      processingStatus: "processing",
      updatedAt: new Date().toISOString(),
    },
  });
});

v1.get("/media/:mediaId", (c) =>
  c.json(createMockGetMediaResponse(c.get("requestId"), c.req.param("mediaId"))),
);

v1.get("/media/:mediaId/transcript", (c) =>
  c.json(createMockTranscriptResponse(c.get("requestId"), c.req.param("mediaId"))),
);

v1.get("/sound-lessons", (c) =>
  c.json({
    requestId: c.get("requestId"),
    data: mockSoundLessons,
  }),
);

v1.get("/sound-lessons/:soundLessonId", (c) => {
  const soundLesson = mockSoundLessons.find((lesson) => lesson.id === c.req.param("soundLessonId"));

  if (!soundLesson) {
    throw new HTTPException(404, {
      message: "Sound lesson not found.",
    });
  }

  return c.json({
    requestId: c.get("requestId"),
    data: soundLesson,
  });
});

v1.get("/progress", (c) => c.json(createMockProgressResponse(c.get("requestId"))));

v1.get("/streaks/weekly", (c) =>
  c.json({
    requestId: c.get("requestId"),
    data: mockWeeklyStreak,
  }),
);

v1.post("/attempts/upload-url", async (c) => {
  attemptUploadUrlRequestSchema.parse(await readJsonBody(c));

  return c.json(createMockAttemptUploadUrlResponse(c.get("requestId")));
});

v1.post("/attempts/:attemptId/complete-upload", (c) =>
  c.json({
    requestId: c.get("requestId"),
    attemptId: c.req.param("attemptId"),
    status: "uploaded",
  }),
);

v1.post("/attempts/:attemptId/evaluate", (c) =>
  c.json(createMockEvaluateAttemptResponse(c.get("requestId"))),
);

v1.get("/attempts/:attemptId", (c) =>
  c.json({
    requestId: c.get("requestId"),
    attemptId: c.req.param("attemptId"),
    status: "draft",
  }),
);

app.route("/v1", v1);

app.notFound((c) =>
  c.json(
    apiErrorResponseSchema.parse({
      requestId: c.get("requestId"),
      code: "not_found",
      message: "Route not found.",
    }),
    404,
  ),
);

app.onError((error, c) => createErrorResponse(c, error, crypto.randomUUID()));

export default app;
