import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function HelpPage() {
  const navigate = useNavigate();
  const items = ['Help Center', 'Privacy Center', 'Support Requests', 'Report a Problem', 'Known Issues'];

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Help</h1>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${i < items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
            <span className="text-gray-900 dark:text-gray-200">{item}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
