import { users, hashtags } from '../../data/dummyData.js';
import Avatar from '../common/Avatar.jsx';
import { useNavigate } from 'react-router-dom';

export default function SearchSuggestions({ query }) {
  const navigate = useNavigate();

  if (!query) {
    return (
      <div className="py-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-4">Recent</h3>
        {users.slice(0, 5).map(user => (
          <div key={user.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
            onClick={() => navigate(`/${user.username}`)}>
            <Avatar src={user.avatar} size={44} />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
              <p className="text-xs text-gray-500">{user.fullName}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const matchedUsers = users.filter(u =>
    u.username.toLowerCase().includes(query.toLowerCase()) ||
    u.fullName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const matchedTags = hashtags.filter(h =>
    h.tag.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="py-2">
      {matchedUsers.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 px-4">Accounts</h3>
          {matchedUsers.map(user => (
            <div key={user.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
              onClick={() => navigate(`/${user.username}`)}>
              <Avatar src={user.avatar} size={44} />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
                <p className="text-xs text-gray-500">{user.fullName}</p>
              </div>
            </div>
          ))}
        </>
      )}
      {matchedTags.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 mb-1 px-4">Tags</h3>
          {matchedTags.map(h => (
            <div key={h.tag} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
              onClick={() => navigate(`/explore/tags/${h.tag}`)}>
              <div className="w-[44px] h-[44px] bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-lg">#</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">#{h.tag}</p>
                <p className="text-xs text-gray-500">{h.postCount.toLocaleString()} posts</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
