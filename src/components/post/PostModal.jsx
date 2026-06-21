import { motion, AnimatePresence } from 'framer-motion';
import PostHeader from '../feed/PostHeader.jsx';
import PostActions from '../feed/PostActions.jsx';
import PostLikes from '../feed/PostLikes.jsx';
import PostCaption from '../feed/PostCaption.jsx';
import PostTimestamp from '../feed/PostTimestamp.jsx';
import { users } from '../../data/dummyData.js';
import { X } from 'lucide-react';

export default function PostModal({ isOpen, onClose, post }) {
  if (!post || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-ig-elevated-dark rounded-lg max-w-[935px] w-[90vw] max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-2 right-2 z-10 text-white md:text-gray-900 dark:text-gray-200">
              <X size={24} />
            </button>
            <div className="md:w-[598px] bg-black flex-shrink-0">
              <img src={post.images?.[0]} alt="" className="w-full h-full object-contain max-h-[80vh]" />
            </div>
            <div className="flex-1 flex flex-col min-w-[335px]">
              <PostHeader post={post} />
              <div className="flex-1 overflow-y-auto px-4 py-2">
                <PostCaption post={post} />
                {(post.comments ?? []).slice(0, 5).map(comment => {
                  const commentUser = users.find(u => u.id === comment.userId);
                  return (
                    <div key={comment.id} className="flex items-start gap-2 mb-3">
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-200">{commentUser?.username}</span>
                      <span className="text-sm text-gray-900 dark:text-gray-200">{comment.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 border-t border-gray-200 dark:border-gray-700">
                <PostActions post={post} />
                <PostLikes post={post} />
                <PostTimestamp post={post} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
