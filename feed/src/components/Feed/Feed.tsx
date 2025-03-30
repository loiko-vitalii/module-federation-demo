import { clsx } from 'clsx';

import { useSearchParams } from 'react-router-dom';

import type { StyleOverrides } from 'uikit/types';

import { useSearchAndFetchVideos } from '../../hooks/useSearchAndFetchVideos.ts';

import { VideoCard, VideoCardSkeleton } from '../VideoCard';
import { feed, feedUpdating } from './styles.module.css';

const SKELETON_ITEMS = Array.from({ length: 50 }, (_, index) => ({ id: index + 1 }));

export interface Props extends StyleOverrides {}

export const Feed = ({ className }: Props) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const { data = [], isLoading } = useSearchAndFetchVideos({ search });

  return (
    <div className={clsx(feed, isLoading && data.length > 0 && feedUpdating, className)}>
      {isLoading && data.length === 0
        ? SKELETON_ITEMS.map(({ id }) => <VideoCardSkeleton key={id} />)
        : data.map(({ id, ...rest }) => <VideoCard {...rest} key={id} />)}
    </div>
  );
};
