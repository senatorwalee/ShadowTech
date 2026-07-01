export type Env = {
  AZURE_SPEECH_KEY?: string;
  AZURE_SPEECH_REGION?: string;
  YOUTUBE_API_KEY?: string;
  QWEN_API_KEY?: string;
  REVENUECAT_WEBHOOK_SECRET?: string;
  R2_PUBLIC_BASE_URL?: string;
};

export type AppVariables = {
  requestId: string;
  userId?: string;
};
