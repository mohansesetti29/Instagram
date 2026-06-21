import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '../../data/dummyData.js';
import Avatar from '../../components/common/Avatar.jsx';

export default function ProfileSettingsPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Account</h1>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-gray-800">
          <Avatar src={user?.avatar} size={44} />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user?.username}</p>
            <p className="text-xs text-gray-500">{user?.fullName}</p>
          </div>
        </div>
        {[
          { label: 'Personal information', onClick: () => navigate('/profile/edit') },
          { label: 'Username', onClick: () => {} },
          { label: 'Bio', onClick: () => navigate('/profile/edit') },
          { label: 'Gender', onClick: () => {} },
        ].map((item, i) => (
          <button key={i} onClick={item.onClick}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200 ${i < 3 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
