"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  User,
  Sparkles,
  Users,
  Calendar,
  BookOpen,
  Home,
  LogOut,
  Settings,
  ChevronDown,
  Bookmark,
  GraduationCap,
  SearchIcon,
} from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "The Exchange", href: "/dashboard", icon: Home },
  { name: "Society Circles", href: "/dashboard/circles", icon: Users },
  { name: "SIA AI", href: "/dashboard/sia", icon: Sparkles },
  { name: "Upcoming Events", href: "/dashboard/events", icon: Calendar },
  { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
];

const DashHeader = () => {
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const pathname = usePathname();

  // Mock notification count - in a real app, this would come from an API
  useEffect(() => {
    setNotificationCount(3);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
    setIsProfileMenuOpen(false);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 border-b border-gray-200/60 bg-white/95 backdrop-blur-md dark:bg-neutral-950/95 dark:border-neutral-800/60 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left - Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="relative h-12 w-20">
            <Image
              src="/logo.png"
              alt="PM Society Light Logo"
              fill
              className="object-contain dark:hidden transition-opacity duration-300"
            />
            <Image
              src="/logo-2.png"
              alt="PM Society Dark Logo"
              fill
              className="object-contain hidden dark:block transition-opacity duration-300"
            />
          </div>
          <div className="hidden xl:block">
            <span className=" font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-all duration-300">
              The PM Society
            </span>
          </div>
        </Link>

        {/* Middle - Navigation */}
        <nav className="hidden md:flex items-center space-x-1 mx-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center space-y-1 px-4 py-2 text-sm font-semibold transition-all duration-300 group",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                )}
              >
                <div className="relative">
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-all duration-300",
                      isActive
                        ? "opacity-100"
                        : "opacity-70 group-hover:opacity-100",
                      "group-hover:scale-110"
                    )}
                  />
                </div>
                <span className="whitespace-nowrap transform group-hover:-translate-y-0.5 transition-transform duration-300">
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Middle - Search (LinkedIn style expandable) */}
        <div className="flex-1 max-w-md px-4">
          <div
            className={cn(
              "flex items-center rounded-full border border-gray-300 dark:border-gray-700 transition-all duration-300 ease-out overflow-hidden",
              isSearchOpen
                ? "w-full px-3"
                : "w-10 justify-center cursor-pointer"
            )}
            onClick={() => setIsSearchOpen(true)}
          >
            <SearchIcon className="w-5 h-5 text-gray-500" />
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="ml-2 flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                onBlur={() => {
                  if (!searchInputRef.current?.value) {
                    setIsSearchOpen(false);
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-3 ml-6">
          {/* Notifications */}
          <Link
            href="#"
            className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group hover:scale-110"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.avatar || ""}
                  alt={session?.user?.name || ""}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-200 dark:border-neutral-700 overflow-hidden z-50">
                {/* Profile Header */}
                <div className="px-4 py-4 border-b border-gray-200 dark:border-neutral-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={session?.user?.avatar || ""}
                        alt={session?.user?.name || ""}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {session?.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {session?.user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  <Link
                    href="https://thepmsociety.pmtraining.com/partner-login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <GraduationCap className="w-4 h-4 mr-3" />
                    PM Training
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Bookmark className="w-4 h-4 mr-3" />
                    Bookmarks
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>

                  <div className="border-t border-gray-200 dark:border-neutral-700 my-2"></div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="flex items-center w-full justify-start px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
