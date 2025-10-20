"use client";

import { useGetMeQuery } from "@/app/redux/services/authApi";
import Image from "next/image";
import {
  Check,
  TrendingUp,
  Settings,
  Camera,
  MapPin,
  Mail,
  Phone,
  Globe,
  Building,
  User,
  Key,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";
import Loading from "@/app/components/functions/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function MemberRightPanel() {
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery({});
  const router = useRouter();

  if (isUserLoading) {
    return <Loading />;
  }

  const user = userData?.data || userData;

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

  return (
    <aside className="hidden lg:flex h-screen lg:w-80  flex-shrink-0 bg-white dark:bg-black text-black dark:text-white flex-col border-l border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Profile Header */}
      <div className="relative h-56 w-full dark:bg-black bg-white">
        <div className="absolute top-4 right-4 flex gap-2">
          <ModeToggle />
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
                <Link
                  href={`/dashboard/profile/${user?.userName}`}
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
                className="flex items-center gap-2 cursor-pointer text-red-500 dark:text-red-400hover:bg-gray-100 dark:hover:bg-gray-800"
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
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl border-2 border-white dark:border-black object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-black flex items-center justify-center text-2xl font-bold text-black dark:text-white">
                  {user?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 dark:bg-white/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white dark:text-black" />
              </div>
              {user?.verified && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white dark:text-black" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold dark:text-white text-black">
                  {user?.name || "User"}
                </h2>
              </div>

              <p className="text-sm dark:text-white/80 text-black/80 truncate mt-1">
                {user?.role || "Member"}
              </p>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <div className="flex items-center gap-1 dark:bg-white/10 bg-black/10 px-3 py-1 rounded-full border border-white/20 dark:border-black/20">
                  <span className="text-sm dark:text-white text-black font-medium whitespace-nowrap">
                    {user?.title || "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-black">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-sm truncate">
                  {user?.email || "Not provided"}
                </p>
              </div>
            </div>

            {user?.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-sm truncate">{user.phone}</p>
                </div>
              </div>
            )}

            {user?.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="text-sm truncate">{user.location}</p>
                </div>
              </div>
            )}

            {user?.company && (
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Company
                  </p>
                  <p className="text-sm truncate">{user.company}</p>
                </div>
              </div>
            )}

            {user?.website && (
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Website
                  </p>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm truncate underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {user?.bio && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-black">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">About</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {user.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {user?.socialLinks && Object.keys(user.socialLinks).length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-black">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Social Links</h3>
              <div className="space-y-2">
                {Object.entries(user.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm underline"
                  >
                    <span className="capitalize">{platform}</span>
                  </a>
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
              {user?.createdAt
                ? format(new Date(user.createdAt), "MMM yyyy")
                : "Unknown"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
