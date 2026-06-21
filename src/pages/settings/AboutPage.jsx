import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">About</h1>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="font-semibold text-base text-gray-900 dark:text-gray-200 mb-2">Instagram</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Instagram is a photo and video sharing social networking service owned by Meta Platforms.
          It allows users to upload and share photos, videos, stories, and reels with their followers.
        </p>
        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <p>Version: 1.0.0</p>
          <p>© 2024 Instagram from Meta</p>
        </div>
      </div>
    </div>
  );
}
