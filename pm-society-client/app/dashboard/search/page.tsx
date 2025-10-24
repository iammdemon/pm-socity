"use client";

import React, { useState, useEffect } from "react";
import {  useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

import { useSearchQuery } from "@/app/redux/services/authApi";
import { IForumTopic, IUser } from "@/app/redux/services/forumApi";
import { IResource } from "@/app/redux/services/resourceApi";
import { IEvent } from "@/app/redux/services/eventApi";

const SearchPage: React.FC = () => {

  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [query, setQuery] = useState(q);
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error } = useSearchQuery(query, {
    skip: !query.trim(),
  });

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

  const PostCard = ({ post }: { post: IForumTopic }) => (
    <Card className="border-0 shadow-none hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
            <AvatarFallback>
              {post.author?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <p className="font-semibold text-foreground truncate">
                {post.author?.name}
              </p>
              <p className="text-muted-foreground">@{post.author?.userName}</p>
              <span className="text-muted-foreground">·</span>
              <p className="text-muted-foreground text-sm">
                {post.createdAt &&
                  formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
              </p>
            </div>
            <p className="text-foreground mt-2 whitespace-pre-wrap">
              {post.content}
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <span className="mr-1">💬</span>
                {post.replies?.length || 0}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <span className="mr-1">🔁</span>
                {post.reactions?.length || 0}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <span className="mr-1">❤️</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ResourceCard = ({ resource }: { resource: IResource }) => (
    <Card className="border-0 shadow-none hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground">{resource.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {resource.description}
        </p>
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline mt-2 block truncate"
        >
          {resource.link}
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

        <TabsContent value="all" className="mt-0 space-y-4">
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
                <PostCard key={post._id?.toString()} post={post} />
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
