import { ProviderNotConfiguredError } from "../errors";

export type SignedUploadUrlRequest = {
  objectKey: string;
  contentType: string;
  expiresInSeconds: number;
};

export interface StorageProvider {
  createSignedUploadUrl(request: SignedUploadUrlRequest): Promise<string>;
  createSignedDownloadUrl(objectKey: string, expiresInSeconds: number): Promise<string>;
  deleteObject(objectKey: string): Promise<void>;
}

export class R2StorageProvider implements StorageProvider {
  async createSignedUploadUrl(): Promise<string> {
    throw new ProviderNotConfiguredError("Cloudflare R2");
  }

  async createSignedDownloadUrl(): Promise<string> {
    throw new ProviderNotConfiguredError("Cloudflare R2");
  }

  async deleteObject(): Promise<void> {
    throw new ProviderNotConfiguredError("Cloudflare R2");
  }
}
