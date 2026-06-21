import { formatTime } from '../../utils/formatTime.js';

export default function PostTimestamp({ post }) {
  return (
    <div className="px-4 py-1 pb-2">
      <span className="text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {formatTime(post.timestamp)}
      </span>
    </div>
  );
}
