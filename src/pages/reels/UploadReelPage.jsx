import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

export default function UploadReelPage() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Upload Reel</h1>
      </div>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-16 text-center mb-4">
        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-sm">Drag and drop or click to upload your reel</p>
        <button className="mt-4 bg-ig-blue text-white px-6 py-2 rounded-lg text-sm font-semibold">Select file</button>
      </div>
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm outline-none resize-none h-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500"
      />
      <div className="flex justify-end mt-4">
        <button className="bg-ig-blue text-white px-6 py-2 rounded-lg text-sm font-semibold">Share</button>
      </div>
    </div>
  );
}
