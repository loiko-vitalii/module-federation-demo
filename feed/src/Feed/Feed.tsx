import { clsx } from 'clsx';

import { useSearchParams } from 'react-router-dom';

import type { StyleOverrides } from 'uikit/types';

import { VideoCard, VideoCardSkeleton } from './VideoCard';
import { PAGINATION_LIMIT } from './constants.ts';
import { feed, feedUpdating } from './styles.module.css';
import { useInfiniteLoading } from './useInfiniteLoading.ts';
import { useResetScrollOnSearch } from './useResetScrollOnSearch.ts';
import { useSearchVideos } from './useSearchVideos.ts';

const skeletons = Array.from({ length: PAGINATION_LIMIT }, (_, index) => ({ id: index + 1 })).map(({ id }) => (
  <VideoCardSkeleton key={id} />
));

export interface Props extends StyleOverrides {}

export const Feed = ({ className }: Props) => {
  useResetScrollOnSearch();

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const {
    data: { data, search: dataSearch },
    isLoading,
    loadMore,
    hasMore,
  } = useSearchVideos({ search });

  const { loaderRef } = useInfiniteLoading({ hasMore, loadMore });

  return (
    <div className={clsx(feed, isLoading && data.length > 0 && search !== dataSearch && feedUpdating, className)}>
      {data.map(({ id, ...rest }) => (
        <VideoCard {...rest} key={id} />
      ))}
      {isLoading && skeletons}
      {hasMore && <div ref={loaderRef} />}
    </div>
  );
};
