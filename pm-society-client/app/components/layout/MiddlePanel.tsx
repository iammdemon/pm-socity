"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {

  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  Search,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";


// ---------- Mock Data ----------
interface Post {
  id: number;
  author: string;
  role: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: "Olivia McGlothen",
    role: "Mentorship & Training",
    avatar: "https://i.pravatar.cc/100?img=1",
    content:
      "🎉 Excited to share I just completed my PMP exam prep milestone — huge thanks to my Inner Circle for the support!",
    likes: 32,
    comments: 5,
  },
  {
    id: 2,
    author: "Marcus Lee",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/100?img=2",
    content:
      "📌 Does anyone have a great template for stakeholder mapping? Looking to share best practices.",
    likes: 12,
    comments: 3,
  },
];

// ---------- Component ----------
export default function MiddlePanel() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="w-full max-w-7xl mx-auto px-3 md:px-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 sticky top-0 bg-black/90 backdrop-blur-md p-3 z-20 border-b border-neutral-800">
      {/* <Image
        src="/logo-2.png"
        alt="The PM Society Logo"
        width={50}
        height={50}
        priority
      /> */}
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members, posts, events, resources"
              className="pl-10 rounded-full bg-neutral-900 border-neutral-700 text-white placeholder-gray-400 focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList
          className="
            fixed bottom-0 left-0 right-0 z-30 flex justify-around md:static md:justify-start 
            md:gap-2 w-full bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 md:border-none 
            p-2 md:p-1 rounded-t-xl md:rounded-md
          "
        >
          <TabsTrigger
            value="posts"
            className="flex flex-col items-center text-xs text-white px-2 py-6 rounded-md 
              data-[state=active]:bg-green-500 data-[state=active]:text-black"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="hidden md:inline">Posts</span>
          </TabsTrigger>

          <TabsTrigger
            value="circles"
            className="flex flex-col items-center text-xs text-white px-2 py-6 rounded-md 
              data-[state=active]:bg-green-500 data-[state=active]:text-black"
          >
            <Users className="h-5 w-5" />
            <span className="hidden md:inline">Circles</span>
          </TabsTrigger>

          <TabsTrigger
            value="directory"
            className="flex flex-col items-center text-xs text-white px-2 py-6 rounded-md 
              data-[state=active]:bg-green-500 data-[state=active]:text-black"
          >
            <Users className="h-5 w-5" />
            <span className="hidden md:inline">Directory</span>
          </TabsTrigger>

          <TabsTrigger
            value="events"
            className="flex flex-col items-center text-xs text-white px-2 py-6 rounded-md 
              data-[state=active]:bg-green-500 data-[state=active]:text-black"
          >
            <Calendar className="h-5 w-5" />
            <span className="hidden md:inline">Events</span>
          </TabsTrigger>

          <TabsTrigger
            value="resources"
            className="flex flex-col items-center text-xs text-white px-2 py-6 rounded-md 
              data-[state=active]:bg-green-500 data-[state=active]:text-black"
          >
            <BookOpen className="h-5 w-5" />
            <span className="hidden md:inline">Resources</span>
          </TabsTrigger>
        </TabsList>

        {/* Posts Feed */}
        <TabsContent value="posts" className="space-y-4 mt-6 md:mt-4 mb-20 md:mb-0">
          {mockPosts.map((post) => (
            <Card
              key={post.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/70 
              hover:bg-neutral-900/90 transition-colors shadow-lg shadow-black/30"
            >
              <CardContent className="p-5 space-y-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{post.author}</p>
                    <p className="text-xs text-gray-400">{post.role}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-gray-200">
                  {post.content}
                </p>

                {/* Engagement */}
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Circles */}
        <TabsContent value="circles" className="p-6 text-sm text-gray-400">
          🌐 Society Circles — exclusive groups to join and collaborate.
        </TabsContent>

        {/* Directory */}
        <TabsContent value="directory" className="p-6 text-sm text-gray-400">
          🔍 Explore The Inner Circle — connect with members.
        </TabsContent>

        {/* Events */}
        <TabsContent value="events" className="p-6 text-sm text-gray-400">
          📅 Upcoming Events — register and add to calendar.
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources" className="p-6 text-sm text-gray-400">
          📚 Resource Library — templates, guides, tools.
        </TabsContent>
      </Tabs>
    </div>
  );
}
