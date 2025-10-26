"use client";

import Link from "next/link";
import Image from "next/image";
import {
  
  User,
  LogOut,
  Settings,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { SearchBar } from "./ExchangeHeader";

// Type definitions for better type safety
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string;
}

const MobileHeader = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  // const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Avoid SSR mismatch by not rendering until mounted
  if (!mounted) return null;

  // Handle search
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     router.push(
  //       `/dashboard/search?q=${encodeURIComponent(searchQuery.trim())}`
  //     );
  //     setSearchQuery("");
  //   }
  // };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsProfileMenuOpen(false);
    }
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
    <>
      <header className="lg:hidden sticky  top-0 left-0 right-0 z-50 border-b bg-white/95 dark:bg-neutral-950/95  dark:border-neutral-800/50">
        <div className="flex items-center justify-between max-w-7xl mx-auto p-1">
          {/* Logo */}
          <Link href="/dashboard" className="relative h-10 w-16">
            <Image
              src="/logo.png"
              alt="PM Society Light Logo"
              fill
              className="object-contain dark:hidden"
              sizes="(max-width: 768px) 64px, 64px"
              priority
            />
            <Image
              src="/logo-2.png"
              alt="PM Society Dark Logo"
              fill
              className="object-contain hidden dark:block"
              sizes="(max-width: 768px) 64px, 64px"
              priority
            />
          </Link>

          <SearchBar />

          {/* Right icons */}
          <div className="flex items-center space-x-1">
            <ModeToggle />
            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-1 p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                aria-label="Profile"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <Avatar className="h-7 w-7">
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
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
                      Edit Profile
                    </Link>
                    <Link
                      href="/dashboard/profile/change-password"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Change Password
                    </Link>

                    <Link
                      href="https://thepmsociety.pmtraining.com/partner-login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <GraduationCap className="w-4 h-4 mr-3" />
                      Training Pathway
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
          </div>
        </div>
      </header>
    </>
  );
};

export default MobileHeader;
