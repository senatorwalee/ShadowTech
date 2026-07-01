import type { YouTubeValidationResult } from "@nija-to-native/shared";
import { ProviderNotConfiguredError } from "../errors";

export type YouTubeValidationRequest = {
  url: string;
  videoId: string;
};

export interface YouTubeProvider {
  validateVideo(request: YouTubeValidationRequest): Promise<YouTubeValidationResult>;
}

export class YouTubeDataApiProvider implements YouTubeProvider {
  async validateVideo(): Promise<YouTubeValidationResult> {
    throw new ProviderNotConfiguredError("YouTube Data API");
  }
}
