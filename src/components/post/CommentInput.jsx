import { Smile } from 'lucide-react';

export default function CommentInput({ value, onChange, onSubmit }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
      <Smile size={20} className="text-gray-500" />
      <input
        type="text" placeholder="Add a comment..."
        value={value} onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        className="flex-1 text-sm outline-none bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-500"
      />
      <button className={`text-sm font-semibold ${value.trim() ? 'text-ig-blue' : 'text-ig-blue/50'}`}>Post</button>
    </div>
  );
}
