"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Heart, MessageCircle } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

import { useSearchQuery } from "@/app/redux/services/authApi";
import { IForumTopic, IUser } from "@/app/redux/services/forumApi";
import { IResource } from "@/app/redux/services/resourceApi";
import { IEvent } from "@/app/redux/services/eventApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { useToggleReactionOnTopicMutation } from "@/app/redux/services/forumApi";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [query, setQuery] = useState(q);
  const [activeTab, setActiveTab] = useState("all");
  const [reactingPostId, setReactingPostId] = useState<string | null>(null);

  const { data, isLoading, error } = useSearchQuery(query, {
    skip: !query.trim(),
  });

  const [toggleReaction] = useToggleReactionOnTopicMutation();

  // Fix: Extract the actual search results from the nested data structure
  const searchResults = data?.data || {
    users: [],
    posts: [],
    resources: [],
    events: [],
  };
  const { users, posts, resources, events } = searchResults;

  useEffect(() => {
    if (q && q !== query) {
      setQuery(q);
    }
  }, [q, query]);

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

  const hasReacted = (post: IForumTopic) => {
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

  const UserCard = ({ user }: { user: IUser }) => (
    <Card className="border-0 shadow-none hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <p className="font-semibold text-foreground truncate">
                {user.name}
              </p>
              <p className="text-muted-foreground">@{user.userName}</p>
            </div>
            {user.bio && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {user.bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PostCard = ({ post }: { post: IForumTopic }) => {
    const reacted = hasReacted(post);
    console.log(post);
    const isReactingThisPost = reactingPostId === post.topicId;

    return (
      <article className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
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
                {post.createdAt && formatRelativeTime(post.createdAt)}
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
                  className={`w-4 h-4 ${reacted ? "fill-current" : ""}`}
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
  };

  const ResourceCard = ({ resource }: { resource: IResource }) => (
    <Card className="border-0 shadow-none hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground">{resource.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {resource.description}
        </p>
        <a
          href={resource.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline mt-2 block truncate"
        >
          {resource.fileUrl}
        </a>
        <div className="flex flex-wrap gap-1 mt-2">
          {resource.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const EventCard = ({ event }: { event: IEvent }) => (
    <Card className="border-0 shadow-none hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">📅</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{event.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {event.description}
            </p>
            <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center">
                📅 {new Date(event.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">📍 {event.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderResults = () => {
    if (!data) return null;

    const hasResults =
      users?.length > 0 ||
      posts?.length > 0 ||
      resources?.length > 0 ||
      events?.length > 0;

    if (!hasResults) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      );
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-transparent border-b">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="posts"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {users.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg px-4 py-2">Users</h3>
              <div className="space-y-0">
                {users.map((user: IUser) => (
                  <UserCard key={user._id?.toString()} user={user} />
                ))}
              </div>
              {users.length > 0 && <Separator />}
            </div>
          )}
          {posts.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg px-4 py-2">Posts</h3>
              <div className="space-y-0">
                {posts.map((post: IForumTopic) => (
                  <PostCard key={post._id?.toString()} post={post} />
                ))}
              </div>
              {posts.length > 0 && <Separator />}
            </div>
          )}
          {resources.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg px-4 py-2">Resources</h3>
              <div className="space-y-0">
                {resources.map((resource: IResource) => (
                  <ResourceCard key={resource.title} resource={resource} />
                ))}
              </div>
              {resources.length > 0 && <Separator />}
            </div>
          )}
          {events.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg px-4 py-2">Events</h3>
              <div className="space-y-0">
                {events.map((event: IEvent) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="users" className="mt-0">
          <div className="space-y-0">
            {users.length > 0 ? (
              users.map((user: IUser) => (
                <UserCard key={user._id?.toString()} user={user} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No users found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="mt-0">
          <div className="space-y-0">
            {posts.length > 0 ? (
              posts.map((post: IForumTopic) => (
                <PostCard key={post.topicId} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <div className="space-y-0">
            {resources.length > 0 ? (
              resources.map((resource: IResource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resources found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <div className="space-y-0">
            {events.length > 0 ? (
              events.map((event: IEvent) => (
                <EventCard key={event.slug} event={event} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No events found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Results */}
      <div className="pb-4">
        {isLoading ? (
          <div className="space-y-4 p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-destructive">
              Error loading search results. Please try again.
            </p>
          </div>
        ) : query ? (
          renderResults()
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Try searching for something</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;