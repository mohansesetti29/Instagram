import { useState, useCallback } from 'react';

export const useDoubleTap = (onDoubleTap, delay = 300) => {
  const [lastTap, setLastTap] = useState(0);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap < delay) {
      onDoubleTap();
      setLastTap(0);
    } else {
      setLastTap(now);
    }
  }, [lastTap, delay, onDoubleTap]);

  return handleTap;
};
