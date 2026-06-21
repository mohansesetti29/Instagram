import { Plus } from 'lucide-react';

export default function ProfileHighlights({ highlights = [] }) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-6 pb-2">
      <div className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
        <div className="w-[56px] h-[56px] rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400">
          <Plus size={24} />
        </div>
        <span className="text-[11px] text-gray-500">New</span>
      </div>
      {highlights.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
          <div className="w-[56px] h-[56px] rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden">
            <img src={h.cover} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] text-gray-500 truncate max-w-[56px]">{h.label}</span>
        </div>
      ))}
    </div>
  );
}
