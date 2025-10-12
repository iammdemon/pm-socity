"use client";

import { IUser, useGetForumTopicByIdQuery, useToggleReactionOnTopicMutation, useToggleReactionOnReplyMutation, useAddReplyToTopicMutation } from "@/app/redux/services/forumApi";
import { Heart, MessageCircle, ArrowLeft, Share2, Bookmark, Send, MoreHorizontal, Flag, } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";

const ForumTopicPage = () => {
  const { topicId } = useParams();
  const router = useRouter();
  const [toggleReaction] = useToggleReactionOnTopicMutation();
  const [toggleReplyReaction] = useToggleReactionOnReplyMutation();
  const [createReply] = useAddReplyToTopicMutation();

  const {
    data: forumResponse,
    isLoading,
    error,
    refetch
  } = useGetForumTopicByIdQuery(topicId as string);
  const post = forumResponse?.data || null;

  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [reactingToReply, setReactingToReply] = useState<string | null>(null);
  const [isReactingToTopic, setIsReactingToTopic] = useState(false);
  const [showTopicMenu, setShowTopicMenu] = useState(false);
  const [showReplyMenu, setShowReplyMenu] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const session = useSession();
  const userId = session.data?.user?.id;
  const user = session.data?.user;

  const reacted = post?.reactions?.some((u: string | IUser) => typeof u === 'string' ? u === userId : u._id === userId) || false;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [replyText]);

  const formatRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "some time ago";
    }
  };

  const handleReact = async (topicId: string) => {
    if (!userId) {
      toast.error("You must be logged in to react");
      return;
    }

    setIsReactingToTopic(true);
    try {
      await toggleReaction({ topicId, userId }).unwrap();
    } catch (err) {
      console.error("Failed to toggle reaction:", err);
      toast.error("Failed to react. Please try again.");
    } finally {
      setIsReactingToTopic(false);
    }
  };

  const handleReplyReact = async (replyId: string) => {
    if (!userId) {
      toast.error("You must be logged in to react");
      return;
    }

    setReactingToReply(replyId);
    try {
      await toggleReplyReaction({ topicId: topicId as string, replyId, userId }).unwrap();
    } catch (err) {
      console.error("Failed to toggle reaction:", err);
      toast.error("Failed to react. Please try again.");
    } finally {
      setReactingToReply(null);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmittingReply(true);
    try {
      await createReply({
        topicId: topicId as string,
        content: {
          content: replyText,
        },
      }).unwrap();

      setReplyText("");
      toast.success("Reply added successfully!");
      
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      console.error("Failed to create reply:", err);
      toast.error("Failed to add reply. Please try again.");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.content?.substring(0, 50) + "...",
        text: post?.content,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/6"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
            <div className="text-red-500 dark:text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Failed to load the topic. Please try again.</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => refetch()}
                className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:scale-105"
              >
                Try Again
              </button>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl font-medium transition-all hover:scale-105"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                isBookmarked 
                  ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all hover:scale-110"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Topic Post */}
        <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex space-x-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800">
                  {post?.author?.avatar ? (
                    <Image 
                      src={post.author.avatar} 
                      alt={post.author.name || "Avatar"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium text-xl bg-gray-200 dark:bg-gray-800">
                      {post?.author?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xl">
                        {post?.author?.name || "Anonymous User"}
                      </h3>
                    
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        @{post?.author?.email?.split("@")[0] || "user"}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500 text-sm">·</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {formatRelativeTime(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button 
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTopicMenu(!showTopicMenu);
                      }}
                    >
                      <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                    
                    {showTopicMenu && (
                      <div
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-10 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-2">
                          <button 
                            onClick={handleBookmark}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 w-full text-left transition-colors"
                          >
                            <Bookmark className="w-4 h-4 mr-3" />
                            {isBookmarked ? "Remove Bookmark" : "Bookmark"}
                          </button>
                          <button 
                            onClick={handleShare}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 w-full text-left transition-colors"
                          >
                            <Share2 className="w-4 h-4 mr-3" />
                            Share
                          </button>
                          <button className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 w-full text-left transition-colors">
                            <Flag className="w-4 h-4 mr-3" />
                            Report
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-6">
                  <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words leading-relaxed text-lg">
                    {post?.content}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-900">
                  <div className="flex items-center space-x-6">
                    {/* Like Button */}
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${
                        reacted 
                          ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-red-500"
                      }`}
                      onClick={() => handleReact(post.topicId)}
                      disabled={isReactingToTopic}
                    >
                      <Heart className={`w-5 h-5 ${reacted ? "fill-current" : ""}`} />
                      <span className="text-sm font-medium">
                        {post.reactionCount || 0}
                      </span>
                    </button>

                    {/* Comment Button */}
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-blue-500 transition-all duration-200 hover:scale-105">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {post.replyCount || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Box */}
        <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
          <form onSubmit={handleReplySubmit} className="p-6">
            <div className="flex space-x-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar} 
                      alt={user.name || "Avatar"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium text-xl bg-gray-200 dark:bg-gray-800">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full resize-none border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  rows={3}
                  style={{ minHeight: "80px" }}
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSubmittingReply}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-medium text-white text-sm transition-all duration-200 ${
                      !replyText.trim() || isSubmittingReply
                        ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-700 hover:scale-105"
                    }`}
                  >
                    {isSubmittingReply ? (
                      <>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Reply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Replies Header */}
        {post.replies && post.replies.length > 0 && (
          <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {post.replies.length} {post.replies.length === 1 ? "Reply" : "Replies"}
            </h3>
          </div>
        )}

        {/* Replies */}
        {post.replies && post.replies.length > 0 && (
          <div className="space-y-4">
            {post.replies.map((reply) => {
              const replyReacted = reply?.reactions?.some((u: string | IUser) => typeof u === 'string' ? u === userId : u._id === userId);
              const isReactingToThisReply = reactingToReply === reply._id;
              
              return (
                <div 
                  key={reply._id}
                  className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex space-x-4">
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800">
                          {reply?.author?.avatar ? (
                            <Image
                              src={reply.author.avatar} 
                              alt={reply.author.name || "Avatar"} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium text-xl bg-gray-200 dark:bg-gray-800">
                              {reply?.author?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Reply Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {reply.author?.name || "Anonymous User"}
                            </h3>
                           
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              @{reply.author?.email?.split("@")[0] || "user"}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 text-sm">·</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              {formatRelativeTime(reply.createdAt)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <button 
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all hover:scale-110"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowReplyMenu(showReplyMenu === reply._id ? null : reply._id);
                            }}
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </button>
                          
                          {showReplyMenu === reply._id && (
                            <div
                              className="absolute right-0 mt-2 w-56 bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-10 overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-2">
                                <button className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 w-full text-left transition-colors">
                                  <Bookmark className="w-4 h-4 mr-3" />
                                  Bookmark
                                </button>
                                <button className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 w-full text-left transition-colors">
                                  <Flag className="w-4 h-4 mr-3" />
                                  Report
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reply Content */}
                      <div className="mb-4">
                        <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words leading-relaxed">
                          {reply.content}
                        </p>
                      </div>

                      {/* Reply Actions */}
                      <div className="flex items-center space-x-6">
                        {/* Like Button */}
                        <button
                          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 ${
                            replyReacted 
                              ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-red-500"
                          }`}
                          onClick={() => handleReplyReact(reply._id)}
                          disabled={isReactingToThisReply}
                        >
                          <Heart className={`w-4 h-4 ${replyReacted ? "fill-current" : ""}`} />
                          <span className="text-xs font-medium">
                            {reply.reactionCount || 0}
                          </span>
                        </button>

                        {/* Reply Button */}
                        <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-blue-500 transition-all duration-200 hover:scale-105">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state for replies */}
        {(!post.replies || post.replies.length === 0) && (
          <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No replies yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Be the first to share your thoughts on this topic!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumTopicPage;