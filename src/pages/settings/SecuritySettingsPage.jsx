import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function SecuritySettingsPage() {
  const navigate = useNavigate();
  const items = [
    { label: 'Password', desc: 'Change your password', to: '/accounts/password/change' },
    { label: 'Two-factor authentication', desc: 'Add extra security' },
    { label: 'Login activity', desc: 'Review your logins', to: '/accounts/settings/login-activity' },
    { label: 'Saved login info', desc: 'Manage saved passwords' },
    { label: 'Apps and websites', desc: 'Manage authorized apps' },
    { label: 'Emails from Instagram', desc: 'Manage email preferences' },
  ];

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Security</h1>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {items.map((item, i) => (
          <button key={i} onClick={() => item.to && navigate(item.to)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 ${i < items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
            <div className="text-left">
              <p className="text-gray-900 dark:text-gray-200">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
