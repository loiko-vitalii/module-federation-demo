import { useEffect } from 'react';

export const useResetScrollOnSearch = () => {
  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener('search', () => window.scrollTo({ top: 0, behavior: 'instant' }), {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);
};
