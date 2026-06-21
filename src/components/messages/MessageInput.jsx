import { Send } from 'lucide-react';

export default function MessageInput({ message, setMessage, onSend }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="Message..."
          className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-gray-200 placeholder-gray-500"
        />
      </div>
      {message.trim() ? (
        <button onClick={onSend}><Send size={22} className="text-ig-blue" /></button>
      ) : (
        <button><Heart size={22} className="text-gray-500" /></button>
      )}
    </div>
  );
}
