import StoryBar from '../../components/feed/StoryBar.jsx';
import Feed from '../../components/feed/Feed.jsx';
import Avatar from '../../components/common/Avatar.jsx';
import SuggestedUsers from '../../components/common/SuggestedUsers.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center gap-8 py-4 px-4 md:px-8">
      <div className="w-full max-w-[630px]">
        <StoryBar />
        <Feed />
      </div>
      <aside className="hidden xl:block w-[319px] flex-shrink-0 pt-1">
        <div className="sticky top-4">
          {user && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={user.avatar} username={user.username} size={44} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
                <p className="text-xs text-gray-500">{user.fullName}</p>
              </div>
              <button className="text-xs font-semibold text-ig-blue">Switch</button>
            </div>
          )}
          <SuggestedUsers count={5} />
          <div className="mt-6 text-[11px] text-gray-400 leading-relaxed">
            About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified
          </div>
          <p className="text-[11px] text-gray-400 mt-2">© 2024 Instagram</p>
        </div>
      </aside>
    </div>
  );
}
