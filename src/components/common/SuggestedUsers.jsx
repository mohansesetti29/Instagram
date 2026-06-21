import { useState, useEffect } from 'react';
import Avatar from './Avatar.jsx';
import FollowButton from './FollowButton.jsx';
import * as usersApi from '../../api/users.js';

export default function SuggestedUsers({ count = 5 }) {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    usersApi.getSuggestedUsers()
      .then(res => {
        const items = res.users || res.data || res || [];
        setSuggested(items.filter(u => !u.isFollowing && u.id !== '20').slice(0, count));
      })
      .catch(() => setSuggested([]));
  }, [count]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Suggested for you</span>
        <button className="text-xs font-semibold text-gray-900 dark:text-gray-200">See All</button>
      </div>
      {suggested.map(user => (
        <div key={user.id} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar src={user.avatar} username={user.username} size={32} />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 leading-tight">{user.username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.fullName}</p>
            </div>
          </div>
          <FollowButton targetUsername={user.username} targetUserId={user.id} isFollowing={user.isFollowing} />
        </div>
      ))}
    </div>
  );
}
