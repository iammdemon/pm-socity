"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  TrendingUp, 
  Users, 
  Hash, 
  Calendar,
 
  Image as ImageIcon,
  Smile,
  BarChart3,
 
  UserPlus,
  Verified,
  Search,
  
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarah_pm",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=100&h=100&fit=crop&crop=face",
    bio: "PMP® | Agile Coach | Helping teams deliver value",
    verified: true,
    followers: 5234,
    following: 892,
    posts: 342
  },
  {
    id: "2",
    name: "Michael Chen",
    username: "michaelchen_pm",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Scrum Master | Product Owner | Agile enthusiast",
    verified: false,
    followers: 2156,
    following: 445,
    posts: 189
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    username: "emily_rod",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "Program Manager | Tech enthusiast | Coffee lover ☕",
    verified: true,
    followers: 8932,
    following: 234,
    posts: 567
  },
  {
    id: "4",
    name: "David Kim",
    username: "davidkim_pm",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    bio: "PMI certified | 10+ years in project management",
    verified: false,
    followers: 3421,
    following: 678,
    posts: 234
  },
  {
    id: "5",
    name: "Lisa Thompson",
    username: "lisathompson",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    bio: "Change Management | Organizational Development",
    verified: true,
    followers: 6789,
    following: 123,
    posts: 445
  }
];

const mockPosts = [
  {
    id: "1",
    author: mockUsers[0],
    content: "Just completed my PMP certification! 🎉 The journey was challenging but worth every moment. Here are my top 5 study tips that helped me pass on the first attempt:\n\n1. Create a study schedule and stick to it\n2. Join study groups for different perspectives\n3. Practice with mock exams regularly\n4. Understand the concepts, don't just memorize\n5. Stay positive and believe in yourself\n\n#PMP #ProjectManagement #Certification",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 234,
    comments: 45,
    shares: 12,
    bookmarks: 89,
    liked: false,
    bookmarked: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
  },
  {
    id: "2",
    author: mockUsers[2],
    content: "Agile transformation isn't just about processes, it's about mindset. 🔄 Today's retrospective revealed that our team is still struggling with the concept of 'fail fast, learn faster'. \n\nHow do you help your team embrace failure as a learning opportunity? Would love to hear your strategies! #Agile #Scrum #TeamCulture",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 567,
    comments: 89,
    shares: 34,
    bookmarks: 156,
    liked: true,
    bookmarked: false
  },
  {
    id: "3",
    author: mockUsers[1],
    username: "michaelchen_pm",
    content: "Product Owner tip of the day: Always say 'no' more than you say 'yes'. Your job is to protect the team's focus and ensure maximum value delivery. 🎯\n\nRemember: Every 'yes' to a new feature is a 'no' to something else in the backlog.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 892,
    comments: 67,
    shares: 123,
    bookmarks: 234,
    liked: false,
    bookmarked: true
  },
  {
    id: "4",
    author: mockUsers[3],
    content: "Stakeholder management is 80% communication and 20% documentation. 📊 Just finished a stakeholder map for my new project and it's amazing how visualizing relationships helps prioritize communication efforts.\n\nWho are your most challenging stakeholders? #StakeholderManagement #PMTools",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    likes: 345,
    comments: 78,
    shares: 45,
    bookmarks: 167,
    liked: true,
    bookmarked: true
  },
  {
    id: "5",
    author: mockUsers[4],
    content: "Change is the only constant in project management. 🌊 Leading through organizational change requires empathy, clear communication, and a lot of patience.\n\nWhat's the biggest change you've had to manage in your projects?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    likes: 1234,
    comments: 156,
    shares: 89,
    bookmarks: 345,
    liked: false,
    bookmarked: false
  }
];

const trendingTopics = [
  { tag: "#PMP", posts: "12.5K" },
  { tag: "#Agile", posts: "8.9K" },
  { tag: "#Scrum", posts: "6.7K" },
  { tag: "#ProjectManagement", posts: "5.4K" },
  { tag: "#Leadership", posts: "4.2K" },
  { tag: "#Certification", posts: "3.8K" }
];

export default function SocietyCirclesPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newPost]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked, bookmarks: post.bookmarked ? post.bookmarks - 1 : post.bookmarks + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    const newPostObj: typeof mockPosts[0] = {
      id: Date.now().toString(),
      author: {
        id: session?.user?.id || "current",
        name: session?.user?.name || "Current User",
        username: session?.user?.email?.split("@")[0] || "currentuser",
        avatar: session?.user?.avatar || "",
        verified: false,
        followers: 0,
        following: 0,
        posts: 0
 , bio: ""
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      bookmarks: 0,
      liked: false,
      bookmarked: false
    };
    
    setPosts([newPostObj , ...posts]);
    setNewPost("");
    setShowNewPostModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session?.user?.avatar || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => setShowNewPostModal(true)}
                  className="flex-1 text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full px-4 py-2 transition-colors"
                >
                  What&apos;s happening in your project management journey?
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <BarChart3 className="w-5 h-5" />
                  </button>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
                <Button
                  onClick={() => setShowNewPostModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  Post
                </Button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>
                            {post.author.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {post.author.name}
                            </h3>
                            {post.author.verified && (
                              <Verified className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            @{post.author.username}
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

                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-3 rounded-xl overflow-hidden">
                        <Image
                          src={post.image}
                          alt="Post image"
                          width={600}
                          height={400}
                          className="w-full object-cover"
                        />
                      </div>
                    )}

                    {/* Post Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>{formatDistanceToNow(post.timestamp, { addSuffix: true })}</span>
                      <div className="flex items-center space-x-4">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            post.liked 
                              ? "text-red-500 hover:text-red-600" 
                              : "text-gray-500 dark:text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`} />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className={`transition-colors ${
                          post.bookmarked 
                            ? "text-blue-500 hover:text-blue-600" 
                            : "text-gray-500 dark:text-gray-400 hover:text-blue-500"
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${post.bookmarked ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Circles"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                Trending in Circles
              </h2>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{topic.tag}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{topic.posts} posts</p>
                    </div>
                    <Hash className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Who to Follow */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Who to Follow
              </h2>
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {user.name}
                          </h3>
                          {user.verified && (
                            <Verified className="w-3 h-3 text-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                          {user.bio}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-1 text-xs"
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
              <Link
                href="#"
                className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-4 block text-center"
              >
                Show more
              </Link>
            </div>

            {/* Footer Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="space-y-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Link href="#" className="hover:underline">Terms of Service</Link>
                  <span>·</span>
                  <Link href="#" className="hover:underline">Privacy Policy</Link>
                  <span>·</span>
                  <Link href="#" className="hover:underline">Cookie Policy</Link>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href="#" className="hover:underline">Ads info</Link>
                  <span>·</span>
                  <Link href="#" className="hover:underline">More</Link>
                </div>
                <p>© 2024 The PM Society</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create Post</h2>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex space-x-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session?.user?.avatar || ""} alt={session?.user?.name || ""} />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posting to Circles
                </p>
              </div>
            </div>
            <Textarea
              ref={textareaRef}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your project management insights..."
              className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              rows={4}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowNewPostModal(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}