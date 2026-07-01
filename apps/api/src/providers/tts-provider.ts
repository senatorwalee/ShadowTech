import type { TranscriptWord } from "@nija-to-native/shared";
import { ProviderNotConfiguredError } from "../errors";

export type TtsRequest = {
  text: string;
  speakerId: string;
  outputObjectKey: string;
};

export type TtsResult = {
  objectKey: string;
  durationSeconds?: number;
  words?: TranscriptWord[];
};

export interface TtsProvider {
  generateSpeech(request: TtsRequest): Promise<TtsResult>;
}

export class AzureTtsProvider implements TtsProvider {
  async generateSpeech(): Promise<TtsResult> {
    throw new ProviderNotConfiguredError("Azure Text to Speech");
  }
}
