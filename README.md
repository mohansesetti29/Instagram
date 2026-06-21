# Instagram Clone — Frontend

Full Instagram UI clone built with **React 18 + Vite + Tailwind CSS**. Currently runs with mock data — swap in a real backend via the documented API layer.

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build → dist/
```

## Architecture

```
pages/                 # Route-level components (call API functions)
  └─ useAuth()         # AuthContext — provides user, login, logout
components/            # Reusable UI (call API functions directly)
api/                   # <── BACKEND DEVELOPER: FOCUS HERE
  ├─ client.js         # Axios instance, interceptors, base URL
  ├─ auth.js           # Auth endpoints
  ├─ posts.js          # Posts + comments endpoints
  ├─ users.js          # User profile + follow endpoints
  ├─ stories.js        # Stories endpoints
  ├─ messages.js       # DMs + conversations endpoints
  ├─ reels.js          # Reels endpoints
  ├─ notifications.js  # Notifications endpoints
  ├─ hashtags.js       # Search + hashtag endpoints
  └─ index.js          # Re-exports everything
data/                  # Mock data (swap with real API responses)
  ├─ dummyData.js      # Re-exports all data modules
  ├─ dummyUsers.js     # 20 users
  ├─ dummyPosts.js     # 36 posts with comments
  ├─ dummyStories.js   # 12 users with story items
  ├─ dummyMessages.js  # 10 conversations
  ├─ dummyReels.js     # 20 reels
  ├─ dummyNotifications.js # 40 notifications
  └─ dummyHashtags.js  # 12 hashtags
```

## Connecting a Backend

### 1. Set the API base URL

```bash
# .env (in project root)
VITE_API_URL=http://your-backend.com/api
```

Default: `http://localhost:3000/api`

### 2. Auth flow the frontend expects

| Step | What happens |
|------|-------------|
| Login | `POST /api/auth/login` → returns `{ user, token }` |
| Token storage | Token saved to `localStorage.ig_token` |
| Subsequent requests | Axios interceptor attaches `Authorization: Bearer <token>` header automatically |
| 401 response | Axios interceptor clears token + user from localStorage and redirects to `/accounts/login` |
| Logout | Clears localStorage, calls `POST /api/auth/logout` |

### 3. Replace mock API functions

Each function in `src/api/*.js` currently returns dummy data. To connect a real backend, replace the function body with an Axios call. The **function signatures, argument shapes, and return shapes** documented below are what every page/component expects.

> **Tip:** The api/*.js files are the ONLY files you need to modify. Pages and components import from `../../api/xxx.js` — they never know whether data is real or mock.

---

## Complete API Contract

### Auth

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `login(username, password)` | POST | `/api/auth/login` | `{ username, password }` | `{ user: User, token: string }` |
| `signup(data)` | POST | `/api/auth/signup` | `{ email, fullName, username, password }` | `{ user: User, token: string }` |
| `logout()` | POST | `/api/auth/logout` | — | `{ success: true }` |
| `forgotPassword(email)` | POST | `/api/auth/forgot-password` | `{ email }` | `{ success: true }` |
| `verifyOTP(data)` | POST | `/api/auth/verify-otp` | `{ otp, email }` | `{ success: true }` |
| `resetPassword(data)` | POST | `/api/auth/reset-password` | `{ token, password }` | `{ success: true }` |
| `getCurrentUser()` | GET | `/api/auth/me` | — | `User` |

### Users

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `getUserByUsername(username)` | GET | `/api/users/:username` | — | `{ user: User }` |
| `getUserById(id)` | GET | `/api/users/id/:id` | — | `{ user: User }` |
| `updateProfile(data)` | PUT | `/api/users/profile` | `User` fields | `{ user: User }` |
| `changePassword(data)` | PUT | `/api/users/password` | `{ currentPassword, newPassword }` | `{ success: true }` |
| `getFollowers(username, page?)` | GET | `/api/users/:username/followers?page=1` | — | `{ users: User[], total: number }` |
| `getFollowing(username, page?)` | GET | `/api/users/:username/following?page=1` | — | `{ users: User[], total: number }` |
| `followUser(userId)` | POST | `/api/users/:userId/follow` | — | `{ success: true }` |
| `unfollowUser(userId)` | POST | `/api/users/:userId/unfollow` | — | `{ success: true }` |
| `searchUsers(query)` | GET | `/api/users/search?q=:query` | — | `{ users: User[] }` |
| `getSuggestedUsers()` | GET | `/api/users/suggested` | — | `{ users: User[] }` |
| `getUserPosts(username, page?)` | GET | `/api/users/:username/posts?page=1` | — | `{ posts: Post[], total: number }` |
| `getUserSavedPosts(page?)` | GET | `/api/users/saved?page=1` | — | `{ posts: Post[] }` |
| `getUserTaggedPosts(username, page?)` | GET | `/api/users/:username/tagged?page=1` | — | `{ posts: Post[] }` |

### Posts

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `getFeed(page?)` | GET | `/api/posts/feed?page=1` | — | `{ posts: Post[] }` |
| `getExplorePosts(page?)` | GET | `/api/posts/explore?page=1` | — | `{ posts: Post[] }` |
| `getPost(postId)` | GET | `/api/posts/:postId` | — | `{ post: Post }` |
| `createPost(formData)` | POST | `/api/posts` | `multipart/form-data` (files + caption) | `{ post: Post }` |
| `deletePost(postId)` | DELETE | `/api/posts/:postId` | — | `{ success: true }` |
| `likePost(postId)` | POST | `/api/posts/:postId/like` | — | `{ success: true }` |
| `unlikePost(postId)` | POST | `/api/posts/:postId/unlike` | — | `{ success: true }` |
| `getLikedBy(postId)` | GET | `/api/posts/:postId/liked_by` | — | `{ users: User[] }` |
| `savePost(postId)` | POST | `/api/posts/:postId/save` | — | `{ success: true }` |
| `unsavePost(postId)` | POST | `/api/posts/:postId/unsave` | — | `{ success: true }` |
| `getComments(postId, page?)` | GET | `/api/posts/:postId/comments?page=1` | — | `{ comments: Comment[] }` |
| `addComment(postId, text)` | POST | `/api/posts/:postId/comments` | `{ text }` | `{ comment: Comment }` |
| `deleteComment(postId, commentId)` | DELETE | `/api/posts/:postId/comments/:commentId` | — | `{ success: true }` |
| `likeComment(postId, commentId)` | POST | `/api/posts/:postId/comments/:commentId/like` | — | `{ success: true }` |

### Stories

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `getStories()` | GET | `/api/stories` | — | `{ stories: Story[] }` |
| `getStoryById(storyId)` | GET | `/api/stories/:storyId` | — | `{ story: StoryItem }` |
| `getStoriesByUserId(userId)` | GET | `/api/stories/user/:userId` | — | `{ stories: Story[] }` |
| `createStory(formData)` | POST | `/api/stories` | `multipart/form-data` | `{ story: StoryItem }` |
| `deleteStory(storyId)` | DELETE | `/api/stories/:storyId` | — | `{ success: true }` |
| `viewStory(storyId)` | POST | `/api/stories/:storyId/view` | — | `{ success: true }` |
| `replyToStory(storyId, text)` | POST | `/api/stories/:storyId/reply` | `{ text }` | `{ success: true }` |
| `getHighlights(userId)` | GET | `/api/stories/highlights/:userId` | — | `{ highlights: Highlight[] }` |
| `createHighlight(data)` | POST | `/api/stories/highlights` | `{ name, cover, storyIds }` | `{ highlight: Highlight }` |
| `deleteHighlight(highlightId)` | DELETE | `/api/stories/highlights/:highlightId` | — | `{ success: true }` |
| `getArchive()` | GET | `/api/stories/archive` | — | `{ stories: Story[] }` |

### Messages

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `getConversations()` | GET | `/api/conversations` | — | `{ conversations: Conversation[] }` |
| `getConversation(convId)` | GET | `/api/conversations/:convId` | — | `{ conversation: Conversation }` |
| `startConversation(userId)` | POST | `/api/conversations` | `{ userId }` | `{ conversation: Conversation }` |
| `sendMessage(convId, text)` | POST | `/api/conversations/:convId/messages` | `{ text }` | `{ message: Message }` |
| `getMessageRequests()` | GET | `/api/conversations/requests` | — | `{ requests: Conversation[] }` |
| `acceptMessageRequest(requestId)` | POST | `/api/conversations/requests/:requestId/accept` | — | `{ success: true }` |
| `declineMessageRequest(requestId)` | POST | `/api/conversations/requests/:requestId/decline` | — | `{ success: true }` |
| `deleteConversation(convId)` | DELETE | `/api/conversations/:convId` | — | `{ success: true }` |

### Reels

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `getReels()` | GET | `/api/reels` | — | `{ reels: Reel[] }` |
| `getReelById(reelId)` | GET | `/api/reels/:reelId` | — | `{ reel: Reel }` |
| `createReel(formData)` | POST | `/api/reels` | `multipart/form-data` | `{ reel: Reel }` |
| `deleteReel(reelId)` | DELETE | `/api/reels/:reelId` | — | `{ success: true }` |
| `likeReel(reelId)` | POST | `/api/reels/:reelId/like` | — | `{ success: true }` |
| `unlikeReel(reelId)` | POST | `/api/reels/:reelId/unlike` | — | `{ success: true }` |
| `commentOnReel(reelId, text)` | POST | `/api/reels/:reelId/comments` | `{ text }` | `{ comment: Comment }` |
| `getReelComments(reelId)` | GET | `/api/reels/:reelId/comments` | — | `{ comments: Comment[] }` |

### Notifications

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `getNotifications()` | GET | `/api/notifications` | — | `{ notifications: Notification[] }` |
| `markNotificationRead(id)` | POST | `/api/notifications/:id/read` | — | `{ success: true }` |
| `markAllNotificationsRead()` | POST | `/api/notifications/read-all` | — | `{ success: true }` |
| `getUnreadCount()` | GET | `/api/notifications/unread-count` | — | `{ count: number }` |

### Hashtags & Search

| Function | Method | Endpoint | Request | Response |
|----------|--------|----------|---------|----------|
| `search(query)` | GET | `/api/search?q=:query` | — | `{ hashtags: Hashtag[], users: User[], posts: Post[] }` |
| `getHashtag(tag)` | GET | `/api/hashtags/:tag` | — | `{ hashtag: Hashtag, posts: Post[] }` |
| `getTrendingHashtags()` | GET | `/api/hashtags/trending` | — | `{ hashtags: Hashtag[] }` |
| `followHashtag(tag)` | POST | `/api/hashtags/:tag/follow` | — | `{ success: true }` |
| `unfollowHashtag(tag)` | POST | `/api/hashtags/:tag/unfollow` | — | `{ success: true }` |
| `getLocationPosts(locationId)` | GET | `/api/locations/:id/posts` | — | `{ posts: Post[] }` |

---

## Data Models

### User

```json
{
  "id": "1",
  "username": "alex_morgan",
  "fullName": "Alex Morgan",
  "avatar": "https://i.pravatar.cc/150?img=1",
  "bio": "Photographer & traveler ✈️",
  "website": "https://alexmorgan.com",
  "followers": 12450,
  "following": 342,
  "posts": 128,
  "isVerified": true,
  "isFollowing": false,
  "isPrivate": false,
  "hasStory": true,
  "storyViewed": false,
  "pronouns": "he/him"
}
```

### Post

```json
{
  "id": "post_1",
  "userId": "1",
  "images": ["https://picsum.photos/600/600?random=0"],
  "caption": "Golden hour magic ✨ #sunset #goldenhour",
  "likes": 5432,
  "comments": [
    {
      "id": "c1_0",
      "userId": "5",
      "text": "This is amazing! 🔥",
      "likes": 12,
      "timestamp": 1719000000000,
      "replies": [
        {
          "id": "r1_0",
          "userId": "1",
          "text": "Thanks! 🙌",
          "likes": 3,
          "timestamp": 1718900000000
        }
      ]
    }
  ],
  "timestamp": 1719000000000,
  "location": "Tokyo, Japan",
  "isLiked": false,
  "isSaved": false,
  "isSponsored": false,
  "aspectRatio": "1/1"
}
```

### Story

```json
{
  "userId": "1",
  "items": [
    {
      "id": "story_1_0",
      "type": "image",
      "url": "https://picsum.photos/600/900?random=1",
      "duration": 5000,
      "timestamp": 1719000000000,
      "seen": false
    }
  ]
}

// Single story item (from getStoryById):
{
  "id": "story_1_0",
  "type": "image",
  "url": "https://picsum.photos/600/900?random=1",
  "duration": 5000,
  "timestamp": 1719000000000,
  "seen": false,
  "userId": "1"
}
```

### Conversation

```json
{
  "id": "conv_1",
  "userId": "1",
  "messages": [
    {
      "id": "msg_0_0",
      "senderId": "1",
      "text": "Hey! How are you?",
      "timestamp": 1719000000000,
      "seen": true,
      "type": "text"
    }
  ],
  "lastMessage": "Hey! How are you?",
  "lastTime": 1719000000000,
  "unread": false,
  "isOnline": true
}
```

### Reel

```json
{
  "id": "reel_1",
  "userId": "1",
  "thumbnail": "https://picsum.photos/400/700?random=100",
  "caption": "Check this out! 🔥",
  "likes": 15000,
  "comments": 345,
  "views": 100000,
  "shares": 1200,
  "audio": "Original Audio",
  "duration": 25,
  "isLiked": false,
  "isSaved": false
}
```

### Notification

```json
{
  "id": "notif_1",
  "type": "like",
  "userId": "3",
  "postId": "post_0",
  "text": "",
  "timestamp": 1719000000000,
  "read": true,
  "postThumbnail": "https://picsum.photos/600/600?random=0"
}
```

Types: `like`, `comment`, `follow`, `mention`, `tag`, `live`, `story_like`

### Hashtag

```json
{
  "tag": "travel",
  "postCount": 845000000,
  "relatedTags": ["travelgram", "wanderlust", "vacation", "adventure"],
  "topPosts": []
}
```

---

## Media Upload

The `useMediaUpload` hook in `src/hooks/useMediaUpload.js` sends files to `POST /api/upload` as `multipart/form-data`. Expects response `{ urls: string[] }`.

---

## Route Map

| Path | Page | Auth |
|------|------|------|
| `/` | LoginPage | Public |
| `/accounts/login` | LoginPage | Public |
| `/accounts/signup` | SignupPage | Public |
| `/home` | HomePage | Protected |
| `/explore` | ExplorePage | Protected |
| `/explore/search?q=` | SearchResultsPage | Protected |
| `/explore/tags/:hashtag` | HashtagPage | Protected |
| `/explore/locations/:id` | LocationPage | Protected |
| `/explore/people` | PeoplePage | Protected |
| `/reels` | ReelsPage | Protected |
| `/reels/:reelId` | SingleReelPage | Protected |
| `/reels/upload` | UploadReelPage | Protected |
| `/messages` | MessagesPage | Protected |
| `/messages/:convId` | ChatPage | Protected |
| `/messages/requests` | MessageRequestsPage | Protected |
| `/notifications` | NotificationsPage | Protected |
| `/create` | CreatePostPage | Protected |
| `/p/:postId` | SinglePostPage | Protected |
| `/p/:postId/liked_by` | PostLikedByPage | Protected |
| `/p/:postId/comments` | CommentsPage | Protected |
| `/stories/:username/:storyId` | StoriesViewer | Protected |
| `/stories/archive` | StoriesArchivePage | Protected |
| `/stories/highlights/new` | CreateHighlightPage | Protected |
| `/:username` | ProfilePage | Protected |
| `/:username/followers` | FollowersPage | Protected |
| `/:username/following` | FollowingPage | Protected |
| `/profile/edit` | EditProfilePage | Protected |
| `/accounts/settings/*` | Settings pages | Protected |
| `/live/:username` | LivePage | Protected |
| `/shop` | ShopPage | Protected |
| `/404` | NotFoundPage | Public |

---

## Implementation Notes for Backend

1. **Pagination**: Feed, followers, following, comments, and user posts accept `page` query param. Return enough data for infinite scroll (12-20 items per page).

2. **Timestamps**: Use Unix milliseconds (`Date.now()`). The `formatTime` utility in the frontend converts these to relative strings ("2m ago", "1h ago", "3d ago").

3. **Image URLs**: The frontend uses `https://picsum.photos` and `https://i.pravatar.cc` for placeholders. Your backend should return real image URLs.

4. **Current user ID**: The frontend assumes the logged-in user has `id: '20'` (from mock data). Your backend should return the real authenticated user's ID.

5. **Error handling**: All API calls in the frontend have `.catch()` handlers. Return meaningful error messages — they're not displayed directly but help with debugging.

6. **Search**: The global search endpoint (`/api/search?q=`) should return users, hashtags, and posts matching the query. The frontend splits results by tab.
