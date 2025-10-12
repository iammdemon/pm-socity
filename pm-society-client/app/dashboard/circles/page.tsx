"use client"


import {  Network, Search,} from "lucide-react";


import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import AddPost from "@/app/components/forum/AddPost";
import PostFeed from "@/app/components/forum/Feed";
import TrendingTopics from "@/app/components/forum/TrendingTopics";
import WhoToFollow from "@/app/components/forum/WhoToFollow";
import { IForumTopic } from "@/app/redux/services/forumApi";

const SocietyCirclePage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Mock network stats
  const networkStats = {
    connections: 342,
    followers: 1250,
    following: 892,
    profileViews: 5432
  };

  // Filter to show only posts from followed users
  const filterFollowedUsers = (posts: IForumTopic[]) => {
    if (!userId) return [];
    // In a real app, you would filter by followed users
    return posts;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Society Circles</h1>
              
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <AddPost />
              <PostFeed 
                title="Your Network"
                subtitle="Posts from your professional network"
                dataFilter={filterFollowedUsers}
                emptyMessage="No posts from your network yet"
                emptyIcon={<Network className="w-16 h-16 mx-auto" />}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Network Stats */}
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-lg font-semibold">Your Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {networkStats.connections}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {networkStats.followers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {networkStats.following}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {networkStats.profileViews}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Profile Views</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button className="w-full bg-black dark:bg-white text-white dark:text-black rounded-lg py-2 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    Manage Network
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Search */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search your network"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>

            {/* Trending Topics */}
            <TrendingTopics />

            {/* Who to Follow */}
            <WhoToFollow />

            {/* People You May Know */}
            {/* <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-lg font-semibold">People You May Know</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm">John Doe</h3>
                        <p className="text-xs text-gray-500">Senior PM at Tech Corp</p>
                        <Badge variant="outline" className="text-xs mt-1">2nd connection</Badge>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm">Sarah Johnson</h3>
                        <p className="text-xs text-gray-500">Agile Coach</p>
                        <Badge variant="outline" className="text-xs mt-1">3rd connection</Badge>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                      Connect
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    View all suggestions
                  </button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyCirclePage;