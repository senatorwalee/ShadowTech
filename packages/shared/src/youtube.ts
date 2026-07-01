const youtubeVideoIdPatterns = [
  /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/u,
  /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/u,
  /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/u,
  /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/u,
];

export function extractYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();

  for (const pattern of youtubeVideoIdPatterns) {
    const match = trimmed.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}
