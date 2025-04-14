import { useCallback, useEffect, useRef, useState } from 'react';

import type { Loadable } from 'uikit/compiled-types/types';

import { fetchVideos } from './api';
import { PAGINATION_LIMIT } from './constants.ts';
import type { ApiSearchVideoResponse, ApiVideoListResponse, Video } from './types.ts';
import { prepareData } from './utils';

const INITIAL_STATE = { data: [], search: '', pageToken: '' };

type FetchDataHandler = (
  param: { search: string; pageToken?: string },
  options?: RequestInit,
) => Promise<HookResult['data'] | undefined>;

type HookResult = Loadable & {
  data: { data: Video[]; search: string; pageToken: string };
  hasMore: boolean;
  loadMore: () => void;
};

export interface Props {
  search: string;
}

export const useSearchVideos = ({ search }: Props): HookResult => {
  const [data, setData] = useState<HookResult['data']>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<HookResult['isLoading']>(false);
  const requestIdRef = useRef<number>(0);

  const fetchData = useCallback<FetchDataHandler>(async ({ search, pageToken }, options) => {
    const id = ++requestIdRef.current;

    try {
      setIsLoading(true);

      const { items, nextPageToken } = await fetchVideos<ApiSearchVideoResponse>(
        'search',
        {
          part: 'snippet',
          q: search,
          type: 'video',
          maxResults: PAGINATION_LIMIT,
          ...(pageToken ? { pageToken } : {}),
        },
        options,
      );

      const data = await fetchVideos<ApiVideoListResponse>(
        'videos',
        { part: 'snippet,statistics', id: items.map(({ id: { videoId } }) => videoId).join(',') },
        options,
      );

      return { search, data: prepareData(data.items), pageToken: nextPageToken };
    } catch {
      console.error('Something went wrong while fetching data');
    } finally {
      if (id === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const hasMore = !!data.pageToken;

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || data.data.length === 0) {
      return;
    }

    const newData = await fetchData({ search, pageToken: data.pageToken });

    if (newData) {
      setData((prevData) => ({ search, pageToken: newData.pageToken, data: prevData.data.concat(newData.data) }));
    }
  }, [hasMore, isLoading, fetchData, search, data.pageToken, data.data.length]);

  useEffect(() => {
    const controller = new AbortController();

    fetchData({ search }, { signal: controller.signal }).then((newData) => newData && setData(newData));

    return () => controller.abort();
  }, [search, fetchData]);

  return { data, isLoading, hasMore, loadMore };
};
