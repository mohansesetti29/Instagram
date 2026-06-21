import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Globe } from 'lucide-react';
import { formatTime } from '../../utils/formatTime.js';

export default function LoginActivityPage() {
  const navigate = useNavigate();
  const sessions = [
    { device: 'iPhone 15 Pro', location: 'New York, NY', date: Date.now() - 3600000 * 2 },
    { device: 'MacBook Pro', location: 'New York, NY', date: Date.now() - 86400000 },
    { device: 'Samsung Galaxy S24', location: 'Los Angeles, CA', date: Date.now() - 86400000 * 3 },
    { device: 'Windows PC - Chrome', location: 'Chicago, IL', date: Date.now() - 86400000 * 7 },
  ];

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Login Activity</h1>
      </div>
      <div className="space-y-2">
        {sessions.map((s, i) => (
          <div key={i} className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center gap-3">
            <Smartphone size={24} className="text-gray-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{s.device}</p>
              <p className="text-xs text-gray-500">{s.location} • {formatTime(s.date)}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-xs font-semibold text-ig-blue">This was me</button>
              <button className="text-xs font-semibold text-red-500">This wasn't me</button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-red-500 text-white py-2.5 rounded-lg text-sm font-semibold mt-4">
        Log out of all sessions
      </button>
    </div>
  );
}
