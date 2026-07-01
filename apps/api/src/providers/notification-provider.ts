import { ProviderNotConfiguredError } from "../errors";

export type PushNotificationRequest = {
  pushToken: string;
  title: string;
  body: string;
  deepLink?: string;
};

export interface PushNotificationProvider {
  send(request: PushNotificationRequest): Promise<void>;
}

export class ExpoPushNotificationProvider implements PushNotificationProvider {
  async send(): Promise<void> {
    throw new ProviderNotConfiguredError("Expo Notifications");
  }
}
