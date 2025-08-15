"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Menu,
  X,
  User,
  Users,
  Bookmark,
  MessageCircleDashed,
  LayoutDashboardIcon,
} from "lucide-react";
import { CgPassword } from "react-icons/cg";

import { useGetMeQuery, useLogoutMutation } from "@/app/redux/services/authApi";


const menuItems = [
  { icon: LayoutDashboardIcon, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Events", href: "/dashboard/events" },
  { icon: Bookmark, label: "Library", href: "/dashboard/library" },
  { icon: MessageCircleDashed, label: "Forum", href: "/dashboard/forum" },
  { icon: CgPassword, label: "Change Password", href: "/dashboard/change-password" },
];

export default function MemberSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, isError } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  


  // If failed to fetch user (token invalid), redirect
  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/login");
    }
  }, [isLoading, isError, router]);

  const handleLogout = async () => {
    await logout({});
    localStorage.removeItem("accessToken");
    router.push("/");
  };

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

      <div
        className={`
          bg-white border-r border-gray-200 h-screen flex flex-col 
          transition-all duration-300 ease-in-out w-64
          ${isMobileOpen ? "fixed top-0 left-0 z-50" : "hidden"}
          lg:fixed lg:top-0 lg:left-0 lg:z-40 lg:block
        `}
      >
        {/* Sidebar content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <User className="text-white" size={16} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-black">Member Panel</h1>
              <p className="text-xs text-gray-600">Welcome back!</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    group flex items-center px-3 py-2.5 rounded-lg transition space-x-3
                    ${isActive(item.href)
                      ? "bg-black text-white"
                      : "text-black hover:bg-black hover:text-white"}
                  `}
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
                  {user?.data?.name || "Member"}
                </p>
                <p className="text-xs text-gray-600 truncate">Member</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="
                flex items-center w-full px-3 py-2.5 rounded-lg transition
                border border-gray-200 hover:border-gray-300
                text-black hover:bg-black hover:text-white
                space-x-3
              "
            >
              <LogOut size={18} className="flex-shrink-0" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
