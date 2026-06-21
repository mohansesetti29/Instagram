import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { StoryProvider } from './context/StoryContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import AuthLayout from './components/layout/AuthLayout.jsx';
import MessagesLayout from './components/layout/MessagesLayout.jsx';
import Toast from './components/common/Toast.jsx';

import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import OTPPage from './pages/auth/OTPPage.jsx';
import EmailSignupPage from './pages/auth/EmailSignupPage.jsx';

import HomePage from './pages/feed/HomePage.jsx';
import ExplorePage from './pages/explore/ExplorePage.jsx';
import SearchResultsPage from './pages/explore/SearchResultsPage.jsx';
import HashtagPage from './pages/explore/HashtagPage.jsx';
import LocationPage from './pages/explore/LocationPage.jsx';
import PeoplePage from './pages/explore/PeoplePage.jsx';

import ReelsPage from './pages/reels/ReelsPage.jsx';
import SingleReelPage from './pages/reels/SingleReelPage.jsx';
import UploadReelPage from './pages/reels/UploadReelPage.jsx';

import MessagesPage from './pages/messages/MessagesPage.jsx';
import ChatPage from './pages/messages/ChatPage.jsx';
import MessageRequestsPage from './pages/messages/MessageRequestsPage.jsx';

import NotificationsPage from './pages/notifications/NotificationsPage.jsx';

import ProfilePage from './pages/profile/ProfilePage.jsx';
import EditProfilePage from './pages/profile/EditProfilePage.jsx';
import FollowersPage from './pages/profile/FollowersPage.jsx';
import FollowingPage from './pages/profile/FollowingPage.jsx';
import ChangePasswordPage from './pages/profile/ChangePasswordPage.jsx';

import SinglePostPage from './pages/post/SinglePostPage.jsx';
import PostLikedByPage from './pages/post/PostLikedByPage.jsx';
import CommentsPage from './pages/post/CommentsPage.jsx';

import StoriesViewer from './pages/stories/StoriesViewer.jsx';
import StoriesArchivePage from './pages/stories/StoriesArchivePage.jsx';
import CreateHighlightPage from './pages/stories/CreateHighlightPage.jsx';

import SettingsPage from './pages/settings/SettingsPage.jsx';
import ProfileSettingsPage from './pages/settings/ProfileSettingsPage.jsx';
import PrivacySettingsPage from './pages/settings/PrivacySettingsPage.jsx';
import SecuritySettingsPage from './pages/settings/SecuritySettingsPage.jsx';
import NotificationSettingsPage from './pages/settings/NotificationSettingsPage.jsx';
import PaymentsPage from './pages/settings/PaymentsPage.jsx';
import HelpPage from './pages/settings/HelpPage.jsx';
import AboutPage from './pages/settings/AboutPage.jsx';
import LoginActivityPage from './pages/settings/LoginActivityPage.jsx';
import BlockedAccountsPage from './pages/settings/BlockedAccountsPage.jsx';
import CloseAccountPage from './pages/settings/CloseAccountPage.jsx';

import LivePage from './pages/live/LivePage.jsx';
import ShopPage from './pages/shop/ShopPage.jsx';
import FundraiserPage from './pages/FundraiserPage.jsx';
import IGTVPage from './pages/IGTVPage.jsx';

import NotFoundPage from './pages/error/NotFoundPage.jsx';
import SuspendedPage from './pages/error/SuspendedPage.jsx';
import ChallengePage from './pages/ChallengePage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-ig-blue border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/accounts/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <StoryProvider>
              <Toast />
              <Routes>
                {/* Auth Routes */}
                <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/accounts/login" element={<LoginPage />} />
                  <Route path="/accounts/signup" element={<SignupPage />} />
                  <Route path="/accounts/password/reset" element={<ForgotPasswordPage />} />
                  <Route path="/accounts/emailsignup" element={<EmailSignupPage />} />
                  <Route path="/accounts/otp" element={<OTPPage />} />
                </Route>

                {/* Main App Layout (with Sidebar + MobileNav) */}
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/explore/search" element={<SearchResultsPage />} />
                  <Route path="/explore/tags/:hashtag" element={<HashtagPage />} />
                  <Route path="/explore/locations/:id" element={<LocationPage />} />
                  <Route path="/explore/people" element={<PeoplePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/create" element={<CreatePostPage />} />
                  <Route path="/profile/edit" element={<EditProfilePage />} />
                  <Route path="/profile/edit/username" element={<EditProfilePage />} />
                  <Route path="/profile/edit/bio" element={<EditProfilePage />} />
                  <Route path="/accounts/password/change" element={<ChangePasswordPage />} />
                  <Route path="/p/:postId" element={<SinglePostPage />} />
                  <Route path="/p/:postId/liked_by" element={<PostLikedByPage />} />
                  <Route path="/p/:postId/comments" element={<CommentsPage />} />
                  <Route path="/stories/archive" element={<StoriesArchivePage />} />
                  <Route path="/stories/highlights/new" element={<CreateHighlightPage />} />
                  <Route path="/accounts/settings" element={<SettingsPage />} />
                  <Route path="/accounts/settings/profile" element={<ProfileSettingsPage />} />
                  <Route path="/accounts/settings/privacy" element={<PrivacySettingsPage />} />
                  <Route path="/accounts/settings/security" element={<SecuritySettingsPage />} />
                  <Route path="/accounts/settings/notifications" element={<NotificationSettingsPage />} />
                  <Route path="/accounts/settings/payments" element={<PaymentsPage />} />
                  <Route path="/accounts/settings/help" element={<HelpPage />} />
                  <Route path="/accounts/settings/about" element={<AboutPage />} />
                  <Route path="/accounts/settings/login-activity" element={<LoginActivityPage />} />
                  <Route path="/accounts/settings/blocked" element={<BlockedAccountsPage />} />
                  <Route path="/accounts/settings/close-account" element={<CloseAccountPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/fundraiser/:id" element={<FundraiserPage />} />
                  <Route path="/tv/:videoId" element={<IGTVPage />} />
                  <Route path="/accounts/suspended" element={<SuspendedPage />} />
                  <Route path="/challenge" element={<ChallengePage />} />
                  {/* Profile routes LAST to avoid catching other single-segment paths */}
                  <Route path="/:username" element={<ProfilePage />} />
                  <Route path="/:username/followers" element={<FollowersPage />} />
                  <Route path="/:username/following" element={<FollowingPage />} />
                  <Route path="/:username/tagged" element={<ProfilePage />} />
                </Route>

                {/* Messages Layout (no mobile header/bottom nav interference) */}
                <Route element={<ProtectedRoute><MessagesLayout /></ProtectedRoute>}>
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/messages/:conversationId" element={<ChatPage />} />
                  <Route path="/messages/requests" element={<MessageRequestsPage />} />
                </Route>

                {/* Full-screen routes (no sidebar padding) */}
                <Route path="/reels" element={<ProtectedRoute><ReelsPage /></ProtectedRoute>} />
                <Route path="/reels/:reelId" element={<ProtectedRoute><SingleReelPage /></ProtectedRoute>} />
                <Route path="/reels/upload" element={<ProtectedRoute><UploadReelPage /></ProtectedRoute>} />

                {/* Stories (full screen, outside layout) */}
                <Route path="/stories/:username/:storyId" element={<ProtectedRoute><StoriesViewer /></ProtectedRoute>} />
                <Route path="/live/:username" element={<ProtectedRoute><LivePage /></ProtectedRoute>} />

                {/* 404 */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </StoryProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
