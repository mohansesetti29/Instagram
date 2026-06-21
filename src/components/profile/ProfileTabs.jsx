import { Grid, Clapperboard, Bookmark } from 'lucide-react';

const tabs = [
  { id: 'posts', icon: <Grid size={12} /> },
  { id: 'reels', icon: <Clapperboard size={12} /> },
  { id: 'tagged', icon: <Bookmark size={12} /> },
];

export default function ProfileTabs({ activeTab, onChange }) {
  return (
    <div className="flex justify-center border-t border-gray-200 dark:border-gray-700">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-1 px-6 py-3 text-xs font-semibold uppercase tracking-wider relative ${activeTab === tab.id ? 'text-ig-blue' : 'text-gray-500'}`}
        >
          {tab.icon}
          {tab.id}
          {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-0.5 bg-ig-blue" />}
        </button>
      ))}
    </div>
  );
}
