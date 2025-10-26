"use client";

import {
  IUser,
  useGetForumTopicByIdQuery,
  useToggleReactionOnTopicMutation,
  useToggleReactionOnReplyMutation,
  useAddReplyToTopicMutation,
} from "@/app/redux/services/forumApi";
import { Heart, MessageCircle, ArrowLeft,} from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";
import { useGetMeQuery } from "@/app/redux/services/authApi";

const ForumTopicPage = () => {
  const { topicId } = useParams();
  const router = useRouter();
  const [toggleReaction] = useToggleReactionOnTopicMutation();
  const [toggleReplyReaction] = useToggleReactionOnReplyMutation();
  const [createReply] = useAddReplyToTopicMutation();
  const { data: userData } = useGetMeQuery({});
  console.log("userData", userData);

  const {
    data: forumResponse,
    isLoading,
    error,
    refetch,
  } = useGetForumTopicByIdQuery(topicId as string);
  const post = forumResponse?.data || null;

  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [reactingToReply, setReactingToReply] = useState<string | null>(null);
  const [isReactingToTopic, setIsReactingToTopic] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const userId = userData?.data._id;
  const user = userData?.data;

  const reacted =
    post?.reactions?.some((u: string | IUser) =>
      typeof u === "string" ? u === userId : u._id === userId
    ) || false;

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
      await toggleReplyReaction({
        topicId: topicId as string,
        replyId,
        userId,
      }).unwrap();
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

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-2xl mx-auto border-x border-gray-200 dark:border-gray-800">
          <div className="sticky top-0 bg-white dark:bg-black bg-opacity-90 backdrop-blur-md z-10 p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              <div className="ml-3 h-5 bg-gray-200 dark:bg-gray-800 rounded w-20 animate-pulse"></div>
            </div>
          </div>

          <div className="p-4 border-b border-gray-200 dark:border-gray-800 animate-pulse">
            <div className="flex space-x-3">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/6"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-20"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-20"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 border-b border-gray-200 dark:border-gray-800 animate-pulse"
              >
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="flex justify-between mt-3">
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-16"></div>
                    </div>
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
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Failed to load the topic. Please try again.
            </p>
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
      <div className="max-w-4xl mx-auto border-x border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-black bg-opacity-90 backdrop-blur-md z-10 p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Post</h1>
          </div>
        </div>

        {/* Topic Post */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="p-4">
            <div className="flex space-x-3">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {post?.author?.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name || "Avatar"}
                      className="w-full h-full object-cover"
                      height={48}
                      width={48}
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
                <div className="flex items-center space-x-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {post?.author?.name || "Anonymous User"}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    @{post?.author?.userName}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ·
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {formatRelativeTime(post.createdAt)}
                  </span>
                </div>

                {/* Post Content */}
                <div className="mt-2">
                  <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                    {post?.content}
                  </p>
                </div>
                 {/* Display image if available */}
                {post.imageUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden max-w-md">
                    <Image
                      src={post.imageUrl} 
                      alt="Post image" 
                      className="w-full h-auto object-cover"
                      width={1080}
                      height={1080}
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex  mt-4 max-w-md">
                  {/* Comment Button */}

                  {/* Like Button */}
                  <button
                    className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-200 ${
                      reacted
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500"
                    }`}
                    onClick={() => handleReact(post.topicId)}
                    disabled={isReactingToTopic}
                  >
                    <Heart
                      className={`w-5 h-5 ${reacted ? "fill-current" : ""}`}
                    />
                    <span className="text-sm">{post.reactionCount || 0}</span>
                  </button>
                  <button className="flex items-center space-x-2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-all duration-200">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.replyCount || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Box */}
        <div className="border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex space-x-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name || "Avatar"}
                    className="w-full h-full object-cover"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium text-xl bg-gray-200 dark:bg-gray-800">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <form onSubmit={handleReplySubmit}>
                <textarea
                  ref={textareaRef}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Post your reply"
                  className="w-full resize-none border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
                  rows={2}
                  style={{ minHeight: "60px" }}
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSubmittingReply}
                    className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-200 ${
                      !replyText.trim() || isSubmittingReply
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                    }`}
                  >
                    Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Replies */}
        {post.replies && post.replies.length > 0 && (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {post.replies.map((reply) => {
              const replyReacted = reply?.reactions?.some((u: string | IUser) =>
                typeof u === "string" ? u === userId : u._id === userId
              );
              const isReactingToThisReply = reactingToReply === reply._id;

              return (
                <div key={reply._id} className="p-4">
                  <div className="flex space-x-3">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        {reply?.author?.avatar ? (
                          <Image
                            src={reply.author.avatar}
                            alt={reply.author.name || "Avatar"}
                            className="w-full h-full object-cover"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium text-lg bg-gray-200 dark:bg-gray-800">
                            {reply?.author?.name?.charAt(0).toUpperCase() ||
                              "U"}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Reply Header */}
                      <div className="flex items-center space-x-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                          {reply.author?.name}
                        </h3>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          @{reply.author?.userName}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          ·
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {formatRelativeTime(reply.createdAt)}
                        </span>
                      </div>

                      {/* Reply Content */}
                      <div className="mt-1">
                        <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                          {reply.content}
                        </p>
                      </div>

                      {/* Reply Actions */}
                      <div className="flex justify-between mt-3 max-w-md">
                        {/* Like Button */}
                        <button
                          className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-200 ${
                            replyReacted
                              ? "text-red-500"
                              : "text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500"
                          }`}
                          onClick={() => handleReplyReact(reply._id)}
                          disabled={isReactingToThisReply}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              replyReacted ? "fill-current" : ""
                            }`}
                          />
                          {reply.reactionCount! > 0 && (
                            <span className="text-sm">
                              {reply.reactionCount}
                            </span>
                          )}
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
          <div className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              No replies yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Be the first to share your thoughts on this post!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumTopicPage;
