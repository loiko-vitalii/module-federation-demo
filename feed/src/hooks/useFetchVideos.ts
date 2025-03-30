import { useEffect, useState } from 'react';
import type { Loadable } from 'uikit/compiled-types/types';
import { fetchVideos } from '../api';

type HookResult<TData> = Loadable & {
  data: TData | undefined;
};

export interface Props {
  path: string;
  params?: Record<string, unknown>;
  enabled?: boolean;
}

export const useFetchVideos = <TData>({ path, params = {}, enabled = true }: Props): HookResult<TData> => {
  const [data, setData] = useState<HookResult<TData>['data']>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await fetchVideos<TData>(path, params, { signal: controller.signal });

        setData(data);
      } catch {
        console.error('Something went wrong while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, [path, params, enabled]);

  return { data, isLoading };
};
