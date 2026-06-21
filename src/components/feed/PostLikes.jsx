import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../utils/formatNumber.js';
import { users } from '../../data/dummyData.js';

export default function PostLikes({ post }) {
  const navigate = useNavigate();

  // Find the first liker for "Liked by X and others"
  const firstLiker = users.find(u => u.isFollowing);

  return (
    <div className="px-4 py-0.5">
      {post.likes > 0 && (
        <button
          className="font-semibold text-sm text-gray-900 dark:text-gray-200 hover:underline"
          onClick={() => navigate(`/p/${post.id}/liked_by`)}
        >
          {post.likes === 1 ? '1 like' : `${formatNumber(post.likes)} likes`}
        </button>
      )}
      {firstLiker && post.likes > 1 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Liked by{' '}
          <span
            className="font-semibold text-gray-900 dark:text-gray-200 cursor-pointer hover:underline"
            onClick={() => navigate(`/${firstLiker.username}`)}
          >
            {firstLiker.username}
          </span>
          {' and '}
          <span className="font-semibold text-gray-900 dark:text-gray-200">
            {formatNumber(post.likes - 1)} others
          </span>
        </p>
      )}
    </div>
  );
}
