import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as hashtagsApi from '../../api/hashtags.js';
import { formatNumber } from '../../utils/formatNumber.js';
import ExploreGrid from '../../components/explore/ExploreGrid.jsx';

export default function HashtagPage() {
  const { hashtag } = useParams();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const [tag, setTag] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!hashtag) return;
    hashtagsApi.getHashtag(hashtag).then(res => {
      const d = res.data || res;
      setTag(d.hashtag || d);
      setPosts(d.posts || []);
    }).catch(() => { setTag(null); setPosts([]); });
  }, [hashtag]);

  const tagPosts = posts.slice(0, 18);

  if (!tag) {
    return (
      <div className="max-w-[935px] mx-auto py-8 px-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">#tag not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[935px] mx-auto py-4 px-4">
      <div className="mb-6 flex items-center gap-4">
        <div className="w-[80px] h-[80px] bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-500">#</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">#{tag.tag || hashtag}</h1>
          <p className="text-sm text-gray-500">{formatNumber(tag.postCount || tag.count || posts.length)} posts</p>
          <button
            onClick={() => setFollowing(!following)}
            className={`mt-1 px-5 py-1.5 rounded-lg text-sm font-semibold transition-colors
              ${following ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600' : 'bg-ig-blue text-white'}`}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 mb-4">
        {tagPosts.slice(0, 3).map(post => (
          <div key={post.id} className="col-span-1 row-span-2 cursor-pointer" onClick={() => navigate(`/p/${post.id}`)}>
            <img src={post.images?.[0] || post.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <ExploreGrid posts={tagPosts} />
    </div>
  );
}
