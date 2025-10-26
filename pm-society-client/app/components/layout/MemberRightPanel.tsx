"use client";

import { useGetUserQuery } from "@/app/redux/services/authApi";
import Image from "next/image";
import {
  Check,
  TrendingUp,
  Settings,
  Camera,
  User,
  Key,
  LogOut,
  Target,
  Trophy,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import Loading from "@/app/components/functions/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { signOut } from "next-auth/react";
import Link from "next/link";

// Type definitions for goals and achievements
interface IAchievement {
  _id: string;
  user: string;
  title: string;
  description?: string;
  date?: string;
  type?: "PMP" | "CAPM" | "ACP";
}

interface IGoal {
  _id: string;
  user: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: "in-progress" | "completed";
}

export default function MemberRightPanel() {
  // Use prop data if provided, otherwise fetch from API
  const { data: apiData, isLoading: isApiLoading } = useGetUserQuery({});

  const userData = apiData?.data.user;
  const goals: IGoal[] = apiData?.data.goals || [];
  const achievements: IAchievement[] = apiData?.data.achievements || [];
  const isLoading = isApiLoading;

  if (isLoading) {
    return <Loading />;
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date";
    return format(new Date(dateString), "MMM yyyy");
  };

  // Helper function to get achievement icon based on type
  const getAchievementIcon = (type?: string) => {
    switch (type) {
      case "PMP":
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case "CAPM":
        return <Trophy className="w-4 h-4 text-blue-500" />;
      case "ACP":
        return <Trophy className="w-4 h-4 text-green-500" />;
      default:
        return <Trophy className="w-4 h-4 text-gray-500" />;
    }
  };

  // Helper function to get achievement badge color
  const getAchievementBadgeColor = (type?: string) => {
    switch (type) {
      case "PMP":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "CAPM":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "ACP":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <aside className="hidden lg:flex h-screen lg:w-80 flex-shrink-0 bg-white dark:bg-black text-black dark:text-white flex-col border-l border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Profile Header */}
      <div className="relative h-56 w-full dark:bg-black bg-white">
        <div className="absolute top-4 right-4 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 bg-white/10 dark:bg-black/10 rounded-full flex items-center justify-center hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
                <Settings className="w-5 h-5 dark:text-white text-black" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
            >
              <DropdownMenuItem>
                <ModeToggle />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/profile/${userData?.userName}`}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/profile/change-password"
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Key className="w-4 h-4" />
                  <span>Change Password</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-4">
            <div className="relative group">
              {userData?.avatar ? (
                <Image
                  src={userData.avatar}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl border-2 border-white dark:border-black object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-black flex items-center justify-center text-2xl font-bold text-black dark:text-white">
                  {userData?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 dark:bg-white/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white dark:text-black" />
              </div>
              {userData?.verified && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white dark:text-black" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold dark:text-white text-black">
                  {userData?.name || "User"}
                </h2>
              </div>

              <p className="text-sm dark:text-white/80 text-black/80 truncate mt-1">
                Society Member
              </p>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <div className="flex items-center gap-1 dark:bg-white/10 bg-black/10 px-3 py-1 rounded-full border border-white/20 dark:border-black/20">
                  <span className="text-sm dark:text-white text-black font-medium whitespace-nowrap">
                    {userData?.title || "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {userData?.bio && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-black">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">About</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {userData.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {/* User Stats */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-black">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Profile Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Links
                </span>
                <span className="text-sm font-medium">
                  {userData?.linkedUsersCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Goals
                </span>
                <span className="text-sm font-medium">{goals.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Achievements
                </span>
                <span className="text-sm font-medium">
                  {achievements.length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Section */}
        {goals.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-black">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Goals</h3>
              </div>
              <div className="space-y-3">
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal._id} className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {goal.title}
                      </p>
                      {goal.status && (
                        <Badge
                          variant="outline"
                          className={`text-xs mt-1 ${
                            goal.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                          }`}
                        >
                          {goal.status === "completed"
                            ? "Completed"
                            : "In Progress"}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-black">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Achievements</h3>
              </div>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement._id} className="flex items-start gap-2">
                    {getAchievementIcon(achievement.type)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {achievement.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {achievement.type && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${getAchievementBadgeColor(
                              achievement.type
                            )}`}
                          >
                            {achievement.type}
                          </Badge>
                        )}
                        {achievement.date && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(achievement.date)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="whitespace-nowrap text-gray-600 dark:text-gray-400">
              Member since{" "}
              {userData?.createdAt
                ? format(new Date(userData.createdAt), "MMM yyyy")
                : "Unknown"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
