import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function PrivacySettingsPage() {
  const navigate = useNavigate();
  const items = [
    { label: 'Account Privacy', desc: 'Private account' },
    { label: 'Activity Status', desc: 'Show activity status' },
    { label: 'Story', desc: 'Control who can see your stories' },
    { label: 'Tagging', desc: 'Control tagging options' },
    { label: 'Comments', desc: 'Filter and control comments' },
    { label: 'Messages', desc: 'Control who can message you' },
    { label: 'Muted Accounts', desc: 'Manage muted accounts' },
  ];

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Privacy</h1>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
            <div>
              <p className="text-sm text-gray-900 dark:text-gray-200">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
