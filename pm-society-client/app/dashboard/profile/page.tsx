"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useGetMeQuery } from "@/app/redux/services/authApi";
import Image from "next/image";
import { User, Calendar, MapPin, Briefcase, Link as LinkIcon,  Edit3, Shield } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Loading from "@/app/components/functions/Loading";

export default function ProfilePage() {

  const { data: userData, isLoading: isUserLoading } = useGetMeQuery({});
  
 
if(isUserLoading){
  return <Loading/>
}

 



  const user = userData?.data || userData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 lg:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              View your personal information
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link href="/dashboard/profile/change-password">
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Change Password
              </Button>
            </Link>
            <Button className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-slate-200/50 dark:border-slate-700/50">
              <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg -top-4 -left-4 w-full h-24"></div>
                <div className="relative z-10 flex flex-col items-center pt-4">
                  <div className="relative">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="Avatar"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border-4 border-white/20 dark:border-slate-700/50 shadow-lg object-cover ring-2 ring-blue-500/20"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full border-4 border-white/20 dark:border-slate-700/50 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-lg ring-2 ring-blue-500/20">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="mt-4 text-xl text-center">
                    {user?.name || "Your Name"}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-1">
                    {user?.email || "your.email@example.com"}
                  </p>
                  {user?.role && (
                    <Badge variant="secondary" className="mt-2">
                      {user.role}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {user?.bio && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        {user.bio}
                      </p>
                    </div>
                  )}
                  {user?.createdAt && (
                    <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined {format(new Date(user.createdAt), "MMMM yyyy")}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Cards */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <Card className="shadow-xl border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">
                      {user?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">
                      {user?.username || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">
                      {user?.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="shadow-xl border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {user?.location || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1 flex items-center">
                      <LinkIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {user?.website ? (
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {user.website}
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">
                      {user?.company || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Title</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">
                      {user?.jobTitle || "Not provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio Card */}
            {user?.bio && (
              <Card className="shadow-xl border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {user.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Social Links */}
            {user?.socialLinks && Object.keys(user.socialLinks).length > 0 && (
              <Card className="shadow-xl border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(user.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <span className="capitalize">{platform}</span>
                        <LinkIcon className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}