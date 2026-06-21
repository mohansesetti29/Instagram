import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: 'HOW YOU USE INSTAGRAM',
    items: [
      { label: 'Account', to: '/accounts/settings/profile' },
      { label: 'Set up a professional account', to: '' },
      { label: 'Notifications', to: '/accounts/settings/notifications' },
      { label: 'Privacy', to: '/accounts/settings/privacy' },
      { label: 'Security', to: '/accounts/settings/security' },
      { label: 'Ads', to: '' },
      { label: 'Supervision', to: '' },
    ],
  },
  {
    title: 'YOUR APP AND MEDIA',
    items: [
      { label: 'Language', to: '' },
      { label: 'Saved', to: '' },
      { label: 'Archive', to: '/stories/archive' },
      { label: 'Activity status', to: '' },
    ],
  },
  {
    title: 'MORE INFO AND SUPPORT',
    items: [
      { label: 'Help center', to: '/accounts/settings/help' },
      { label: 'About', to: '/accounts/settings/about' },
      { label: 'Report a problem', to: '' },
    ],
  },
];

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Settings</h1>
      </div>
      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2 tracking-wider">{section.title}</h3>
          <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {section.items.map((item, i) => (
              <button
                key={i}
                onClick={() => item.to && navigate(item.to)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200 ${i < section.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
              >
                <span>{item.label}</span>
                {item.to && <ChevronRight size={16} className="text-gray-400" />}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
