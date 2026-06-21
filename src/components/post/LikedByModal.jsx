import { motion, AnimatePresence } from 'framer-motion';
import { users } from '../../data/dummyData.js';
import Avatar from '../common/Avatar.jsx';

export default function LikedByModal({ isOpen, onClose, post }) {
  if (!isOpen || !post) return null;

  const likers = users.filter(u => u.isFollowing);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-ig-elevated-dark rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Liked by</h3>
              <button onClick={onClose} className="text-gray-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-4 space-y-3">
              {likers.map(user => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar src={user.avatar} size={44} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.fullName}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
