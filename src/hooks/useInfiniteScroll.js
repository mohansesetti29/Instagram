import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = (callback, options = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef(null);

  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setIsLoading(true);
        callback().finally(() => setIsLoading(false));
      }
    }, { threshold: options.threshold || 0.1 });
    if (node) observer.current.observe(node);
  }, [callback, isLoading]);

  return { lastElementRef, isLoading };
};
