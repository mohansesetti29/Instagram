import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CloseAccountPage() {
  const navigate = useNavigate();
  const [action, setAction] = useState('delete');
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Deactivate or Delete Account</h1>
      </div>

      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4">
        <div className="flex gap-4 mb-4">
          <button onClick={() => setAction('deactivate')}
            className={`flex-1 p-4 rounded-lg border-2 text-center ${action === 'deactivate' ? 'border-ig-blue' : 'border-gray-200 dark:border-gray-600'}`}>
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-200">Deactivate Account</p>
            <p className="text-xs text-gray-500 mt-1">Temporarily hide your account</p>
          </button>
          <button onClick={() => setAction('delete')}
            className={`flex-1 p-4 rounded-lg border-2 text-center ${action === 'delete' ? 'border-ig-red' : 'border-gray-200 dark:border-gray-600'}`}>
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-200">Delete Account</p>
            <p className="text-xs text-gray-500 mt-1">Permanently delete your account</p>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1">Reason (required)</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <option value="">Select a reason...</option>
            <option value="privacy">Privacy concerns</option>
            <option value="too_much_time">Spending too much time</option>
            <option value="not_using">Not using the app</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" />
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-700 dark:text-red-400">
            Warning: {action === 'delete' ? 'This will permanently delete your account.' : 'Your account will be deactivated for 30 days.'}
          </p>
        </div>

        <button className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white ${action === 'delete' ? 'bg-ig-red' : 'bg-gray-500'}`}>
          {action === 'delete' ? 'Delete current_user' : 'Deactivate Account'}
        </button>
      </div>
    </div>
  );
}
