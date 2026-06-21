import { ChevronRight } from 'lucide-react';

export default function SettingsRow({ label, desc, onClick, danger }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 ${danger ? 'text-red-500' : 'text-gray-900 dark:text-gray-200'}`}>
      <div className="text-left">
        <p className="text-sm">{label}</p>
        {desc && <p className="text-xs text-gray-500">{desc}</p>}
      </div>
      <ChevronRight size={16} className="text-gray-400" />
    </button>
  );
}
