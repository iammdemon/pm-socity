// Feed.tsx
"use client";

import { IUser } from "@/app/redux/services/forumApi";
import {
  useGetForumTopicsQuery,
  useToggleReactionOnTopicMutation,
} from "@/app/redux/services/forumApi";
import { 
  Heart, 
  MessageCircle, 
  MoreHorizontal, 
  RefreshCw,
  Share2,
  Bookmark,

} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Feed = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: forumResponse, isLoading, error, refetch } = useGetForumTopicsQuery();
  const [toggleReaction] = useToggleReactionOnTopicMutation();
  const [reactingPostId, setReactingPostId] = useState<string | null>(null);
  const posts = forumResponse?.data || [];

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

  const hasReacted = (post: typeof posts[number]) => {
    return (
      post.reactions?.some((u: string | IUser) => (typeof u === 'string' ? u === userId : u._id === userId)) || false
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
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 animate-pulse">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                <div className="space-y-2 mt-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <div className="text-red-500 dark:text-red-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Something went wrong</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Failed to load posts. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <MessageCircle className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
        <p className="text-gray-600 dark:text-gray-400">Be the first to share something with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const reacted = hasReacted(post);
        const isReactingThisPost = reactingPostId === post.topicId;
        
        return (
          <article key={post.topicId} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author?.avatar || ""} alt={post.author?.name || ""} />
                    <AvatarFallback>
                      {post.author?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {post.author?.name || "Anonymous User"}
                      </h3>
                      {/* {post.author?.verified && (
                        <Verified className="w-4 h-4 text-blue-500" />
                      )} */}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{post.author?.email?.split("@")[0] || "user"}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-3">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              {/* Post Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{formatRelativeTime(post.createdAt)}</span>
                <div className="flex items-center space-x-4">
                  <span>{post.reactionCount || 0} likes</span>
                  <span>{post.replyCount || 0} comments</span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleReact(post.topicId)}
                    className={`flex items-center space-x-2 transition-colors ${
                      reacted 
                        ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500"
                    }`}
                    disabled={isReactingThisPost}
                  >
                    <Heart className={`w-5 h-5 ${reacted ? "fill-current" : ""} ${isReactingThisPost ? "animate-pulse" : ""}`} />
                    <span className="text-sm">{post.reactionCount || 0}</span>
                  </button>
                  <Link href={`/dashboard/forum/${post.topicId}`}>
                    <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.replyCount || 0}</span>
                    </button>
                  </Link>
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <button className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Feed;