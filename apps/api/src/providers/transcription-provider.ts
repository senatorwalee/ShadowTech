import type { Transcript } from "@nija-to-native/shared";
import { ProviderNotConfiguredError } from "../errors";

export type TranscriptionRequest = {
  mediaId: string;
  audioObjectKey: string;
  language?: string;
};

export interface TranscriptionProvider {
  transcribe(request: TranscriptionRequest): Promise<Transcript>;
}

export class AzureSpeechToTextProvider implements TranscriptionProvider {
  async transcribe(): Promise<Transcript> {
    throw new ProviderNotConfiguredError("Azure Speech to Text");
  }
}
