import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/explore/SearchBar.jsx';
import ExploreGrid from '../../components/explore/ExploreGrid.jsx';
import * as postsApi from '../../api/posts.js';

const categories = ['For You', 'Reels', 'Shops', 'Travel', 'Architecture', 'Decor', 'Food', 'Sport'];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('For You');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postsApi.getExplorePosts()
      .then(res => setPosts(res.posts || res.data || res || []))
      .catch(() => setPosts([]));
  }, []);

  const handleSearch = (query) => {
    if (query) navigate(`/explore/search?q=${encodeURIComponent(query)}`);
  };

  const filteredPosts = activeCategory === 'For You'
    ? posts
    : posts.filter(p => (p.caption || '').toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="max-w-[935px] mx-auto py-4 px-4">
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-4 pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors
              ${activeCategory === cat 
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      {filteredPosts.length > 0 ? (
        <ExploreGrid posts={filteredPosts} />
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No posts found</p>
          <p className="text-sm mt-1">Try a different category</p>
        </div>
      )}
    </div>
  );
}
