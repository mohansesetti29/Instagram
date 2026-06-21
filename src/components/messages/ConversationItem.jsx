import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar.jsx';
import { formatMessageTime } from '../../utils/formatTime.js';
import * as usersApi from '../../api/users.js';

export default function ConversationItem({ conversation, onClick }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    usersApi.getUserById(conversation.userId)
      .then(res => setUser(res.user || res))
      .catch(() => setUser(null));
  }, [conversation.userId]);

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(conversation);
    } else {
      navigate(`/messages/${conversation.id}`);
    }
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
      onClick={handleClick}
    >
      <div className="relative">
        <Avatar src={user?.avatar} size={44} />
        {conversation.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-ig-green rounded-full border-2 border-white dark:border-black" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate">{user?.username || '...'}</p>
          <p className="text-[11px] text-gray-500 ml-2">{formatMessageTime(conversation.lastTime)}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
          {conversation.unread && <div className="w-2 h-2 bg-ig-blue rounded-full flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
}
