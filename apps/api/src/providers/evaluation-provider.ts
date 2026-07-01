import type { EvaluationResult, PracticeSection } from "@nija-to-native/shared";
import { ProviderNotConfiguredError } from "../errors";

export type EvaluationRequest = {
  attemptId: string;
  referenceScript?: string;
  userRecordingObjectKey: string;
  audioObjectKey?: string;
  mediaId?: string;
  practiceSection?: PracticeSection;
  focusWords?: string[];
  contrastWords?: string[];
};

export interface EvaluationProvider {
  evaluate(request: EvaluationRequest): Promise<EvaluationResult>;
}

export class AzurePronunciationProvider implements EvaluationProvider {
  async evaluate(): Promise<EvaluationResult> {
    throw new ProviderNotConfiguredError("Azure Pronunciation Assessment");
  }
}
