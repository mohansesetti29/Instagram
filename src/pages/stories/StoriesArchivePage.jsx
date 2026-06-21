import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { stories } from '../../data/dummyData.js';
import { users } from '../../data/dummyData.js';

export default function StoriesArchivePage() {
  const navigate = useNavigate();

  const groupedByDate = {
    'Today': stories.slice(0, 3),
    'Yesterday': stories.slice(3, 6),
    'Last Week': stories.slice(6, 9),
  };

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Archive</h1>
      </div>
      {Object.entries(groupedByDate).map(([label, items]) => (
        <div key={label} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">{label}</h2>
          <div className="grid grid-cols-4 gap-2">
            {items.map((story, i) => {
              const user = users.find(u => u.id === story.userId);
              return (
                <div key={i} className="relative cursor-pointer group">
                  <img src={story.items?.[0]?.url} alt="" className="w-full aspect-[9/16] object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-lg flex items-center justify-center transition-all">
                    <Play size={24} className="text-white opacity-0 group-hover:opacity-100" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">{user?.username}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
