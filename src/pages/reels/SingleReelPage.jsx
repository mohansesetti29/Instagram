import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Music, MoreHorizontal } from 'lucide-react';
import * as reelsApi from '../../api/reels.js';
import * as usersApi from '../../api/users.js';
import { formatNumber } from '../../utils/formatNumber.js';

export default function SingleReelPage() {
  const { reelId } = useParams();
  const navigate = useNavigate();
  const [reel, setReel] = useState(null);
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!reelId) return;
    reelsApi.getReelById(reelId).then(res => {
      const r = res.reel || res;
      setReel(r);
      setIsLiked(r.isLiked || false);
      setIsSaved(r.isSaved || false);
      return usersApi.getUserById(r.userId);
    }).then(res => setUser(res.user || res)).catch(() => { setReel(null); setUser(null); });
  }, [reelId]);

  if (!reel) return <div className="flex items-center justify-center h-screen text-gray-500">Loading reel...</div>;

  return (
    <div className="h-screen bg-black relative flex items-center justify-center">
      <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-10 text-white">
        <ArrowLeft size={28} />
      </button>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-800/50 to-orange-700/50" />

      <div className="absolute bottom-24 left-4 text-white z-10 max-w-[60%]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-sm cursor-pointer hover:underline">{user?.username}</span>
        </div>
        <p className="text-sm mb-1">{reel.caption}</p>
        <div className="flex items-center gap-1 text-sm">
          <Music size={14} />
          <span>{reel.audio}</span>
        </div>
      </div>

      <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4 z-10">
        <div className="flex flex-col items-center">
          <button onClick={() => setIsLiked(!isLiked)}>
            <Heart size={28} className={isLiked ? 'text-ig-red fill-ig-red' : 'text-white'} />
          </button>
          <span className="text-white text-xs font-semibold">{formatNumber(reel.likes)}</span>
        </div>
        <div className="flex flex-col items-center">
          <button><MessageCircle size={28} className="text-white" /></button>
          <span className="text-white text-xs font-semibold">{formatNumber(reel.comments)}</span>
        </div>
        <div className="flex flex-col items-center">
          <button><Share2 size={28} className="text-white" /></button>
          <span className="text-white text-xs font-semibold">{formatNumber(reel.shares)}</span>
        </div>
        <button onClick={() => setIsSaved(!isSaved)}>
          <Bookmark size={28} className={isSaved ? 'text-white fill-white' : 'text-white'} />
        </button>
        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
          <Music size={20} className="text-white" />
        </div>
        <button><MoreHorizontal size={28} className="text-white" /></button>
      </div>
    </div>
  );
}
