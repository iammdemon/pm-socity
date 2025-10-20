"use client";

import { IForumTopic, IUser } from "@/app/redux/services/forumApi";
import {
  useGetForumTopicsQuery,
  useToggleReactionOnTopicMutation,
} from "@/app/redux/services/forumApi";
import { Heart, MessageCircle, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostFeedProps {
  title?: string;
  subtitle?: string;
  dataFilter?: (posts: IForumTopic[]) => IForumTopic[];
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  showTrending?: boolean;
}

const PostFeed = ({
  title,
  subtitle,
  dataFilter,
  emptyMessage = "No posts yet",
  emptyIcon,
}: PostFeedProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    data: forumResponse,
    isLoading,
    error,
    refetch,
  } = useGetForumTopicsQuery();
  const [toggleReaction] = useToggleReactionOnTopicMutation();
  const [reactingPostId, setReactingPostId] = useState<string | null>(null);

  const allPosts = forumResponse?.data || [];
  const posts = dataFilter ? dataFilter(allPosts) : allPosts;

  const handleReact = async (topicId: string) => {
    if (!userId) {
      toast.error("You must be logged in to react");
      return;
    }

    setReactingPostId(topicId);
    try {
      await toggleReaction({ topicId, userId }).unwrap();
    } catch (err) {
      console.error("Failed to toggle reaction:", err);
      toast.error("Failed to react. Please try again.");
    } finally {
      setReactingPostId(null);
    }
  };

  const hasReacted = (post: (typeof posts)[number]) => {
    return (
      post.reactions?.some((u: string | IUser) =>
        typeof u === "string" ? u === userId : u._id === userId
      ) || false
    );
  };

  const formatRelativeTime = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
    } catch {
      return "some time ago";
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 animate-pulse"
          >
            <div className="flex space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/6"></div>
                <div className="space-y-2 mt-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
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
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Failed to load posts. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          {emptyIcon || <MessageCircle className="w-16 h-16 mx-auto" />}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to share something with the community!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {title && (
        <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {posts.map((post) => {
        const reacted = hasReacted(post);
        const isReactingThisPost = reactingPostId === post.topicId;

        return (
          <article
            key={post.topicId}
            className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <AvatarImage
                  src={post.author?.avatar || ""}
                  alt={post.author?.name || ""}
                />
                <AvatarFallback>
                  {post.author?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 flex-wrap">
                  <Link href={`/dashboard/profile/${post.author?.userName}`} className="space-x-0.5">
                    <span className="font-bold text-black dark:text-white text-sm sm:text-base">
                      {post.author?.name || "Anonymous User"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                       @{post.author?.userName}
                    </span>
                  </Link>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ·
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {formatRelativeTime(post.createdAt)}
                  </span>
                </div>
                <div className="mt-2 text-black dark:text-white text-sm sm:text-base break-words">
                  {post.content}
                </div>
                <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => handleReact(post.topicId)}
                    className={`flex items-center gap-1 sm:gap-2 transition-colors ${
                      reacted ? "text-red-500" : "hover:text-red-500"
                    }`}
                    disabled={isReactingThisPost}
                  >
                    <Heart
                      className={`w-4 h-4 ${reacted ? "fill-current" : ""} 
                      `}
                    />
                    <span className="text-xs sm:text-sm">
                      {post.reactionCount || 0}
                    </span>
                  </button>
                  <Link
                    href={`/dashboard/forum/${post.topicId}`}
                    className="flex items-center gap-1 sm:gap-2 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">
                      {post.replyCount || 0}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PostFeed;
