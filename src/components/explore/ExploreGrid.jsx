import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { formatNumber } from '../../utils/formatNumber.js';
import { useState } from 'react';

export default function ExploreGrid({ posts: explorePosts }) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  if (!explorePosts || explorePosts.length === 0) return null;

  // Build a masonry-like layout: every 5th item is large (2x2)
  const gridItems = explorePosts.slice(0, 30).map((post, index) => {
    const position = index % 5;
    const isLarge = position === 4;
    return { post, isLarge, index };
  });

  return (
    <div className="grid grid-cols-3 gap-[3px]">
      {gridItems.map(({ post, isLarge, index }) => (
        <div
          key={post.id}
          className={`relative cursor-pointer group overflow-hidden ${isLarge ? 'row-span-2 col-span-2' : ''}`}
          onMouseEnter={() => setHoveredId(post.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => navigate(`/p/${post.id}`)}
        >
          <img
            src={post.images?.[0]}
            alt=""
            className="w-full h-full object-cover"
            style={{ aspectRatio: isLarge ? undefined : '1/1' }}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-6 transition-opacity duration-200 ${hoveredId === post.id ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-1.5 text-white font-semibold">
              <Heart size={20} fill="white" />
              <span>{formatNumber(post.likes)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white font-semibold">
              <MessageCircle size={20} fill="white" />
              <span>{formatNumber(post.comments?.length ?? 0)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
