"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LogOut,
  Menu,
  X,
  User,
  Users,
  Bookmark,
  MessageCircleDashed,
  LayoutDashboardIcon,
  Loader2,
} from "lucide-react";
import { CgPassword } from "react-icons/cg";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Types
interface User {
  name?: string;
  email?: string;
  role?: string;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface MemberSidebarProps {
  className?: string;
}

export default function MemberSidebar({ className }: MemberSidebarProps) {
  const { data: session, status } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  // Member menu configuration
  const memberMenu: MenuItem[] = [
    { icon: LayoutDashboardIcon, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Events", href: "/dashboard/events" },
    { icon: Bookmark, label: "Library", href: "/dashboard/library" },
    { icon: MessageCircleDashed, label: "Forum", href: "/dashboard/forum" },
    { icon: CgPassword, label: "Change Password", href: "/dashboard/change-password" },
  ];

  // Handle window resize for mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Redirect admin users to admin panel
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === "admin") {
      router.push("/admin");
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLogoutLoading(true);
      await signOut({ 
        callbackUrl: "/",
        redirect: true 
      });
      setIsMobileOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLogoutLoading(false);
    }
  };

  const isActive = (href: string) => pathname === href;

  // Loading state
  if (isLoading) {
    return (
      <MemberSidebarSkeleton 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />
    );
  }

  // Unauthorized state
  if (!isAuthenticated || user?.role === "admin") {
    return null;
  }

  return (
    <>
      {/* Mobile overlay */}
      <MobileOverlay 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />

      {/* Mobile toggle button */}
      <MobileToggleButton 
        isOpen={isMobileOpen}
        onToggle={() => setIsMobileOpen(!isMobileOpen)}
      />

      {/* Main Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300 w-64",
          isMobileOpen ? "" : "hidden lg:flex",
          className
        )}
      >
        {/* Header */}
        <SidebarHeader />

        {/* Navigation Menu */}
        <SidebarNavigation 
          menuItems={memberMenu}
          isActive={isActive}
          onLinkClick={() => setIsMobileOpen(false)}
        />

        {/* Footer */}
        <SidebarFooter 
          user={user as User | undefined}
          onLogout={handleLogout}
          isLoading={isLogoutLoading}
        />
      </aside>
    </>
  );
}

// Mobile Overlay Component
const MobileOverlay = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        onClick={onClose}
        aria-label="Close sidebar overlay"
      />
    )}
  </>
);

// Mobile Toggle Button Component
const MobileToggleButton = ({ 
  isOpen, 
  onToggle 
}: { 
  isOpen: boolean; 
  onToggle: () => void; 
}) => (
  <button
    onClick={onToggle}
    className="fixed top-4 left-4 z-50 lg:hidden bg-black text-white p-3 rounded-lg shadow-lg hover:bg-gray-900 transition-colors duration-200"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
);

// Sidebar Header Component
const SidebarHeader = () => (
  <header className="p-4 border-b border-gray-100 flex items-center space-x-3">
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
      <User className="text-white" size={16} />
    </div>
    <div>
      <h1 className="font-bold text-lg text-black">Member Panel</h1>
      <p className="text-xs text-gray-600">Welcome back!</p>
    </div>
  </header>
);

// Sidebar Navigation Component
const SidebarNavigation = ({
  menuItems,
  isActive,
  onLinkClick,
}: {
  menuItems: MenuItem[];
  isActive: (href: string) => boolean;
  onLinkClick: () => void;
}) => (
  <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
    {menuItems.map((item) => {
      const Icon = item.icon;
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            "group flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 space-x-3",
            isActive(item.href)
              ? "bg-black text-white shadow-sm"
              : "text-black hover:bg-black hover:text-white"
          )}
        >
          <Icon size={18} className="flex-shrink-0" />
          <span className="text-sm font-medium truncate">
            {item.label}
          </span>
        </Link>
      );
    })}
  </nav>
);

// Sidebar Footer Component
const SidebarFooter = ({
  user,
  onLogout,
  isLoading,
}: {
  user: User | undefined;
  onLogout: () => Promise<void>;
  isLoading?: boolean;
}) => (
  <footer className="p-4 border-t border-gray-100">
    {/* User Info */}
    <div className="flex items-center space-x-3 mb-3 p-2 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <User className="text-white" size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-black truncate">
          {user?.name || user?.email || "Member"}
        </p>
        <p className="text-xs text-gray-600 truncate">Member</p>
      </div>
    </div>

    {/* Logout Button */}
    <Button
      onClick={onLogout}
      disabled={isLoading}
      variant="outline"
      className="w-full justify-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
      size="sm"
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
      <span>{isLoading ? "Logging out..." : "Logout"}</span>
    </Button>
  </footer>
);

// Loading Skeleton Component
const MemberSidebarSkeleton = ({
  isMobileOpen,
  setIsMobileOpen,
}: {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}) => (
  <>
    {/* Mobile overlay */}
    <MobileOverlay 
      isOpen={isMobileOpen} 
      onClose={() => setIsMobileOpen(false)} 
    />

    {/* Mobile toggle button */}
    <MobileToggleButton 
      isOpen={isMobileOpen}
      onToggle={() => setIsMobileOpen(!isMobileOpen)}
    />

    {/* Skeleton Sidebar */}
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300 w-64",
        isMobileOpen ? "" : "hidden lg:flex"
      )}
    >
      {/* Header Skeleton */}
      <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Menu Skeleton */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center px-3 py-2.5 space-x-3">
            <Skeleton className="w-4 h-4 flex-shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </nav>

      {/* Footer Skeleton */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 mb-3 p-2 bg-gray-50 rounded-lg">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        <Skeleton className="w-full h-9 rounded-md" />
      </div>
    </aside>
  </>
);