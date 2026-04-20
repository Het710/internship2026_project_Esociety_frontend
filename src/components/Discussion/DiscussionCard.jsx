import React, { useState } from 'react';
import axios from '../utils/axiosInstance';

const DiscussionCard = ({ discussion, onRefresh }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  const totalVotes = discussion.pollOptions?.reduce((acc, opt) => acc + opt.votes.length, 0) || 0;

  const handleVote = async (optionId) => {
    try {
      await axios.post('/discussions/vote', { discussionId: discussion._id, optionId });
      onRefresh();
    } catch (err) { console.error("Vote failed"); }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await axios.post(`/discussions/comment/${discussion._id}`, { text: newComment });
      setNewComment("");
      onRefresh();
    } catch (err) { console.error("Comment failed"); }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
            {discussion.author?.firstName?.[0]}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 leading-none">{discussion.author?.firstName} {discussion.author?.lastName}</h4>
            <span className="text-[10px] text-gray-400 uppercase font-medium">{new Date(discussion.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{discussion.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{discussion.content}</p>

        {discussion.type === 'poll' && (
          <div className="space-y-3 mb-6 bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
            {discussion.pollOptions.map((option) => {
              const percentage = totalVotes === 0 ? 0 : Math.round((option.votes.length / totalVotes) * 100);
              return (
                <button 
                  key={option._id} 
                  type="button"
                  onClick={() => handleVote(option._id)}
                  className="w-full group focus:outline-none"
                >
                  <div className="flex justify-between text-xs mb-1.5 font-bold text-indigo-900 px-1">
                    <span>{option.text}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-indigo-100">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-1000 ease-out rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </button>
              );
            })}
            <p className="text-[9px] text-indigo-400 font-bold uppercase text-center mt-2">{totalVotes} residents voted</p>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
          <button 
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {discussion.comments?.length || 0} Comments
          </button>
        </div>
      </div>

      {showComments && (
        <div className="bg-gray-50/80 p-6 border-t border-gray-100">
          <form onSubmit={submitComment} className="flex gap-2 mb-6">
            <input 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a response..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 text-sm outline-none bg-white"
            />
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold">Send</button>
          </form>

          <div className="space-y-4">
            {discussion.comments?.map((comment, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shrink-0 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                  {comment.user?.firstName?.[0]}
                </div>
                <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex-1">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase mb-1">{comment.user?.firstName} {comment.user?.lastName}</p>
                  <p className="text-xs text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;