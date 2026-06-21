import { formatMessageTime } from '../../utils/formatTime.js';

export default function MessageBubble({ message, isMine }) {
  return (
    <div key={message.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
        isMine
          ? 'bg-ig-blue text-white rounded-br-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-bl-md'
      }`}>
        <p>{message.text}</p>
        <p className={`text-[10px] mt-0.5 ${isMine ? 'text-white/70' : 'text-gray-400'}`}>
          {formatMessageTime(message.timestamp)}
          {isMine && message.seen && ' ✓✓'}
        </p>
      </div>
    </div>
  );
}
