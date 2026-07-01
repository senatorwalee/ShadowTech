import type { EvaluationResult } from "@nija-to-native/shared";
import { ProviderNotConfiguredError } from "../errors";

export type CoachingFeedbackRequest = {
  result: EvaluationResult;
  lessonContext: string;
};

export interface FeedbackProvider {
  createCoachingFeedback(request: CoachingFeedbackRequest): Promise<string>;
}

export class QwenFeedbackProvider implements FeedbackProvider {
  async createCoachingFeedback(): Promise<string> {
    throw new ProviderNotConfiguredError("Qwen Feedback");
  }
}
