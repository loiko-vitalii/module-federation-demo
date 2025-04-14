import type { ApiVideoListResponse, Video } from './types';

export const prepareData = (videos: ApiVideoListResponse['items'] = []): Video[] =>
  videos.map(({ id, snippet, statistics }) => ({
    id,
    title: snippet.title,
    author: snippet.channelTitle,
    views: statistics.viewCount,
    url: `https://www.youtube.com/watch?v=${id}`,
    publishedAt: snippet.publishedAt,
    thumbnail: snippet.thumbnails.high.url,
  }));
