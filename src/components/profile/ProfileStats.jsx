export default function ProfileStats({ postsCount, followers, following }) {
  return (
    <div className="flex gap-6 mb-3">
      <span className="text-sm"><strong className="font-semibold text-gray-900 dark:text-gray-200">{postsCount}</strong> posts</span>
      <span className="text-sm"><strong className="font-semibold text-gray-900 dark:text-gray-200">{followers}</strong> followers</span>
      <span className="text-sm"><strong className="font-semibold text-gray-900 dark:text-gray-200">{following}</strong> following</span>
    </div>
  );
}
