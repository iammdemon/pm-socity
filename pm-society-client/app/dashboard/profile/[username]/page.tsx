"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Users,
  Heart,
  MessageCircle,
  Edit,
  Mail,
  UserPlus,
  UserMinus,
  Target,
  Trophy,
 
  CheckCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import {
  useGetUserByUserNameQuery,
  useGetMeQuery,
  useToggleLinkMutation,
} from "@/app/redux/services/authApi";
import { useToggleReactionOnTopicMutation } from "@/app/redux/services/forumApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Type definitions to match API response
interface IUser {
  _id: string;
  name: string;
  email: string;
  amount: number;
  role: string;
  packageType: string;
  subscriptionType: string;
  subscriptionStatus: string;
  subscriptionEndDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar: string;
  bio: string;
  linkedUsers: ILinkeduser[];
  userName: string;
  linkedUsersCount: number;
}

interface ILinkeduser {
  name: string;
  userName: string;
  _id: string;
  avatar: string;
}

interface IReaction {
  _id: string;
  name: string;
  email: string;
}

interface IReply {
  _id: string;
  author: {
    _id: string;
    name: string;
    email: string;
    id: string;
  };
  content: string;
  reactions: string[];
  createdAt: string;
  updatedAt: string;
  reactionCount: number;
  id: string;
}

interface IPost {
  _id: string;
  author: string;
  content: string;
  reactions: IReaction[];
  replies: IReply[];
  createdAt: string;
  updatedAt: string;
  topicId: string;
  __v: number;
  reactionCount: number;
  replyCount: number;
  id: string;
}

interface IGoal {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface IAchievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: "certification" | "award" | "milestone" | "recognition";
  createdAt: string;
  updatedAt: string;
}

interface IProfileData {
  profile: IUser;
  posts: IPost[];
  goals: IGoal[];
  achievements: IAchievement[];
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const [activeTab, setActiveTab] = useState("posts");
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [reactingPostId, setReactingPostId] = useState<string | null>(null);

  const { data: meData } = useGetMeQuery({});
  const currentUserId = meData?.data?._id;
  const currentUserName = meData?.data?.userName;

  // Fetch user data by username
  const { data, isLoading, error, refetch } =
    useGetUserByUserNameQuery(username);
  const [toggleReaction] = useToggleReactionOnTopicMutation();

  const userData = data?.data as IProfileData;

  const linkedUsers = userData?.profile?.linkedUsers || [];
  const posts = userData?.posts || [];
  const goals = userData?.goals || [];
  const achievements = userData?.achievements || [];

  // Use toggleLink mutation for both link/unlink
  const [toggleLink, { isLoading: isLinking }] = useToggleLinkMutation();

  // Check if viewing own profile
  const isOwnProfile = currentUserName === username;

  const handleReact = async (topicId: string) => {
    if (!userId) {
      toast.error("You must be logged in to react");
      return;
    }
    setReactingPostId(topicId);

    try {
      await toggleReaction({ topicId, userId }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Failed to toggle reaction:", err);
      toast.error("Failed to react. Please try again.");
    } finally {
      setReactingPostId(null);
    }
  };

  const hasReacted = (post: IPost) => {
    return (
      post.reactions?.some((reaction: IReaction) => reaction._id === userId) ||
      false
    );
  };

  // Check if the profile is already linked to current user
  const isAlreadyLinked =
    !isOwnProfile &&
    linkedUsers?.some((u: ILinkeduser) => u._id === currentUserId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The user @{username} doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  // Handle link/unlink
  const handleLink = async () => {
    if (!userData?.profile?._id) return;

    try {
      await toggleLink(userData.profile._id).unwrap();
      await refetch();
    } catch (err) {
      console.error("Error linking/unlinking user:", err);
    }
  };

  const handlePrivateExchange = () => {
    // In a real app, this would navigate to a private messaging interface
    router.push(`/dashboard/messages`);
  };

  const handleEditProfile = () => {
    // In a real app, this would navigate to an edit profile page
    router.push(`/dashboard/profile`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  const Post = ({ post }: { post: IPost }) => {
    const reacted = hasReacted(post);
    const isReactingThisPost = reactingPostId === post.topicId;

    return (
      <div className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <AvatarImage
              src={userData?.profile?.avatar}
              alt={userData.profile?.name}
            />
            <AvatarFallback>
              {userData?.profile?.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-bold text-black dark:text-white text-sm sm:text-base">
                {userData.profile?.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                @{userData.profile?.userName}
              </span>
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
              <button className="flex items-center gap-1 sm:gap-2 hover:text-black dark:hover:text-white transition-colors">
                <Link href={`/dashboard/forum/${post.topicId}`}>
                  <MessageCircle className="w-4 h-4" />
                </Link>
                <span className="text-xs sm:text-sm">{post.replyCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Goal = ({ goal }: { goal: IGoal }) => {
    const isCompleted = goal.status === "completed";
    const progressPercentage = goal.endDate
      ? Math.min(
          100,
          Math.max(
            0,
            ((new Date().getTime() - new Date(goal.startDate).getTime()) /
              (new Date(goal.endDate).getTime() -
                new Date(goal.startDate).getTime())) *
              100
          )
        )
      : 0;

    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium text-black dark:text-white">
              {goal.title}
            </h3>
          </div>
          <Badge
            variant={isCompleted ? "default" : "secondary"}
            className={
              isCompleted
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            }
          >
            {isCompleted ? "Completed" : "In Progress"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {goal.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {formatDate(goal.startDate)} -{" "}
              {goal.endDate ? formatDate(goal.endDate) : "Ongoing"}
            </span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-green-500">
              <CheckCircle className="w-3 h-3" />
              <span>Completed</span>
            </div>
          )}
        </div>
        {goal.endDate && !isCompleted && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Achievement = ({ achievement }: { achievement: IAchievement }) => {
    const getIcon = () => {
      switch (achievement.type) {
        case "certification":
          return <Trophy className="w-5 h-5 text-yellow-500" />;
        case "award":
          return <Trophy className="w-5 h-5 text-amber-500" />;
        case "milestone":
          return <Target className="w-5 h-5 text-blue-500" />;
        case "recognition":
          return <Trophy className="w-5 h-5 text-purple-500" />;
        default:
          return <Trophy className="w-5 h-5 text-gray-500" />;
      }
    };

    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getIcon()}
            <h3 className="font-medium text-black dark:text-white">
              {achievement.title}
            </h3>
          </div>
          <Badge
            variant="outline"
            className="capitalize"
          >
            {achievement.type}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {achievement.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(achievement.date)}</span>
        </div>
      </div>
    );
  };

  const LinkedUser = ({ user }: { user: ILinkeduser }) => (
    <Link href={`/dashboard/profile/${user.userName}`}>
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            {user?.name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-black dark:text-white text-sm sm:text-base truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{user.userName}
          </p>
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
                <AvatarImage
                  src={userData.profile?.avatar}
                  alt={userData.profile?.name}
                />
                <AvatarFallback className="text-2xl sm:text-3xl">
                  {userData.profile?.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white truncate">
                    {userData.profile?.name}
                  </h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  @{userData.profile?.userName}
                </p>

                <p className="text-black dark:text-white mt-2 text-sm sm:text-base break-words">
                  {userData.profile?.bio}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined {formatDate(userData.profile?.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 text-sm mt-3">
                  <span className="text-black dark:text-white">
                    <span className="font-bold">
                      {userData.profile?.linkedUsersCount}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      Links
                    </span>
                  </span>
                  <span className="text-black dark:text-white">
                    <span className="font-bold">{posts.length}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      Posts
                    </span>
                  </span>
                  <span className="text-black dark:text-white">
                    <span className="font-bold">{goals.length}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      Goals
                    </span>
                  </span>
                  <span className="text-black dark:text-white">
                    <span className="font-bold">{achievements.length}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      Achievements
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {userData.profile?.packageType && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {userData.profile?.packageType}
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span className="hidden sm:inline">
                      {" "}
                      {userData.profile?.role.toLocaleUpperCase()}
                    </span>
                    <span className="sm:hidden"> {userData.profile?.role}</span>
                  </Badge>
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
                    disabled={isLinking}
                    variant={isAlreadyLinked ? "outline" : "default"}
                    className={`rounded-full px-4 sm:px-6 flex items-center gap-2 text-sm ${
                      isAlreadyLinked
                        ? "border-black dark:border-white text-black dark:text-white"
                        : "bg-black dark:bg-white text-white dark:text-black"
                    }`}
                  >
                    {isLinking ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    ) : isAlreadyLinked ? (
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
            {posts.length > 0 ? (
              posts.map((post: IPost) => <Post key={post.id} post={post} />)
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No posts yet
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="goals" className="mt-0 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Goals
            </h2>
            {goals.length > 0 ? (
              goals.map((goal: IGoal) => <Goal key={goal._id} goal={goal} />)
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No goals set yet
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="mt-0 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Achievements
            </h2>
            {achievements.length > 0 ? (
              achievements.map((achievement: IAchievement) => (
                <Achievement key={achievement._id} achievement={achievement} />
              ))
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No achievements yet
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="inner-circle" className="mt-0 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Inner Circle
            </h2>
            {linkedUsers.length > 0 ? (
              <div className="space-y-2">
                {linkedUsers.map((user) => (
                  <LinkedUser key={user._id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No inner circle members yet
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}