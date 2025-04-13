const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_DATA_API_KEY = import.meta.env.PUBLIC_YOUTUBE_DATA_API_KEY;

const cache = new Map();
const createCacheKey = (key: unknown[]) => JSON.stringify(key);

export const fetchVideos = async <T = unknown>(
  path: string,
  params: Record<string, unknown>,
  options?: RequestInit,
): Promise<T> => {
  const query = new URLSearchParams({ ...params, key: YOUTUBE_DATA_API_KEY });
  const cacheKey = createCacheKey([path, params]);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch(`${YOUTUBE_API_BASE}/${path}?${query}`, options);
  const data = await response.json();
  cache.set(cacheKey, data);

  return data;
};
