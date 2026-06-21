import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, UserPlus, AtSign, Tag, Video } from 'lucide-react';
import * as notificationsApi from '../../api/notifications.js';
import * as usersApi from '../../api/users.js';
import Avatar from '../../components/common/Avatar.jsx';
import { formatTime } from '../../utils/formatTime.js';

const getIcon = (type) => {
  switch (type) {
    case 'like': return <Heart size={18} className="text-ig-red" />;
    case 'comment': return <MessageCircle size={18} className="text-ig-blue" />;
    case 'follow': return <UserPlus size={18} className="text-ig-blue" />;
    case 'mention': return <AtSign size={18} className="text-yellow-500" />;
    case 'tag': return <Tag size={18} className="text-ig-blue" />;
    case 'live': return <Video size={18} className="text-ig-red" />;
    case 'story_like': return <Heart size={18} className="text-pink-500" />;
    default: return <Heart size={18} />;
  }
};

const groupByDate = (notifs) => {
  const now = Date.now();
  const day = 86400000;
  const groups = {};
  notifs.forEach(n => {
    const diff = now - n.timestamp;
    let key;
    if (diff < day) key = 'New';
    else if (diff < 7 * day) key = 'This week';
    else key = 'This month';
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  });
  return groups;
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    notificationsApi.getNotifications()
      .then(res => setNotifications(res.notifications || res.data || res || []))
      .catch(() => setNotifications([]));
    usersApi.searchUsers('')
      .then(res => setUsers(res.users || res.data || []))
      .catch(() => setUsers([]));
  }, []);

  const [filter, setFilter] = useState('All');
  const grouped = groupByDate(notifications);
  const findUser = (userId) => users.find(u => u.id === userId);

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Notifications</h1>
      {Object.entries(grouped).map(([label, notifs]) => (
        <div key={label} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">{label}</h2>
          {notifs.map(notif => {
            const user = findUser(notif.userId);
            return (
              <div key={notif.id}
                className={`flex items-center gap-3 px-2 py-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                onClick={() => notif.postId && navigate(`/p/${notif.postId}`)}
              >
                <div className="relative">
                  <Avatar src={user?.avatar} size={44} />
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-black rounded-full p-0.5">
                    {getIcon(notif.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-200">
                    <span className="font-semibold">{user?.username}</span>
                    {notif.type === 'like' && ' liked your photo.'}
                    {notif.type === 'comment' && ` commented: "${notif.text}"`}
                    {notif.type === 'follow' && ' started following you.'}
                    {notif.type === 'mention' && ' mentioned you in a comment.'}
                    {notif.type === 'tag' && ' tagged you in a photo.'}
                    {notif.type === 'live' && ' is now live.'}
                    {notif.type === 'story_like' && ' liked your story.'}
                  </p>
                  <p className="text-xs text-gray-500">{formatTime(notif.timestamp)}</p>
                </div>
                {notif.postThumbnail && (
                  <img src={notif.postThumbnail} alt="" className="w-11 h-11 rounded object-cover" />
                )}
                {notif.type === 'follow' && (
                  <button className="bg-ig-blue text-white px-4 py-1.5 rounded-lg text-xs font-semibold">Follow Back</button>
                )}
                {notif.type === 'live' && (
                  <button className="bg-ig-red text-white px-4 py-1.5 rounded-lg text-xs font-semibold">Watch</button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
