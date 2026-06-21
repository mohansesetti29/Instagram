import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { formatNumber } from '../../utils/formatNumber.js';

export default function ProfileGrid({ posts }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-1 mt-1">
      {posts.map(post => (
        <div key={post.id} className="aspect-square cursor-pointer group relative" onClick={() => navigate(`/p/${post.id}`)}>
          <img src={post.images?.[0]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
            <span className="text-white font-semibold flex items-center gap-1">
              <Heart size={16} fill="white" /> {formatNumber(post.likes)}
            </span>
            <span className="text-white font-semibold flex items-center gap-1">
              <MessageCircle size={16} fill="white" /> {formatNumber(post.comments?.length ?? 0)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
