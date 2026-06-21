import { Heart, MessageCircle, Share2, Bookmark, Music, MoreHorizontal } from 'lucide-react';

export default function ReelActions({ reel, isLiked, isSaved, onLike, onSave }) {
  return (
    <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4 z-10">
      <div className="flex flex-col items-center">
        <button onClick={onLike}>
          <Heart size={28} className={isLiked ? 'text-ig-red fill-ig-red' : 'text-white'} />
        </button>
        <span className="text-white text-xs font-semibold">{reel.likes}</span>
      </div>
      <div className="flex flex-col items-center">
        <button><MessageCircle size={28} className="text-white" /></button>
        <span className="text-white text-xs font-semibold">{reel.comments}</span>
      </div>
      <div className="flex flex-col items-center">
        <button><Share2 size={28} className="text-white" /></button>
        <span className="text-white text-xs font-semibold">{reel.shares}</span>
      </div>
      <button onClick={onSave}>
        <Bookmark size={28} className={isSaved ? 'text-white fill-white' : 'text-white'} />
      </button>
      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
        <Music size={20} className="text-white" />
      </div>
      <button><MoreHorizontal size={28} className="text-white" /></button>
    </div>
  );
}
