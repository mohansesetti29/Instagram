import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function NotificationSettingsPage() {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState({
    posts: true, stories: true, reels: true,
    comments: true, likes: true, tags: true,
    followers: true, requests: true,
    live: true, dm: true,
    emailPosts: false, emailComments: false, emailFollows: true,
    sms: false,
  });

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const Switch = ({ checked, onChange }) => (
    <button onClick={onChange}
      className={`w-11 h-6 rounded-full p-0.5 transition-colors ${checked ? 'bg-ig-blue' : 'bg-gray-300 dark:bg-gray-600'}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );

  const sections = [
    {
      title: 'Push Notifications',
      items: [
        { label: 'Posts', key: 'posts' },
        { label: 'Stories', key: 'stories' },
        { label: 'Reels', key: 'reels' },
        { label: 'Comments', key: 'comments' },
        { label: 'Likes', key: 'likes' },
        { label: 'Tags', key: 'tags' },
        { label: 'Followers', key: 'followers' },
        { label: 'Requests', key: 'requests' },
        { label: 'Live', key: 'live' },
        { label: 'Direct Messages', key: 'dm' },
      ],
    },
    {
      title: 'Email Notifications',
      items: [
        { label: 'Posts', key: 'emailPosts' },
        { label: 'Comments', key: 'emailComments' },
        { label: 'Follows', key: 'emailFollows' },
      ],
    },
    {
      title: 'SMS Notifications',
      items: [
        { label: 'SMS notifications', key: 'sms' },
      ],
    },
  ];

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Notifications</h1>
      </div>
      {sections.map(section => (
        <div key={section.title} className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2 tracking-wider">{section.title}</h3>
          <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {section.items.map((item, i) => (
              <div key={item.key} className={`flex items-center justify-between px-4 py-3 ${i < section.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                <span className="text-sm text-gray-900 dark:text-gray-200">{item.label}</span>
                <Switch checked={toggles[item.key]} onChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
