"use client";

import React, { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarClock,
  UserCheck,
  Sparkles,
  BookOpen,
  Users,
  MessageSquare,
  Crown,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useGetMeQuery } from "../redux/services/authApi";

interface User {
  name: string;
  email: string;
  packageType: string;
  role: string;
  subscriptionStatus: string;
  subscriptionType: string;
  subscriptionEndDate: string;
  createdAt: string;
  amount: number;
  progress?: number;
  completedModules?: number;
  totalModules?: number;
  streakDays?: number;
  lastActivity?: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getDaysUntilExpiry = (endDate?: string) => {
  if (!endDate) return 0;
  const today = new Date();
  const expiry = new Date(endDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); // never negative
};

export default function MemberDashboard() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetMeQuery({});

  // Expect user data directly, adjust if your API wraps it under `data`
  const user: User | undefined = data?.data || data;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.replace("/login");
    }
  }, [isLoading, isError, user, router]);

  const daysUntilExpiry = useMemo(() => getDaysUntilExpiry(user?.subscriptionEndDate), [
    user?.subscriptionEndDate,
  ]);

  const memberSince = useMemo(() => (user?.createdAt ? formatDate(user.createdAt) : ""), [user?.createdAt]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="container mx-auto space-y-6">
          <Skeleton className="h-12 w-80 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!user) return null; // or spinner if you want

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 text-lg">
              Continue your journey with {user.packageType} membership
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-black text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Package</p>
                  <p className="text-2xl font-bold">{user.packageType}</p>
                </div>
                <Crown className="h-8 w-8 text-purple-100" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-white/20">
                  {(user.subscriptionType?.replace("_", " ") || "N/A").toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-xl font-bold">Subscription</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge
                    className={
                      user.subscriptionStatus === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {user.subscriptionStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className="text-sm font-medium">
                    {(user.subscriptionType?.replace("_", " ") || "N/A").toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Expires</span>
                  <span className="text-sm font-medium">
                    {user.subscriptionEndDate ? formatDate(user.subscriptionEndDate) : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium">{memberSince}</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">
                      {daysUntilExpiry} days remaining
                    </span>
                  </div>
                  <Button className="w-full" size="sm">
                    Renew Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <CalendarClock className="h-6 w-6 text-indigo-600" />
                <CardTitle className="text-xl font-bold">Upcoming Events</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-700 font-bold">15</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900">Live Q&A Session</h4>
                    <p className="text-sm text-indigo-700">July 15, 2025 at 2:00 PM</p>
                    <p className="text-xs text-indigo-600 mt-1">Join link will be emailed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-700 font-bold">22</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900">Workshop: Advanced Techniques</h4>
                    <p className="text-sm text-green-700">July 22, 2025 at 10:00 AM</p>
                    <p className="text-xs text-green-600 mt-1">ELEVATE members only</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-pink-600" />
                <CardTitle className="text-xl font-bold">Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link
                  href="/dashboard/library"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">📚 Library & Resources</span>
                  </div>
                </Link>
                <Link
                  href="/blogs"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">📰 Latest Articles</span>
                  </div>
                </Link>
                <Link
                  href="/dashboard/forum"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">💬 Community Forum</span>
                  </div>
                </Link>
                <Link
                  href="/dashboard/support"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">🎧 Support Center</span>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
