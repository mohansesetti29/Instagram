import { useState, useCallback } from 'react';

export default function PostImage({ src, alt, onDoubleTap, aspectRatio = '1/1' }) {
  const [heartVisible, setHeartVisible] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastTap < 300) {
      onDoubleTap?.();
      setHeartVisible(true);
      setTimeout(() => setHeartVisible(false), 600);
      setLastTap(0);
    } else {
      setLastTap(now);
    }
  }, [lastTap, onDoubleTap]);

  return (
    <div className="relative w-full bg-black cursor-pointer" onClick={handleClick}>
      <img
        src={src}
        alt={alt || 'Post image'}
        className="w-full object-contain max-h-[600px]"
        style={{ aspectRatio }}
        loading="lazy"
      />
      {heartVisible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            className="heart-burst text-white"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      )}
    </div>
  );
}
