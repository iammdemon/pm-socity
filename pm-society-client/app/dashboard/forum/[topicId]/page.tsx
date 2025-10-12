"use client";

import { IUser, useGetForumTopicByIdQuery, useToggleReactionOnTopicMutation, useToggleReactionOnReplyMutation, useAddReplyToTopicMutation } from "@/app/redux/services/forumApi";
import { Heart, MessageCircle, ArrowLeft, Share2, Bookmark, Send, MoreHorizontal, Flag } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
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
      // Fix: Pass an object with content property instead of just the string
      await createReply({
        topicId: topicId as string,
        content: {
          content: replyText,
        },
      }).unwrap();

      setReplyText("");
      toast.success("Reply added successfully!");
      
      // Reset textarea height
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
            <div className="flex space-x-3">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                <div className="space-y-2 mt-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="text-red-500 dark:text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Something went wrong</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Failed to load the topic. Please try again.</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => refetch()}
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Topic Post */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4"
        >
          <div className="flex space-x-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 ring-2 ring-gray-200 dark:ring-gray-700">
                {post?.author?.avatar ? (
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name || "Avatar"} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                    {post?.author?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {post?.author?.name || "Anonymous User"}
                    </h3>
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
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTopicMenu(!showTopicMenu);
                    }}
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  
                  <AnimatePresence>
                    {showTopicMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          <button 
                            onClick={handleBookmark}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Bookmark className="w-4 h-4 mr-2" />
                            {isBookmarked ? "Remove Bookmark" : "Bookmark"}
                          </button>
                          <button 
                            onClick={handleShare}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                            <Flag className="w-4 h-4 mr-2" />
                            Report
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Post Content */}
              <div className="mt-3">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
                  {post?.content}
                </p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-1">
                  {/* Like Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                      reacted 
                        ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500"
                    }`}
                    onClick={() => handleReact(post.topicId)}
                    disabled={isReactingToTopic}
                  >
                    <div className="relative">
                      <Heart className={`w-5 h-5 ${reacted ? "fill-current" : ""} ${isReactingToTopic ? "animate-pulse" : ""}`} />
                      {isReactingToTopic && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {post.reactionCount || 0}
                    </span>
                  </motion.button>

                  {/* Comment Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 transition-all duration-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {post.replyCount || 0}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reply Box */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4"
        >
          <form onSubmit={handleReplySubmit} className="flex space-x-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 ring-2 ring-gray-200 dark:ring-gray-700">
                {user?.avatar ? (
                  <Image
                    src={user.avatar} 
                    alt={user.name || "Avatar"} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
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
                placeholder="Write your reply..."
                className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows={1}
                style={{ minHeight: "40px" }}
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!replyText.trim() || isSubmittingReply}
                  className={`flex items-center space-x-1 px-4 py-1.5 rounded-full font-medium text-white text-sm transition-all duration-200 ${
                    !replyText.trim() || isSubmittingReply
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-700"
                  }`}
                >
                  {isSubmittingReply ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Reply</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Replies Header */}
        {post.replies && post.replies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4"
          >
            <h3 className="font-medium text-gray-900 dark:text-white">
              {post.replies.length} {post.replies.length === 1 ? "Reply" : "Replies"}
            </h3>
          </motion.div>
        )}

        {/* Replies */}
        <AnimatePresence>
          {post.replies && post.replies.length > 0 && (
            <div className="space-y-3">
              {post.replies.map((reply, index: number) => {
                const replyReacted = reply?.reactions?.some((u: string | IUser) => typeof u === 'string' ? u === userId : u._id === userId);
                const isReactingToThisReply = reactingToReply === reply._id;
                
                return (
                  <motion.div 
                    key={reply._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                  >
                    <div className="flex space-x-3">
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 ring-2 ring-gray-200 dark:ring-gray-700">
                          {reply?.author?.avatar ? (
                            <Image
                              src={reply.author.avatar} 
                              alt={reply.author.name || "Avatar"} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                              {reply?.author?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Reply Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {reply.author?.name || "Anonymous User"}
                            </h3>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              @{reply.author?.email?.split("@")[0] || "user"}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 text-sm">·</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              {formatRelativeTime(reply.createdAt)}
                            </span>
                          </div>
                          
                          <div className="relative">
                            <button 
                              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowReplyMenu(showReplyMenu === reply._id ? null : reply._id);
                              }}
                            >
                              <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </button>
                            
                            <AnimatePresence>
                              {showReplyMenu === reply._id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="py-1">
                                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                      <Bookmark className="w-4 h-4 mr-2" />
                                      Bookmark
                                    </button>
                                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                      <Flag className="w-4 h-4 mr-2" />
                                      Report
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Reply Content */}
                        <div className="mt-2">
                          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
                            {reply.content}
                          </p>
                        </div>

                        {/* Reply Actions */}
                        <div className="flex items-center space-x-1 mt-3">
                          {/* Like Button */}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-200 ${
                              replyReacted 
                                ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500"
                            }`}
                            onClick={() => handleReplyReact(reply._id)}
                            disabled={isReactingToThisReply}
                          >
                            <div className="relative">
                              <Heart className={`w-4 h-4 ${replyReacted ? "fill-current" : ""} ${isReactingToThisReply ? "animate-pulse" : ""}`} />
                              {isReactingToThisReply && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
                            </div>
                            <span className="text-xs font-medium">
                              {reply.reactionCount || 0}
                            </span>
                          </motion.button>

                          {/* Reply Button */}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-1 px-2 py-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 transition-all duration-200"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Reply</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Empty state for replies */}
        {(!post.replies || post.replies.length === 0) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center"
          >
            <MessageCircle className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No replies yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Be the first to reply to this topic!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ForumTopicPage;