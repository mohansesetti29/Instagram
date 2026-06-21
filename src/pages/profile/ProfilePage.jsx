import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as usersApi from '../../api/users.js';
import * as postsApi from '../../api/posts.js';
import { formatNumber } from '../../utils/formatNumber.js';
import Avatar from '../../components/common/Avatar.jsx';
import VerifiedBadge from '../../components/common/VerifiedBadge.jsx';
import FollowButton from '../../components/common/FollowButton.jsx';
import { Settings, Grid, Clapperboard, Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    const identifier = username;
    usersApi.getUserByUsername(identifier)
      .then(res => {
        const u = res.user || res;
        setUser(u);
        return usersApi.getUserPosts(u.username || u.id);
      })
      .then(res => setUserPosts(res.posts || res.data || []))
      .catch(() => { setUser(null); setUserPosts([]); })
      .finally(() => setLoading(false));
  }, [username]);

  const { user: authUser } = useAuth();
  const isOwn = authUser?.id === user?.id;

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-ig-blue border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <div className="flex items-center justify-center h-64 text-gray-500">User not found</div>;

  return (
    <div className="max-w-[935px] mx-auto py-4 px-4">
      <div className="flex gap-8 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0">
          <Avatar src={user.avatar} size={150} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h1 className="text-lg font-light text-gray-900 dark:text-gray-200">{user.username}</h1>
            {user.isVerified && <VerifiedBadge />}
            {isOwn ? (
              <button onClick={() => navigate('/profile/edit')}
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
          <div className="flex gap-6 mb-3">
            <span className="text-sm"><strong className="font-semibold text-gray-900 dark:text-gray-200">{formatNumber(userPosts.length)}</strong> <span className="text-gray-500">posts</span></span>
            <button onClick={() => navigate(`/${username}/followers`)} className="text-sm hover:underline"><strong className="font-semibold text-gray-900 dark:text-gray-200">{formatNumber(user.followers)}</strong> <span className="text-gray-500">followers</span></button>
            <button onClick={() => navigate(`/${username}/following`)} className="text-sm hover:underline"><strong className="font-semibold text-gray-900 dark:text-gray-200">{formatNumber(user.following)}</strong> <span className="text-gray-500">following</span></button>
          </div>
          <div className="text-sm">
            {user.fullName && <p className="font-semibold text-gray-900 dark:text-gray-200">{user.fullName}</p>}
            {user.bio && <p className="text-gray-900 dark:text-gray-200">{user.bio}</p>}
            {user.website && <a href={user.website} className="text-ig-blue font-semibold text-sm">{user.website}</a>}
          </div>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-6 pb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
            <div className="w-[56px] h-[56px] rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 10v9H5V5h9V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-2.94-2.06L17 10l.94-1.06L19 8l-1.06-.94L17 6l-.94 1.06L15 8l1.06.94zM12 8.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" /></svg>
            </div>
            <span className="text-[11px] text-gray-500">Highlight {i + 1}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center border-t border-gray-200 dark:border-gray-700">
        {[
          { id: 'posts', icon: <Grid size={12} /> },
          { id: 'reels', icon: <Clapperboard size={12} /> },
          { id: 'tagged', icon: <Bookmark size={12} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-6 py-3 text-xs font-semibold uppercase tracking-wider relative ${
              activeTab === tab.id ? 'text-ig-blue' : 'text-gray-500'
            }`}
          >
            {tab.icon}
            {tab.id}
            {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-0.5 bg-ig-blue" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1 mt-1">
        {userPosts.map(post => (
          <div key={post.id} className="aspect-square cursor-pointer group relative" onClick={() => navigate(`/p/${post.id}`)}>
            <img src={post.images?.[0] || post.image || post.media?.[0]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
              <span className="text-white font-semibold flex items-center gap-1">
                <Heart size={16} fill="white" /> {formatNumber(post.likes)}
              </span>
              <span className="text-white font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" /></svg> {formatNumber(post.comments?.length || post.commentCount || 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
