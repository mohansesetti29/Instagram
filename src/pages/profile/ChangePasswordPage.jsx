import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ current: '', newPwd: '', confirm: '' });
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-[500px] mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Change Password</h1>
      </div>
      <div className="space-y-4">
        {[
          { key: 'current', label: 'Current password', type: 'password' },
          { key: 'newPwd', label: 'New password', type: 'password' },
          { key: 'confirm', label: 'Confirm new password', type: 'password' },
        ].map(field => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1">{field.label}</label>
            <input
              type={field.type}
              value={form[field.key]}
              onChange={(e) => update(field.key, e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            />
          </div>
        ))}
        <button className="w-full bg-ig-blue text-white py-2 rounded-lg text-sm font-semibold mt-2">Change Password</button>
        <div className="flex justify-between text-sm">
          <button className="text-ig-blue font-semibold">Forgot password?</button>
          <button className="text-ig-blue font-semibold">Log out of all devices</button>
        </div>
      </div>
    </div>
  );
}
