"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";

import { useLogoutMutation } from "@/app/redux/services/authApi";

const Header = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole"); // Assuming role is stored in localStorage
    
    if (accessToken) {
      setIsAuth(true);
      setUserRole(role || "member"); // Default to member if no role found
    } else {
      setIsAuth(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = async () => {
    await logout({});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    setIsAuth(false);
    setUserRole(null);
  };

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    return userRole === "admin" ? "/admin" : "/dashboard";
  };

  const getDashboardText = () => {
    return userRole === "admin" ? "Admin Panel" : "Dashboard";
  };

  // Navigation items for non-authenticated users
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Connect", path: "/connect" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-20 py-2 z-50 transition-all duration-300 
            ${isScrolled ? "bg-[#ECE8E1]" : "bg-transparent"}
        `}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              {isScrolled ? (
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={60} 
                  height={60} 
                  className="sm:w-20 sm:h-20"
                />
              ) : (
                <Image 
                  src="/logo-2.png" 
                  alt="Logo" 
                  width={60} 
                  height={60} 
                  className="sm:w-20 sm:h-20"
                />
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`font-medium hover:text-black transition-colors duration-200 relative text-black text-sm xl:text-base
                     
                  `}
                >
                  {item.name}
                  {pathname === item.path && (
                    <div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full text-black bg-black
                        `}
                    ></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA / Dashboard Button */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {isAuth ? (
                // Authenticated user - show Dashboard/Admin button and user info
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <Link
                    href={getDashboardLink()}
                    className="bg-black text-white font-medium px-3 py-2 lg:px-6 rounded-lg hover:shadow-lg hover:shadow-black/25 transition-all duration-300 transform hover:scale-105 text-sm lg:text-base whitespace-nowrap"
                  >
                    {getDashboardText()}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-2 lg:px-6 rounded-lg hover:shadow-lg hover:shadow-red-400/25 transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Non-authenticated user buttons
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <Link
                    href="/login"
                    className="bg-black text-white hover:bg-white hover:text-black border border-black font-medium px-3 py-2 lg:px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
                  >
                    Login
                  </Link>
                  <Link
                    href="/enroll"
                    className="bg-black text-white hover:bg-white hover:text-black border border-black font-medium px-3 py-2 lg:px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg hover:bg-black/10 transition-colors duration-200 ${
                isScrolled ? "text-black" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col space-y-3 bg-slate-900/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`text-white hover:text-sky-400 transition-colors duration-200 py-2 px-2 rounded ${
                      pathname === item.path ? "bg-slate-800 text-sky-400" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {isAuth ? (
                  // Authenticated mobile menu - show Dashboard/Admin button
                  <div className="border-t border-gray-600 pt-4 mt-4 space-y-3">
                    <Link
                      href={getDashboardLink()}
                      className="bg-white text-black font-medium px-4 py-3 rounded-lg text-center block hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {getDashboardText()}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-3 rounded-lg w-full transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  // Non-authenticated mobile menu
                  <div className="border-t border-gray-600 pt-4 mt-4 space-y-3">
                    <Link
                      href="/login"
                      className="bg-white text-black font-medium px-4 py-3 rounded-lg text-center block hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/enroll"
                      className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-3 rounded-lg text-center block transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;