import Avatar from '../common/Avatar.jsx';
import VerifiedBadge from '../common/VerifiedBadge.jsx';
import FollowButton from '../common/FollowButton.jsx';
import { Settings } from 'lucide-react';

export default function ProfileHeader({ user, isOwn, postsCount, onEdit }) {
  return (
    <div className="flex gap-8 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
      <Avatar src={user.avatar} size={150} />
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h1 className="text-lg font-light text-gray-900 dark:text-gray-200">{user.username}</h1>
          {user.isVerified && <VerifiedBadge />}
          {isOwn ? (
            <button onClick={onEdit}
              className="border border-gray-300 dark:border-gray-600 px-5 py-1 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-200">
              Edit profile
            </button>
          ) : (
            <div className="flex gap-2">
              <FollowButton targetUsername={user.username} isFollowing={user.isFollowing} />
              <button className="bg-ig-blue text-white px-5 py-1 rounded-lg text-sm font-semibold">Message</button>
            </div>
          )}
          <button><Settings size={24} className="text-gray-900 dark:text-gray-200" /></button>
        </div>
        <div className="flex gap-6 mb-3 text-sm">
          <span><strong className="font-semibold text-gray-900 dark:text-gray-200">{postsCount}</strong> posts</span>
          <span><strong className="font-semibold text-gray-900 dark:text-gray-200">{user.followers}</strong> followers</span>
          <span><strong className="font-semibold text-gray-900 dark:text-gray-200">{user.following}</strong> following</span>
        </div>
      </div>
    </div>
  );
}
