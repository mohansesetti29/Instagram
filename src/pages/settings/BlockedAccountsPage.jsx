import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { users } from '../../data/dummyData.js';
import Avatar from '../../components/common/Avatar.jsx';

export default function BlockedAccountsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [blocked, setBlocked] = useState(users.slice(4, 7));

  const unblock = (id) => {
    setBlocked(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Blocked Accounts</h1>
      </div>
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text" placeholder="Search"
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-2 pl-8 pr-3 text-sm outline-none text-gray-900 dark:text-gray-200 placeholder-gray-500"
        />
      </div>
      <p className="text-sm text-gray-500 mb-4">{blocked.length} Blocked Accounts</p>
      {blocked.filter(u => u.username.toLowerCase().includes(search.toLowerCase())).map(user => (
        <div key={user.id} className="flex items-center gap-3 px-2 py-3">
          <Avatar src={user.avatar} size={44} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
            <p className="text-xs text-gray-500">{user.fullName}</p>
          </div>
          <button onClick={() => unblock(user.id)}
            className="border border-gray-300 dark:border-gray-600 px-4 py-1.5 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-200">
            Unblock
          </button>
        </div>
      ))}
    </div>
  );
}
