"use client";

import { Search,} from "lucide-react";


import { Input } from "@/components/ui/input";

import AddPost from "../components/forum/AddPost";
import PostFeed from "../components/forum/Feed";
import TrendingTopics from "../components/forum/TrendingTopics";
import WhoToFollow from "../components/forum/WhoToFollow";

const TheExchangePage = () => {
  

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  The Exchange
                </h1>
               
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <AddPost />
              <PostFeed
                title="For You"
                subtitle="Top posts for you based on your interests"
                emptyMessage="No posts yet. Start following people to see their content!"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>

            {/* Trending Topics */}
            <TrendingTopics />

            {/* Who to Follow */}
            <WhoToFollow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheExchangePage;
