import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/explore/SearchBar.jsx';
import Avatar from '../../components/common/Avatar.jsx';
import FollowButton from '../../components/common/FollowButton.jsx';
import * as hashtagsApi from '../../api/hashtags.js';
import * as postsApi from '../../api/posts.js';
import { formatNumber } from '../../utils/formatNumber.js';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('Top');
  const [accounts, setAccounts] = useState([]);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!query) return;
    hashtagsApi.search(query).then(res => {
      const data = res.data || res;
      setAccounts(data.users || []);
      setTags(data.hashtags || []);
      setPosts(data.posts || []);
    }).catch(() => { setAccounts([]); setTags([]); setPosts([]); });
  }, [query]);

  const tabs = ['Top', 'Accounts', 'Tags', 'Places'];

  const renderResults = () => {
    if (activeTab === 'Accounts' || activeTab === 'Top') {
      return accounts.map(user => (
        <div key={user.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/${user.username}`)}>
            <Avatar src={user.avatar} size={44} />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
              <p className="text-xs text-gray-500">{user.fullName}</p>
            </div>
          </div>
          <FollowButton targetUsername={user.username} targetUserId={user.id} isFollowing={user.isFollowing} />
        </div>
      ));
    }
    if (activeTab === 'Tags') {
      return tags.map(tag => (
        <div key={tag.id || tag.tag} className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => navigate(`/explore/tags/${tag.tag?.replace('#', '')}`)}>
          <div className="w-11 h-11 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-lg">#</div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{tag.tag}</p>
            <p className="text-xs text-gray-500">{formatNumber(tag.count)} posts</p>
          </div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="mb-4"><SearchBar initialValue={query} /></div>
      {query && (
        <>
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-4">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-semibold relative ${activeTab === tab ? 'text-ig-blue' : 'text-gray-500'}`}>
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ig-blue" />}
              </button>
            ))}
          </div>
          <div>{renderResults()}</div>
        </>
      )}
    </div>
  );
}
