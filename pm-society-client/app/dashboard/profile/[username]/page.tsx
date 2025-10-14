'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Users,
  Star,
  Trophy,
  Zap,
  Heart,
  MessageCircle,
  Share,
  Verified,
  Edit,
  Mail,
  UserPlus,
  UserMinus
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Type definitions
interface User {
  id: string;
  username: string;
  name: string;
  role?: string;
  bio: string;
  location?: string;
  joinedDate: string;
  links: number;
  membershipTier: 'Ignite' | 'Elevate' | 'Excel';
  isVerified: boolean;
  isLinked: boolean;
  avatar: string;
  innerCircle: InnerCircleMember[];
  badges: Badge[];
  goals: Goal[];
  achievements: Achievement[];
  posts: Post[];
  stats: UserStats;
}

interface InnerCircleMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface Badge {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Goal {
  id: number;
  title: string;
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'achieved';
  shared: boolean;
  supporters: string[];
}

interface Achievement {
  id: number;
  title: string;
  achievedDate: string;
  badge: string;
}

interface Post {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

interface UserStats {
  posts: number;
  likes: number;
  views: number;
}

// Mock data with proper typing
const mockUsers: Record<string, User> = {
  'sarahchen': {
    id: '1',
    username: 'sarahchen',
    name: 'Sarah Chen',
    role: 'Senior Product Manager',
    bio: 'Product Manager building thoughtful experiences. Previously at Google and Microsoft. Writing about product strategy, user research, and team leadership.',
    location: 'San Francisco, CA',
    joinedDate: 'March 2021',
    links: 4,
    membershipTier: 'Elevate',
    isVerified: true,
    isLinked: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    innerCircle: [
      { id: '1', name: 'Alex Johnson', username: 'alexj', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      { id: '2', name: 'Maya Patel', username: 'mayap', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      { id: '3', name: 'Jordan Lee', username: 'jordanl', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { id: '4', name: 'Taylor Smith', username: 'taylors', avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=100&h=100&fit=crop&crop=face' }
    ],
    badges: [
      { id: 1, name: 'Cohort Member', icon: Users, color: 'text-blue-500' },
      { id: 2, name: 'Contributor', icon: Star, color: 'text-yellow-500' },
      { id: 3, name: 'Top Engager', icon: Zap, color: 'text-purple-500' }
    ],
    goals: [
      {
        id: 1,
        title: 'Pass PMP Certification',
        targetDate: '2023-12-31',
        status: 'in-progress',
        shared: true,
        supporters: ['alexj', 'mayap']
      },
      {
        id: 2,
        title: 'Complete 35 Training Hours',
        targetDate: '2023-10-15',
        status: 'in-progress',
        shared: true,
        supporters: ['alexj', 'jordanl', 'taylors']
      },
      {
        id: 3,
        title: 'Join a Society Circle',
        targetDate: '',
        status: 'not-started',
        shared: false,
        supporters: []
      },
      {
        id: 4,
        title: 'Post Weekly on The Exchange',
        targetDate: '',
        status: 'in-progress',
        shared: true,
        supporters: ['mayap']
      },
      {
        id: 5,
        title: 'Attend 3 Q&A Sessions',
        targetDate: '2023-11-30',
        status: 'achieved',
        shared: true,
        supporters: ['alexj', 'mayap', 'jordanl', 'taylors']
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Completed Onboarding',
        achievedDate: '2023-03-15',
        badge: 'Cohort Member'
      },
      {
        id: 2,
        title: 'First Post on The Exchange',
        achievedDate: '2023-04-20',
        badge: 'Contributor'
      }
    ],
    posts: [
      {
        id: 1,
        content: 'The best product managers I know spend more time listening than talking. Understanding user problems deeply is the foundation of great products.',
        timestamp: '2h',
        likes: 234,
        comments: 12,
        shares: 45
      },
      {
        id: 2,
        content: 'Product strategy isn\'t about having all the answers. It\'s about asking the right questions and being comfortable with uncertainty.',
        timestamp: '5h',
        likes: 567,
        comments: 23,
        shares: 89
      },
      {
        id: 3,
        content: 'Just shipped a major feature that took 6 months to build. The journey was filled with tough decisions, user feedback loops, and countless iterations. Proud of what the team accomplished.',
        timestamp: '1d',
        likes: 892,
        comments: 67,
        shares: 156
      }
    ],
    stats: {
      posts: 156,
      likes: 12453,
      views: 45678
    }
  },
  'davidkim': {
    id: '2',
    username: 'davidkim',
    name: 'David Kim',
    role: 'Product Lead',
    bio: 'Growth product manager. Building products people love and helping companies scale. Ex-Stripe, Airbnb.',
    location: 'New York, NY',
    joinedDate: 'November 2020',
    links: 3,
    membershipTier: 'Ignite',
    isVerified: false,
    isLinked: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    innerCircle: [
      { id: '1', name: 'Emily Chen', username: 'emilyc', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      { id: '2', name: 'Michael Brown', username: 'michaelb', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
      { id: '3', name: 'Jessica Davis', username: 'jessicad', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' }
    ],
    badges: [
      { id: 1, name: 'Cohort Member', icon: Users, color: 'text-blue-500' },
      { id: 2, name: 'Contributor', icon: Star, color: 'text-yellow-500' }
    ],
    goals: [
      {
        id: 1,
        title: 'Schedule Coaching Session',
        targetDate: '2023-10-30',
        status: 'not-started',
        shared: true,
        supporters: ['emilyc']
      },
      {
        id: 2,
        title: 'Complete 35 Training Hours',
        targetDate: '2023-12-31',
        status: 'in-progress',
        shared: false,
        supporters: []
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Completed Onboarding',
        achievedDate: '2022-11-20',
        badge: 'Cohort Member'
      }
    ],
    posts: [
      {
        id: 1,
        content: 'Growth isn\'t just about acquisition. It\'s about retention, engagement, and creating a product that people genuinely want to use.',
        timestamp: '4h',
        likes: 145,
        comments: 8,
        shares: 23
      },
      {
        id: 2,
        content: 'The best growth loops are invisible to users. They feel natural, not forced.',
        timestamp: '1d',
        likes: 423,
        comments: 34,
        shares: 67
      }
    ],
    stats: {
      posts: 89,
      likes: 8934,
      views: 23456
    }
  }
};

// Membership tier colors
const tierColors: Record<string, string> = {
  'Ignite': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Elevate': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Excel': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const [activeTab, setActiveTab] = useState('posts');
  
  // Mock current user - in a real app, this would come from auth context
  const currentUser = 'sarahchen'; // Change this to test different views
  
  // Get user data or return null if not found
  const userData = mockUsers[username];
  
  // Check if viewing own profile
  const isOwnProfile = currentUser === username;
  
  if (!userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">The user @{username} doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const handleLink = () => {
    // In a real app, this would make an API call
    userData.isLinked = !userData.isLinked;
    if (userData.isLinked) {
      userData.links += 1;
    } else {
      userData.links -= 1;
    }
  };

  const handlePrivateExchange = () => {
    // In a real app, this would navigate to a private messaging interface
    router.push(`/messages/${username}`);
  };

  const handleEditProfile = () => {
    // In a real app, this would navigate to an edit profile page
    router.push(`/settings/profile`);
  };

  const Post = ({ post }: { post: Post }) => (
    <div className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-bold text-black dark:text-white text-sm sm:text-base">{userData.name}</span>
            {userData.isVerified && <Verified className="w-4 h-4 text-black dark:text-white" />}
            <span className="text-gray-500 dark:text-gray-400 text-sm">@{userData.username}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">·</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{post.timestamp}</span>
          </div>
          <div className="mt-2 text-black dark:text-white text-sm sm:text-base break-words">
            {post.content}
          </div>
          <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-gray-500 dark:text-gray-400">
            <button className="flex items-center gap-1 sm:gap-2 hover:text-black dark:hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{post.comments}</span>
            </button>
            <button className="flex items-center gap-1 sm:gap-2 hover:text-black dark:hover:text-white transition-colors">
              <Share className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{post.shares}</span>
            </button>
            <button className="flex items-center gap-1 sm:gap-2 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{post.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GoalCard = ({ goal }: { goal: Goal }) => (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 bg-white dark:bg-black">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-black dark:text-white text-sm sm:text-base break-words">{goal.title}</h3>
          {goal.targetDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Target: {goal.targetDate}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline" className={
              goal.status === 'achieved' ? 'text-green-600 dark:text-green-400' :
              goal.status === 'in-progress' ? 'text-blue-600 dark:text-blue-400' :
              'text-gray-600 dark:text-gray-400'
            }>
              {goal.status === 'achieved' ? 'Achieved' :
               goal.status === 'in-progress' ? 'In Progress' :
               'Not Started'}
            </Badge>
            {goal.shared && (
              <Badge variant="outline" className="text-xs">
                Shared with Inner Circle
              </Badge>
            )}
          </div>
          {goal.shared && goal.supporters.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supported by {goal.supporters.length} members of Inner Circle
              </p>
            </div>
          )}
        </div>
        {goal.status === 'achieved' && (
          <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
        )}
      </div>
    </div>
  );

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 bg-white dark:bg-black">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 flex-shrink-0">
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-black dark:text-white text-sm sm:text-base break-words">{achievement.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Achieved on {achievement.achievedDate}</p>
        </div>
        <Badge variant="outline" className="text-xs flex-shrink-0">
          {achievement.badge}
        </Badge>
      </div>
    </div>
  );

  const InnerCircleMember = ({ member }: { member: InnerCircleMember }) => (
    <Link href={`/profile/${member.username}`}>
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-black dark:text-white text-sm sm:text-base truncate">{member.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{member.username}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Profile Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-2xl sm:text-3xl">{userData.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white truncate">
                    {userData.name}
                  </h1>
                  {userData.isVerified && <Verified className="w-5 h-5 text-black dark:text-white flex-shrink-0" />}
                </div>
                <p className="text-gray-500 dark:text-gray-400">@{userData.username}</p>
                <p className="text-gray-500 dark:text-gray-400">{userData.role || 'Member'}</p>
                
                <p className="text-black dark:text-white mt-2 text-sm sm:text-base break-words">{userData.bio}</p>
                
                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
                  {userData.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                </div>
                
                <div className="flex gap-4 text-sm mt-3">
                  <span className="text-black dark:text-white">
                    <span className="font-bold">{userData.links}</span> 
                    <span className="text-gray-500 dark:text-gray-400 ml-1">Links</span>
                  </span>
                  <span className="text-black dark:text-white">
                    <span className="font-bold">{userData.stats.posts}</span> 
                    <span className="text-gray-500 dark:text-gray-400 ml-1">Posts</span>
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge className={tierColors[userData.membershipTier] || tierColors['Ignite']}>
                    {userData.membershipTier} Tier
                  </Badge>
                  {userData.badges.map((badge: Badge) => (
                    <Badge key={badge.id} variant="outline" className="flex items-center gap-1">
                      <badge.icon className={`w-3 h-3 ${badge.color}`} />
                      <span className="hidden sm:inline">{badge.name}</span>
                      <span className="sm:hidden">{badge.name.split(' ')[0]}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-row sm:flex-col gap-2">
              {isOwnProfile ? (
                <Button 
                  onClick={handleEditProfile}
                  variant="outline" 
                  className="rounded-full px-4 sm:px-6 border-black dark:border-white flex items-center gap-2 text-sm"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handlePrivateExchange}
                    variant="outline" 
                    className="rounded-full px-4 sm:px-6 border-black dark:border-white flex items-center gap-2 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">Private Exchange</span>
                    <span className="sm:hidden">Message</span>
                  </Button>
                  <Button 
                    onClick={handleLink}
                    variant={userData.isLinked ? "outline" : "default"}
                    className={`rounded-full px-4 sm:px-6 flex items-center gap-2 text-sm ${userData.isLinked ? 'border-black dark:border-white text-black dark:text-white' : 'bg-black dark:bg-white text-white dark:text-black'}`}
                  >
                    {userData.isLinked ? (
                      <>
                        <UserMinus className="w-4 h-4" />
                        <span className="hidden sm:inline">Unlink</span>
                        <span className="sm:hidden">Unlink</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span className="hidden sm:inline">Link</span>
                        <span className="sm:hidden">Link</span>
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-12 w-full justify-start px-4 sm:px-6 lg:px-8 ">
            <TabsTrigger 
              value="posts" 
              className={`data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none px-3 sm:px-6 h-12 font-normal text-sm whitespace-nowrap`}
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className={`data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none px-3 sm:px-6 h-12 font-normal text-sm whitespace-nowrap`}
            >
              Goals
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className={`data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none px-3 sm:px-6 h-12 font-normal text-sm whitespace-nowrap`}
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger 
              value="inner-circle" 
              className={`data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none px-3 sm:px-6 h-12 font-normal text-sm whitespace-nowrap`}
            >
              Inner Circle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            {userData.posts.map((post: Post) => (
              <Post key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="goals" className="mt-0 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">Goals</h2>
            <div className="space-y-3">
              {userData.goals.map((goal: Goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">Achievements</h2>
            <div className="space-y-3">
              {userData.achievements.map((achievement: Achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inner-circle" className="mt-0 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">Inner Circle</h2>
            <div className="space-y-2">
              {userData.innerCircle.map((member: InnerCircleMember) => (
                <InnerCircleMember key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}