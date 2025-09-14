"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  LogOut,
  Menu,
  X,
  User,
  Users,
  MessageCircleDashed,
  LayoutDashboardIcon,
  UploadCloud,
  CalendarDays,
  MessageCircleQuestion,
  Shield,
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

interface AdminSidebarProps {
  className?: string;
}

export default function AdminSidebar({ className }: AdminSidebarProps) {
  const { data: session, status } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

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

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Handle logout
  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: "/",
      redirect: true 
    });
    setIsMobileOpen(false);
  };

  // Admin menu configuration
  const adminMenu: MenuItem[] = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    {
      icon: MessageCircleQuestion,
      label: "Contact Submissions",
      href: "/admin/contact",
    },
    { icon: Users, label: "User Management", href: "/admin/users-management" },
    {
      icon: LayoutDashboardIcon,
      label: "Blog Management",
      href: "/admin/blogs-management",
    },
    {
      icon: CalendarDays,
      label: "Event Management",
      href: "/admin/events-management",
    },
    {
      icon: MessageCircleDashed,
      label: "Forum Management",
      href: "/admin/forum-management",
    },
    {
      icon: UploadCloud,
      label: "Resources Management",
      href: "/admin/resources-management",
    },
    {
      icon: CgPassword,
      label: "Change Password",
      href: "/admin/change-password",
    },
  ];

  const isActive = (href: string) => pathname === href;

  // Loading state
  if (isLoading) {
    return <AdminSidebarSkeleton isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
  }

  // Unauthorized state
  if (!isAuthenticated || user?.role !== "admin") {
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
          menuItems={adminMenu}
          isActive={isActive}
          onLinkClick={() => setIsMobileOpen(false)}
        />

        {/* Footer */}
        <SidebarFooter 
          user={user as User | undefined}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}

// Mobile Overlay Component
const MobileOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        onClick={onClose}
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
      <Shield className="text-white" size={16} />
    </div>
    <div>
      <h1 className="font-bold text-lg text-black">Admin Panel</h1>
      <p className="text-xs text-gray-600">System Management</p>
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
}: {
  user: User | undefined;
  onLogout: () => Promise<void>;
}) => (
  <footer className="p-4 border-t border-gray-100">
    {/* User Info */}
    <div className="flex items-center space-x-3 mb-3 p-2 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <User className="text-white" size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-black truncate">
          {user?.name || user?.email || "Admin"}
        </p>
        <p className="text-xs text-gray-600 truncate">
          System Administrator
        </p>
      </div>
    </div>

    {/* Logout Button */}
    <Button
      onClick={onLogout}
      variant="outline"
      className="w-full justify-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors duration-200"
      size="sm"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </Button>
  </footer>
);

// Loading Skeleton Component
const AdminSidebarSkeleton = ({
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
        {Array.from({ length: 8 }).map((_, index) => (
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
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="w-full h-9 rounded-md" />
      </div>
    </aside>
  </>
);