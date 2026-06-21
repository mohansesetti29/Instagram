import { useNavigate } from 'react-router-dom';
import { users } from '../../data/dummyData.js';
import VerifiedBadge from '../common/VerifiedBadge.jsx';

export default function PostCaption({ post }) {
  const navigate = useNavigate();
  const user = users.find(u => u.id === post.userId);

  const renderCaption = (text) => {
    return text.split(/(#\w+)/g).map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span
            key={i}
            className="text-ig-blue cursor-pointer hover:underline"
            onClick={() => navigate(`/explore/tags/${part.slice(1)}`)}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="px-4 py-0.5">
      <span className="text-sm">
        <span
          className="font-semibold text-gray-900 dark:text-gray-200 cursor-pointer hover:underline mr-1"
          onClick={() => navigate(`/${user?.username}`)}
        >
          {user?.username}
          {user?.isVerified && <VerifiedBadge />}
        </span>
        <span className="text-gray-900 dark:text-gray-200">{renderCaption(post.caption)}</span>
      </span>
    </div>
  );
}
