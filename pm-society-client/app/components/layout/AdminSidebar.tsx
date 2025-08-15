"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import { useGetMeQuery, useLogoutMutation } from "@/app/redux/services/authApi";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CgPassword } from "react-icons/cg";

export default function AdminSidebar() {
  const [logout] = useLogoutMutation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // fetch me with Authorization header automatically
  const { data: userData, isLoading } = useGetMeQuery(undefined, {
    skip: !accessToken,
  });



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

    useEffect(() => {
    if (!isLoading && userData && userData.data?.role !== "admin") {
      router.push("/");
    }
  }, [userData, isLoading, router]);

   const handleLogout = async () => {
    await logout({});
    localStorage.clear();
    router.push("/");
  };
  

  const adminMenu = [
    { icon: Home, label: "Dashboard", href: "/admin" },
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
      icon: CgPassword ,
      label: "Change Password",
      href: "/admin/change-password",
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-black text-white p-3 rounded-lg shadow-lg hover:bg-gray-900 transition"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300 w-64",
          isMobileOpen ? "" : "hidden lg:flex"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <User className="text-white" size={16} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-black">Admin Panel</h1>
            <p className="text-xs text-gray-600">Full Control</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminMenu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group flex items-center px-3 py-2.5 rounded-lg transition space-x-3",
                  isActive(item.href)
                    ? "bg-black text-white"
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <User className="text-white" size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">
                {userData?.data?.name}
              </p>
              <p className="text-xs text-gray-600 truncate">
                System Administrator
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-center space-x-3"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
}
