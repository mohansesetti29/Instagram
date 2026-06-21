import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { getCurrentUser } from '../../data/dummyData.js';
import Avatar from '../../components/common/Avatar.jsx';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [form, setForm] = useState({
    name: user?.fullName || '',
    username: user?.username || '',
    pronouns: '',
    bio: user?.bio || '',
    link: user?.website || '',
    gender: '',
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Edit profile</h1>
        </div>
        <button className="text-ig-blue font-semibold text-sm">Done</button>
      </div>

      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Avatar src={user?.avatar} size={64} />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer">
            <Camera size={20} className="text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user?.username}</p>
          <button className="text-sm font-semibold text-ig-blue">Change photo</button>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'username', label: 'Username', type: 'text' },
          { key: 'pronouns', label: 'Pronouns', type: 'text', optional: true },
          { key: 'bio', label: 'Bio', type: 'textarea' },
          { key: 'link', label: 'Link', type: 'text' },
          { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] },
        ].map(field => (
          <div key={field.key} className="flex items-start gap-4">
            <label className="w-24 text-right text-sm font-semibold text-gray-900 dark:text-gray-200 pt-2">{field.label}</label>
            <div className="flex-1">
              {field.type === 'textarea' ? (
                <textarea
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none resize-none h-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                />
              ) : field.type === 'select' ? (
                <select
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                >
                  <option value="">{field.optional ? 'None' : 'Select...'}</option>
                  {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
