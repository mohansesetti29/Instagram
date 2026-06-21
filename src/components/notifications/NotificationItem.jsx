import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, UserPlus, AtSign, Tag, Video } from 'lucide-react';
import { users } from '../../data/dummyData.js';
import Avatar from '../common/Avatar.jsx';
import { formatTime } from '../../utils/formatTime.js';

const typeIcons = {
  like: <Heart size={18} className="text-ig-red" />,
  comment: <MessageCircle size={18} className="text-ig-blue" />,
  follow: <UserPlus size={18} className="text-ig-blue" />,
  mention: <AtSign size={18} className="text-yellow-500" />,
  tag: <Tag size={18} className="text-ig-blue" />,
  live: <Video size={18} className="text-ig-red" />,
  story_like: <Heart size={18} className="text-pink-500" />,
};

const typeTexts = {
  like: ' liked your photo.',
  comment: ' commented: ',
  follow: ' started following you.',
  mention: ' mentioned you in a comment.',
  tag: ' tagged you in a photo.',
  live: ' is now live.',
  story_like: ' liked your story.',
};

export default function NotificationItem({ notification }) {
  const navigate = useNavigate();
  const user = users.find(u => u.id === notification.userId);

  return (
    <div
      className={`flex items-center gap-3 px-2 py-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
      onClick={() => notification.postId && navigate(`/p/${notification.postId}`)}
    >
      <div className="relative">
        <Avatar src={user?.avatar} size={44} />
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-black rounded-full p-0.5">
          {typeIcons[notification.type] || typeIcons.like}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-gray-200">
          <span className="font-semibold">{user?.username}</span>
          {typeTexts[notification.type]}
          {notification.type === 'comment' && `"${notification.text}"`}
        </p>
        <p className="text-xs text-gray-500">{formatTime(notification.timestamp)}</p>
      </div>
      {notification.postThumbnail && (
        <img src={notification.postThumbnail} alt="" className="w-11 h-11 rounded object-cover" />
      )}
      {notification.type === 'follow' && (
        <button className="bg-ig-blue text-white px-4 py-1.5 rounded-lg text-xs font-semibold">Follow Back</button>
      )}
      {notification.type === 'live' && (
        <button className="bg-ig-red text-white px-4 py-1.5 rounded-lg text-xs font-semibold">Watch</button>
      )}
    </div>
  );
}
