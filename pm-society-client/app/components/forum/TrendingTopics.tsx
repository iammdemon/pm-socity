
"use client";

import { useState } from "react";
import { TrendingUp, Hash, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Topic {
  tag: string;
  posts: string;
  category?: string;
  trending?: boolean;
}

const mockTrendingTopics: Topic[] = [
  { tag: "#PMP", posts: "12.5K", category: "Certification", trending: true },
  { tag: "#Agile", posts: "8.9K", category: "Methodology", trending: true },
  { tag: "#Scrum", posts: "6.7K", category: "Framework", trending: true },
  { tag: "#ProjectManagement", posts: "5.4K", category: "General", trending: true },
  { tag: "#Leadership", posts: "4.2K", category: "Soft Skills", trending: true },
  { tag: "#Certification", posts: "3.8K", category: "Career", trending: true },
  { tag: "#StakeholderManagement", posts: "2.1K", category: "Skills" },
  { tag: "#RiskManagement", posts: "1.8K", category: "Skills" },
  { tag: "#ChangeManagement", posts: "1.5K", category: "Skills" },
  { tag: "#TeamBuilding", posts: "1.2K", category: "Soft Skills" },
];

const TrendingTopics = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'all'>('trending');

  const topics = activeTab === 'trending' 
    ? mockTrendingTopics.filter(t => t.trending)
    : mockTrendingTopics;

  return (
    <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-lg font-semibold">Trending Topics</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === 'trending' 
                  ? 'bg-black dark:bg-white text-white dark:text-black' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === 'all' 
                  ? 'bg-black dark:bg-white text-white dark:text-black' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
              }`}
            >
              <Hash className="w-4 h-4" />
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {topic.tag}
                  </span>
                  {topic.trending && (
                    <TrendingUp className="w-3 h-3 text-red-500" />
                  )}
                </div>
                {topic.category && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                    {topic.category}
                  </p>
                )}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {topic.posts} posts
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
          {/* <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Show more
          </button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;