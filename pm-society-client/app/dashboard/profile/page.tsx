"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useGetMeQuery } from "@/app/redux/services/authApi";
import Image from "next/image";
import { User, Calendar, MapPin, Briefcase, Link as LinkIcon, Edit3, Shield, Mail, Phone, Globe, Building } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Loading from "@/app/components/functions/Loading";

export default function ProfilePage() {
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery({});
  
  if(isUserLoading) {
    return <Loading/>
  }

  const user = userData?.data || userData;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className=" px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Manage your personal information
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link href="/dashboard/profile/change-password">
              <Button variant="outline" className="flex items-center gap-2 border-black dark:border-white">
                <Shield className="w-4 h-4" />
                Change Password
              </Button>
            </Link>
            <Button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="Avatar"
                        width={120}
                        height={120}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover"
                      />
                    ) : (
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                        <User className="w-12 h-12 sm:w-14 sm:h-14 text-gray-400 dark:text-gray-600" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl text-center">
                    {user?.name || "Your Name"}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                    {user?.email || "your.email@example.com"}
                  </p>
                  {user?.role && (
                    <Badge variant="outline" className="mt-2 border-black dark:border-white">
                      {user.role}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {user?.bio && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
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
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                    <p className="text-base mt-1">
                      {user?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                    <div className="flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <p className="text-base">
                        {user?.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
                    <p className="text-base mt-1">
                      {user?.username || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                    <div className="flex items-center mt-1">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <p className="text-base">
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <p className="text-base">
                        {user?.location || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</label>
                    <div className="flex items-center mt-1">
                      <Globe className="w-4 h-4 mr-2 text-gray-400" />
                      {user?.website ? (
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-base underline"
                        >
                          {user.website}
                        </a>
                      ) : (
                        <p className="text-base">Not provided</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</label>
                    <div className="flex items-center mt-1">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      <p className="text-base">
                        {user?.company || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Title</label>
                    <p className="text-base mt-1">
                      {user?.jobTitle || "Not provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio Card */}
            {user?.bio && (
              <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Edit3 className="w-5 h-5" />
                    About
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
              <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
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
                        className="flex items-center gap-2 text-sm underline"
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