import Avatar from '../common/Avatar.jsx';
import { Heart } from 'lucide-react';
import { users } from '../../data/dummyData.js';

export default function CommentItem({ comment }) {
  const user = users.find(u => u.id === comment.userId);
  return (
    <div className="flex items-start gap-2 mb-3">
      <Avatar src={user?.avatar} size={24} />
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold text-gray-900 dark:text-gray-200 mr-1">{user?.username}</span>
          <span className="text-gray-900 dark:text-gray-200">{comment.text}</span>
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[11px] text-gray-500">{comment.likes} likes</span>
          <button className="text-[11px] font-semibold text-gray-500">Reply</button>
        </div>
      </div>
      <Heart size={12} className="text-gray-400 flex-shrink-0" />
    </div>
  );
}
