import { useParams, useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { useState } from 'react';
import { getPostById, users } from '../../data/dummyData.js';
import Avatar from '../../components/common/Avatar.jsx';
import FollowButton from '../../components/common/FollowButton.jsx';

export default function PostLikedByPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = getPostById(postId);
  const [search, setSearch] = useState('');

  const likers = users.filter(u => u.isFollowing);

  return (
    <div className="min-h-screen bg-white dark:bg-black max-w-[400px] mx-auto">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <div />
        <h2 className="font-semibold text-base text-gray-900 dark:text-gray-200">Liked by</h2>
        <button onClick={() => navigate(-1)}><X size={24} className="text-gray-900 dark:text-gray-200" /></button>
      </div>
      <div className="px-4 py-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="Search"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-2 pl-8 pr-3 text-sm outline-none text-gray-900 dark:text-gray-200 placeholder-gray-500"
          />
        </div>
      </div>
      <div>
        {likers.filter(u => u.username.toLowerCase().includes(search.toLowerCase())).map(user => (
          <div key={user.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
            onClick={() => navigate(`/${user.username}`)}>
            <Avatar src={user.avatar} size={44} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
              <p className="text-xs text-gray-500">{user.fullName}</p>
            </div>
            <FollowButton targetUsername={user.username} isFollowing={user.isFollowing} />
          </div>
        ))}
      </div>
    </div>
  );
}
