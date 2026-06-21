import Avatar from '../common/Avatar.jsx';

export default function StoryCircle({ user, onClick, viewed }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0" onClick={onClick}>
      <Avatar src={user?.avatar} username={user?.username} size={56} story={!viewed} />
      <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[64px]">
        {user?.username}
      </span>
    </div>
  );
}
