import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import * as usersApi from '../../api/users.js';

export default function FollowButton({ targetUsername, targetUserId, isFollowing: initialFollowing, size = 'sm' }) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!user || loading) return;
    setLoading(true);
    setIsFollowing(!isFollowing);
    try {
      if (isFollowing) {
        await usersApi.unfollowUser(targetUserId || targetUsername);
      } else {
        await usersApi.followUser(targetUserId || targetUsername);
      }
    } catch (_) {
      setIsFollowing(isFollowing);
    } finally {
      setLoading(false);
    }
  };

  if (targetUsername === user?.username) return null;

  if (isFollowing) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`rounded-lg border px-4 py-1.5 text-sm font-semibold transition-all
          ${isHovered ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-white dark:bg-ig-elevated-dark'}`}
      >
        {isHovered ? 'Unfollow' : 'Following'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-ig-blue hover:bg-ig-blue-hover px-4 py-1.5 text-sm font-semibold text-white transition-colors"
    >
      {loading ? '...' : 'Follow'}
    </button>
  );
}
