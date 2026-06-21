import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Music } from 'lucide-react';
import * as reelsApi from '../../api/reels.js';
import * as usersApi from '../../api/users.js';
import { formatNumber } from '../../utils/formatNumber.js';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function ReelItem({ reel, isActive, user }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const [isSaved, setIsSaved] = useState(reel.isSaved);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const containerRef = useRef(null);

  const handleDoubleTap = () => {
    setIsLiked(true);
    setLikesCount(prev => prev + 1);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="snap-item h-screen relative flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-800/50 to-orange-700/50" />
      <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlay}>
        {!isPlaying && (
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center" onDoubleClick={handleDoubleTap}>
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart size={120} className="text-white fill-white" />
          </motion.div>
        )}
      </div>

      {/* Bottom Left Info */}
      <div className="absolute bottom-24 left-4 text-white z-20 max-w-[60%]">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="font-bold text-sm cursor-pointer hover:underline"
            onClick={() => navigate(`/${user?.username}`)}
          >
            {user?.username}
          </span>
        </div>
        <p className="text-sm mb-1">{reel.caption}</p>
        <div className="flex items-center gap-1 text-sm">
          <Music size={14} />
          <span>{reel.audio}</span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4 z-20">
        <div className="flex flex-col items-center">
          <button onClick={() => { setIsLiked(!isLiked); setLikesCount(prev => isLiked ? prev - 1 : prev + 1); }}>
            <Heart size={28} className={isLiked ? 'text-ig-red fill-ig-red' : 'text-white'} />
          </button>
          <span className="text-white text-xs font-semibold">{formatNumber(likesCount)}</span>
        </div>
        <div className="flex flex-col items-center">
          <button onClick={() => navigate(`/p/${reel.id}/comments`)}>
            <MessageCircle size={28} className="text-white" />
          </button>
          <span className="text-white text-xs font-semibold">{formatNumber(reel.comments)}</span>
        </div>
        <div className="flex flex-col items-center">
          <button>
            <Share2 size={28} className="text-white" />
          </button>
          <span className="text-white text-xs font-semibold">{formatNumber(reel.shares)}</span>
        </div>
        <button onClick={() => setIsSaved(!isSaved)}>
          <Bookmark size={28} className={isSaved ? 'text-white fill-white' : 'text-white'} />
        </button>
        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
          <Music size={20} className="text-white" />
        </div>
        <button>
          <MoreHorizontal size={28} className="text-white" />
        </button>
      </div>

      {/* Top Progress Bar */}
      <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
        {[0, 1, 2].map((_, i) => (
          <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full bg-white rounded-full ${i === 0 ? 'w-full' : 'w-0'}`} />
          </div>
        ))}
      </div>

      {/* Back button */}

      {/* View count */}
      <div className="absolute bottom-24 left-4 text-white/60 text-xs z-20" style={{ bottom: '160px' }}>
        {formatNumber(reel.views)} views
      </div>
    </div>
  );
}

export default function ReelsPage() {
  const navigate = useNavigate();
  const [reelsData, setReelsData] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { setActiveIndex(0); }, [reelsData]);

  useEffect(() => {
    reelsApi.getReels().then(res => {
      const items = res.reels || res.data || res || [];
      setReelsData(items);
      const userIds = [...new Set(items.map(r => r.userId))];
      Promise.all(userIds.map(id => usersApi.getUserById(id).then(r => ({ id, user: r.user || r }))))
        .then(results => {
          const map = {};
          results.forEach(({ id, user }) => { map[id] = user; });
          setUserMap(map);
        });
    }).catch(() => setReelsData([]));
  }, []);

  return (
    <div className="snap-container h-screen bg-black relative">
      <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-30 text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
          {reelsData.map((reel, index) => (
            <ReelItem key={reel.id} reel={reel} isActive={index === activeIndex} user={userMap[reel.userId]} />
          ))}
    </div>
  );
}
