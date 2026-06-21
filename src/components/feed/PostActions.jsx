import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PostActions({ post, onLikeToggle, onSaveToggle }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-1">
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => onLikeToggle?.(post.id)}
          whileTap={{ scale: 1.3 }}
          className="transition-transform"
        >
          {post.isLiked ? (
            <Heart size={24} className="text-ig-red fill-ig-red" />
          ) : (
            <Heart size={24} className="text-gray-900 dark:text-gray-200" />
          )}
        </motion.button>
        <button onClick={() => navigate(`/p/${post.id}`)}>
          <MessageCircle size={24} className="text-gray-900 dark:text-gray-200" />
        </button>
        <button onClick={() => navigate(`/p/${post.id}`)}>
          <Send size={24} className="text-gray-900 dark:text-gray-200" />
        </button>
      </div>
      <motion.button
        onClick={() => onSaveToggle?.(post.id)}
        whileTap={{ scale: 1.2 }}
      >
        {post.isSaved ? (
          <Bookmark size={24} className="text-gray-900 dark:text-gray-200 fill-gray-900 dark:fill-gray-200" />
        ) : (
          <Bookmark size={24} className="text-gray-900 dark:text-gray-200" />
        )}
      </motion.button>
    </div>
  );
}
