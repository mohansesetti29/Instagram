import { useNavigate } from 'react-router-dom';
import { users } from '../../data/dummyData.js';

export default function PostComments({ post }) {
  const navigate = useNavigate();

  if (!post.comments || post.comments.length === 0) return null;

  const previewComments = post.comments.slice(0, 2);
  const remainingCount = post.comments.length - 2;

  return (
    <div className="px-4 py-0.5">
      {remainingCount > 0 && (
        <button
          className="text-sm text-gray-500 dark:text-gray-400 mb-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          onClick={() => navigate(`/p/${post.id}/comments`)}
        >
          View all {post.comments.length} comments
        </button>
      )}
      {previewComments.map(comment => {
        const commentUser = users.find(u => u.id === comment.userId);
        return (
          <div key={comment.id} className="text-sm mb-0.5">
            <span
              className="font-semibold text-gray-900 dark:text-gray-200 cursor-pointer hover:underline mr-1"
              onClick={() => navigate(`/${commentUser?.username}`)}
            >
              {commentUser?.username}
            </span>
            <span className="text-gray-900 dark:text-gray-200">{comment.text}</span>
          </div>
        );
      })}
    </div>
  );
}
