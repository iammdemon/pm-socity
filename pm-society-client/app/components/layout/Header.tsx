"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";

import { useLogoutMutation } from "@/app/redux/services/authApi";

const Header = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleLogout = async () => {
    await logout({});
    localStorage.removeItem("accessToken");
    setIsAuth(false);
  };

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 lg:px-20 py-2 z-50 transition-all duration-300 
            ${isScrolled ? "bg-[#ECE8E1]" : "bg-transparent"}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              {isScrolled ? (
                <Image src="/logo.png" alt="Logo" width={80} height={80} />
              ) : (
                <Image src="/logo-2.png" alt="Logo" width={80} height={80} />
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`font-medium hover:text-black transition-colors duration-200 relative text-black
                     
                  `}
                >
                  {item.name}
                  {pathname === item.path && (
                    <div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5  rounded-full text-black bg-black
                        `}
                    ></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA / Dashboard Button */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuth ? (
                // Authenticated user - show Dashboard button and user info
                <div className="flex items-center space-x-4">
                  <Link
                    href="/dashboard"
                    className="bg-black text-white font-medium px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-slasky-400/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleLogout}
                      className="bg-black text-white font-medium px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-slasky-400/25 transition-all duration-300 transform hover:scale-105"
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Non-authenticated user buttons
                <>
                  <Link
                    href="/login"
                    className="bg-black text-white hover:bg-white hover:text-black font-medium px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-slasky-400/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    href="/enroll"
                    className="bg-black text-white hover:bg-white hover:text-black font-medium px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-slasky-400/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 ${
                isScrolled ? "text-black" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4 bg-slate-900 p-4 rounded-md">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-white hover:text-sky-400 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {isAuth ? (
                  // Authenticated mobile menu - show Dashboard button
                  <div className="border-t border-gray-600 pt-4 mt-4 space-y-3">
                    <Link
                      href="/dashboard"
                      className="bg-black text-white px-6 py-2 rounded-full text-center w-fit block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Non-authenticated mobile menu
                  <>
                    <Link
                      href="/login"
                      className="bg-white text-black font-medium px-4 py-1 rounded-lg text-center w-fit"
                    >
                      Login
                    </Link>
                    <Link
                      href="/enroll"
                      className="bg-white text-black font-medium px-4 py-1 rounded-lg text-center w-fit"
                    >
                      Join Now
                    </Link>
                  </>
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
