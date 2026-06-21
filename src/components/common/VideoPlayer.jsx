import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function VideoPlayer({ src, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`relative ${className}`} onClick={togglePlay}>
      <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center">
        {!isPlaying && (
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play size={32} className="text-white ml-1" />
          </div>
        )}
      </div>
    </div>
  );
}
