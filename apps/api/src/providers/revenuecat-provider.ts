import { ProviderNotConfiguredError } from "../errors";

export type RevenueCatWebhookResult = {
  userId: string;
  plan: "free" | "premium" | "beta";
};

export interface RevenueCatProvider {
  verifyWebhook(rawBody: string, signature?: string): Promise<RevenueCatWebhookResult>;
}

export class StubRevenueCatProvider implements RevenueCatProvider {
  async verifyWebhook(): Promise<RevenueCatWebhookResult> {
    throw new ProviderNotConfiguredError("RevenueCat");
  }
}
