import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExploreGrid from '../../components/explore/ExploreGrid.jsx';
import * as hashtagsApi from '../../api/hashtags.js';
import { MapPin } from 'lucide-react';

export default function LocationPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!id) return;
    hashtagsApi.getLocationPosts(id).then(res => {
      setPosts(res.posts || res.data || res || []);
    }).catch(() => setPosts([]));
  }, [id]);

  return (
    <div className="max-w-[935px] mx-auto py-4 px-4">
      <div className="mb-6">
        <div className="w-full h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
          <MapPin size={48} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200 capitalize">{id}</h1>
        <p className="text-sm text-gray-500">{posts.length} posts</p>
        <div className="flex gap-4 mt-2 border-b border-gray-200 dark:border-gray-700">
          {['Recent', 'Top'].map(tab => (
            <button key={tab} className={`pb-2 text-sm font-semibold ${tab === 'Recent' ? 'text-ig-blue border-b-2 border-ig-blue' : 'text-gray-500'}`}>{tab}</button>
          ))}
        </div>
      </div>
      <ExploreGrid posts={posts} />
    </div>
  );
}
