import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { getPostById, users } from '../../data/dummyData.js';
import Avatar from '../../components/common/Avatar.jsx';

export default function CommentsPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = getPostById(postId);
  const [comment, setComment] = useState('');

  if (!post) return <div className="flex items-center justify-center h-64 text-gray-500">Post not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="font-semibold text-base text-gray-900 dark:text-gray-200">Comments</h1>
      </div>

      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <img src={post.images?.[0]} alt="" className="w-12 h-12 rounded object-cover" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {(post.comments ?? []).map(comment => {
          const commentUser = users.find(u => u.id === comment.userId);
          return (
            <div key={comment.id}>
              <div className="flex gap-3">
                <Avatar src={commentUser?.avatar} size={32} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-gray-200 mr-1">{commentUser?.username}</span>
                    <span className="text-gray-900 dark:text-gray-200">{comment.text}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-gray-500">{comment.likes} likes</span>
                    <button className="text-[11px] font-semibold text-gray-500">Reply</button>
                    <span className="text-[11px] text-gray-500">1h</span>
                  </div>
                  {comment.replies.map(reply => {
                    const replyUser = users.find(u => u.id === reply.userId);
                    return (
                      <div key={reply.id} className="flex gap-3 mt-3 ml-8">
                        <Avatar src={replyUser?.avatar} size={24} />
                        <div>
                          <p className="text-sm">
                            <span className="font-semibold text-gray-900 dark:text-gray-200 mr-1">{replyUser?.username}</span>
                            <span className="text-gray-900 dark:text-gray-200">{reply.text}</span>
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[11px] text-gray-500">{reply.likes} likes</span>
                            <button className="text-[11px] font-semibold text-gray-500">Reply</button>
                          </div>
                        </div>
                        <Heart size={12} className="text-gray-400 flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
                <Heart size={12} className="text-gray-400 flex-shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black sticky bottom-0">
        <input
          type="text" placeholder="Add a comment..."
          value={comment} onChange={(e) => setComment(e.target.value)}
          className="flex-1 text-sm outline-none bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-500"
        />
        <button className={`text-sm font-semibold ${comment.trim() ? 'text-ig-blue' : 'text-ig-blue/50'}`}>Post</button>
      </div>
    </div>
  );
}
