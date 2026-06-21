import { useState, useEffect } from 'react';
import * as usersApi from '../../api/users.js';
import Avatar from '../../components/common/Avatar.jsx';
import FollowButton from '../../components/common/FollowButton.jsx';
import { formatNumber } from '../../utils/formatNumber.js';

export default function PeoplePage() {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    usersApi.getSuggestedUsers().then(res => {
      const items = res.users || res.data || res || [];
      setSuggested(items.filter(u => u.id !== '20'));
    }).catch(() => setSuggested([]));
  }, []);

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Suggested for you</h1>
      {suggested.map(user => (
        <div key={user.id} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800">
          <Avatar src={user.avatar} username={user.username} size={44} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
            <p className="text-xs text-gray-500">{user.fullName}</p>
            <p className="text-xs text-gray-500">{formatNumber(user.followers)} followers</p>
          </div>
          <FollowButton targetUsername={user.username} targetUserId={user.id} isFollowing={user.isFollowing} />
        </div>
      ))}
    </div>
  );
}
