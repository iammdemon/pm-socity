// DashSidebar.tsx
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

  GraduationCap,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navigation = [
  { name: "The Exchange", href: "/dashboard", icon: Home },
  { name: "Society Circles", href: "/dashboard/circles", icon: Users },
  { name: "SIA AI", href: "/dashboard/sia", icon: Sparkles },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
  { name: "Messages", href: "/dashboard/messages", icon: Mail },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
];

const profileMenuItems = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { 
    name: "PM Training", 
    href: "https://thepmsociety.pmtraining.com/partner-login", 
    icon: GraduationCap,
    external: true 
  },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const DashSidebar = () => {
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
    setIsProfileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileMenuItemClick = () => setIsProfileMenuOpen(false);

  return (
    <aside className="flex h-screen w-64 xl:w-72 flex-col bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800">
      {/* Logo - Bigger and centered */}
      <div className="p-3 flex justify-center">
        <Link href="/dashboard" className="inline-block">
          <div className="h-20 w-20 overflow-hidden">
            <Image
              src="/logo.png"
              alt="PM Society"
              width={80}
              height={80}
              className="object-contain dark:hidden"
            />
            <Image
              src="/logo-2.png"
              alt="PM Society"
              width={80}
              height={80}
              className="object-contain hidden dark:block"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-4 px-4 py-3 rounded-full transition-colors",
                isActive
                  ? "font-bold text-white dark:text-black bg-black dark:bg-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-6 h-6",
                    isActive ? "text-white dark:text-black" : ""
                  )}
                />
                {item.name === "Notifications" && notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </div>
              <span className="text-xl">{item.name}</span>
            </Link>
          );
        })}

        {/* More Options */}
        <Link
          href="#"
          className="flex items-center space-x-4 px-4 py-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        >
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-xl">More</span>
        </Link>
      </nav>

      {/* Profile Section */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-3 w-full p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="true"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={session?.user?.avatar || ""}
                alt={session?.user?.name || ""}
              />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                @{session?.user?.email?.split("@")[0] || "user"}
              </p>
            </div>
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-black rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
              <div className="py-2">
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    onClick={handleProfileMenuItemClick}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                ))}

                <div className="border-t border-gray-200 dark:border-gray-800 my-1" />
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dark mode</span>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        theme === "dark" ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 my-1" />
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="flex items-center w-full justify-start px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DashSidebar;