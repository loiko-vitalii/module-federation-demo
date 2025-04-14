import { type MutableRefObject, useEffect, useRef } from 'react';

const INTERSECTION_OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: '50px' };

type HookResult = {
  loaderRef: MutableRefObject<HTMLDivElement | null>;
};

export interface Props {
  hasMore: boolean;
  loadMore: () => void;
}

export const useInfiniteLoading = ({ hasMore, loadMore }: Props): HookResult => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const loaderNode = loaderRef.current;

    if (!loaderNode) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    }, INTERSECTION_OBSERVER_OPTIONS);

    observer.observe(loaderNode);

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return { loaderRef };
};
