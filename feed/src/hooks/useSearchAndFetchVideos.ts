import { useMemo } from 'react';

import type { ApiSearchVideoResponse, ApiVideoListResponse, Video } from '../types';

import type { Loadable } from 'uikit/compiled-types/types';
import { useFetchVideos } from './useFetchVideos.ts';

const prepareData = (videos: ApiVideoListResponse['items'] = []): Video[] =>
  videos.map(({ id, snippet, statistics }) => ({
    id,
    title: snippet.title,
    author: snippet.channelTitle,
    views: statistics.viewCount,
    url: `https://www.youtube.com/watch?v=${id}`,
    publishedAt: snippet.publishedAt,
    thumbnail: snippet.thumbnails.high.url,
  }));

type HookResult = Loadable & {
  data: Video[];
};

export interface Props {
  search: string;
}

export const useSearchAndFetchVideos = ({ search }: Props): HookResult => {
  const videoSearchParams = useMemo(() => ({ part: 'snippet', q: search, type: 'video', maxResults: 50 }), [search]);

  const {
    data: { items: searchItems = [] } = {},
    isLoading: isLoadingSearchResults,
  } = useFetchVideos<ApiSearchVideoResponse>({
    path: 'search',
    params: videoSearchParams,
  });

  const videoListParams = useMemo(
    () => ({ part: 'snippet,statistics', id: searchItems.map(({ id: { videoId } }) => videoId).join(',') }),
    [searchItems],
  );

  const {
    data: { items: videoItems = [] } = {},
    isLoading: isLoadingVideoList,
  } = useFetchVideos<ApiVideoListResponse>({
    path: 'videos',
    params: videoListParams,
    enabled: searchItems.length > 0,
  });

  return {
    isLoading: isLoadingSearchResults || isLoadingVideoList,
    data: prepareData(videoItems),
  };
};
