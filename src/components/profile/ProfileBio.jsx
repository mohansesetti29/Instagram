export default function ProfileBio({ user }) {
  return (
    <div className="text-sm">
      {user.fullName && <p className="font-semibold text-gray-900 dark:text-gray-200">{user.fullName}</p>}
      {user.bio && <p className="text-gray-900 dark:text-gray-200">{user.bio}</p>}
      {user.website && <a href={user.website} className="text-ig-blue font-semibold text-sm">{user.website}</a>}
    </div>
  );
}
