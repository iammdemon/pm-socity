"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LuMenu, LuX } from "react-icons/lu";
import { ModeToggle } from "./ModeToggle";

// Type definitions for better type safety
type UserRole = "admin" | "user" | undefined;
type NavItem = {
  name: string;
  path: string;
  ariaLabel?: string;
};

// Configuration constants - easy to modify without touching component logic
const SCROLL_THRESHOLD = 50;
const LOGO_SIZES = {
  default: { width: 60, height: 60 },
  sm: { width: 64, height: 64 },
  md: { width: 80, height: 80 },
};

const HEADER_CLASSES = {
  base: "fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-20 py-2 z-50 transition-all duration-300",
  scrolled: "bg-[#ECE8E1] dark:bg-gray-900 shadow-md backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95",
  transparent: "bg-transparent",
};

const NAV_LINK_CLASSES = {
  base: "font-medium transition-all duration-200 relative text-sm md:text-base",
  scrolled: "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white",
  transparent: "text-white dark:text-white hover:text-gray-200 dark:hover:text-gray-300",
  active: "font-semibold",
};

const BUTTON_CLASSES = {
  base: "font-medium px-3 py-2 lg:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base shadow-md hover:shadow-lg",
  primary: {
    scrolled: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200",
    transparent: "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  secondary: {
    scrolled: "text-black dark:text-white border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black",
    transparent: "text-white dark:text-white border-white dark:border-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-black dark:hover:text-white",
  },
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

// Navigation items configuration - easy to add/remove items
const NAV_ITEMS: NavItem[] = [
  { name: "Home", path: "/", ariaLabel: "Navigate to home page" },
  { name: "About", path: "/about", ariaLabel: "Navigate to about page" },
  { name: "Services", path: "/services", ariaLabel: "Navigate to services page" },
  { name: "Connect", path: "/connect", ariaLabel: "Navigate to connect page" },
  { name: "Blogs", path: "/blogs", ariaLabel: "Navigate to blogs page" },
];

// Custom hook for scroll handling with proper cleanup
const useScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // Add event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

// Custom hook for logout with error handling
const useLogout = () => {
  const handleLogout = useCallback(async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
      // In a real app, you might show a toast notification here
    }
  }, []);

  return handleLogout;
};

// Memoized component for navigation links to prevent unnecessary re-renders
const NavigationLinks = React.memo(
  ({
    items,
    pathname,
    isScrolled,
  }: {
    items: NavItem[];
    pathname: string;
    isScrolled: boolean;
  }) => (
    <nav className="hidden md:flex items-center space-x-3 lg:space-x-6 xl:space-x-8" aria-label="Main navigation">
      {items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`${NAV_LINK_CLASSES.base} ${
            isScrolled ? NAV_LINK_CLASSES.scrolled : NAV_LINK_CLASSES.transparent
          } ${pathname === item.path ? NAV_LINK_CLASSES.active : ""}`}
          aria-label={item.ariaLabel}
        >
          {item.name}
          {pathname === item.path && (
            <div
              className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                isScrolled ? "bg-black dark:bg-white" : "bg-white dark:bg-white"
              }`}
              aria-hidden="true"
            />
          )}
        </Link>
      ))}
    </nav>
  )
);

NavigationLinks.displayName = "NavigationLinks";

// Memoized component for authenticated user buttons
const AuthenticatedButtons = React.memo(
  ({
    userRole,
    handleLogout,
    isScrolled,
  }: {
    userRole: UserRole;
    handleLogout: () => Promise<void>;
    isScrolled: boolean;
  }) => {
    const dashboardLink = userRole === "admin" ? "/admin" : "/dashboard";
    const dashboardText = userRole === "admin" ? "Admin Panel" : "Dashboard";

    return (
      <div className="flex items-center space-x-2 lg:space-x-4">
        <Link
          href={dashboardLink}
          className={`${BUTTON_CLASSES.base} ${
            isScrolled ? BUTTON_CLASSES.primary.scrolled : BUTTON_CLASSES.primary.transparent
          }`}
          aria-label={`Navigate to ${dashboardText}`}
        >
          {dashboardText}
        </Link>
        <button
          onClick={handleLogout}
          className={`${BUTTON_CLASSES.base} ${BUTTON_CLASSES.danger}`}
          aria-label="Logout from your account"
        >
          Logout
        </button>
        <ModeToggle />
      </div>
    );
  }
);

AuthenticatedButtons.displayName = "AuthenticatedButtons";

// Memoized component for guest user buttons - NOW INCLUDES MODE TOGGLE
const GuestButtons = React.memo(({ isScrolled }: { isScrolled: boolean }) => (
  <div className="flex items-center space-x-2 lg:space-x-4">
    <Link
      href="/login"
      className={`${BUTTON_CLASSES.base} border ${
        isScrolled ? BUTTON_CLASSES.secondary.scrolled : BUTTON_CLASSES.secondary.transparent
      }`}
      aria-label="Navigate to login page"
    >
      Login
    </Link>
    <Link
      href="/enroll"
      className={`${BUTTON_CLASSES.base} ${
        isScrolled ? BUTTON_CLASSES.primary.scrolled : BUTTON_CLASSES.primary.transparent
      }`}
      aria-label="Navigate to enrollment page"
    >
      Join Now
    </Link>
    <ModeToggle />
  </div>
));

GuestButtons.displayName = "GuestButtons";

// Memoized component for mobile menu - NOW INCLUDES MODE TOGGLE
const MobileMenu = React.memo(
  ({
    navItems,
    pathname,
    isAuthenticated,
    isLoading,
    userRole,
    handleLogout,
    setIsMobileMenuOpen,
    isScrolled,
  }: {
    navItems: NavItem[];
    pathname: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    userRole: UserRole;
    handleLogout: () => Promise<void>;
    setIsMobileMenuOpen: (open: boolean) => void;
    isScrolled: boolean;
  }) => {
    const dashboardLink = userRole === "admin" ? "/admin" : "/dashboard";
    const dashboardText = userRole === "admin" ? "Admin Panel" : "Dashboard";

    return (
      <div className="md:hidden mt-4 animate-in slide-in-from-top-2 duration-300">
        <div
          className={`flex flex-col space-y-3 p-4 rounded-lg shadow-xl backdrop-blur-md ${
            isScrolled
              ? "bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-gray-200"
              : "bg-gray-900/95 dark:bg-black/95 text-white dark:text-gray-200"
          }`}
        >
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`py-2 px-3 rounded-md transition-all duration-200 ${
                  pathname === item.path
                    ? isScrolled
                      ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                      : "bg-gray-800 dark:bg-gray-700 font-semibold"
                    : isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "hover:bg-gray-800 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={item.ariaLabel}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div
            className={`border-t pt-4 mt-2 space-y-3 ${
              isScrolled ? "border-gray-200 dark:border-gray-700" : "border-gray-700 dark:border-gray-600"
            }`}
          >
            {/* Dark Mode Toggle - Available for all users */}
            <div className="flex items-center justify-center py-2">
              <span className="text-sm font-medium mr-3">Theme:</span>
              <ModeToggle />
            </div>

            {isLoading ? (
              <div className="space-y-3" aria-label="Loading user authentication status">
                <div
                  className={`w-full h-12 animate-pulse rounded-lg ${
                    isScrolled ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-700 dark:bg-gray-600"
                  }`}
                  aria-hidden="true"
                />
                <div
                  className={`w-full h-12 animate-pulse rounded-lg ${
                    isScrolled ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-700 dark:bg-gray-600"
                  }`}
                  aria-hidden="true"
                />
              </div>
            ) : isAuthenticated ? (
              <>
                <Link
                  href={dashboardLink}
                  className={`${BUTTON_CLASSES.base} text-center block ${
                    isScrolled
                      ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                      : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={`Navigate to ${dashboardText}`}
                >
                  {dashboardText}
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${BUTTON_CLASSES.base} ${BUTTON_CLASSES.danger} w-full`}
                  aria-label="Logout from your account"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`${BUTTON_CLASSES.base} border text-center block ${
                    isScrolled
                      ? "border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black"
                      : "border border-white dark:border-gray-400 text-white dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Navigate to login page"
                >
                  Login
                </Link>
                <Link
                  href="/enroll"
                  className={`${BUTTON_CLASSES.base} text-center block ${
                    isScrolled
                      ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                      : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Navigate to enrollment page"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

// Loading state component with proper accessibility
const LoadingState = React.memo(({ isScrolled }: { isScrolled: boolean }) => (
  <div className="flex items-center space-x-2 lg:space-x-4" aria-label="Loading user authentication status">
    <div
      className={`w-20 h-10 animate-pulse rounded-lg ${
        isScrolled ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-700"
      }`}
      aria-hidden="true"
    />
    <div
      className={`w-20 h-10 animate-pulse rounded-lg ${
        isScrolled ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-700"
      }`}
      aria-hidden="true"
    />
    <ModeToggle />
  </div>
));

LoadingState.displayName = "LoadingState";

// Main Header component
const Header = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isScrolled = useScrollEffect();
  const handleLogout = useLogout();

  // Memoize derived values to prevent unnecessary recalculations
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);
  const isLoading = useMemo(() => status === "loading", [status]);
  const userRole = useMemo(() => session?.user?.role as UserRole, [session?.user?.role]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`${HEADER_CLASSES.base} ${
          isScrolled ? HEADER_CLASSES.scrolled : HEADER_CLASSES.transparent
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
              aria-label="Navigate to home page"
            >
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={LOGO_SIZES.default.width}
                height={LOGO_SIZES.default.height}
                className="sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform hover:scale-105 dark:hidden"
                priority
                sizes="(max-width: 768px) 64px, 80px"
              />
                 <Image
                src="/logo-2.png"
                alt="Company Logo"
                width={LOGO_SIZES.default.width}
                height={LOGO_SIZES.default.height}
                className="sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform hover:scale-105 hidden dark:block"
                priority
                sizes="(max-width: 768px) 64px, 80px"
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationLinks items={NAV_ITEMS} pathname={pathname} isScrolled={isScrolled} />

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {isLoading ? (
                <LoadingState isScrolled={isScrolled} />
              ) : isAuthenticated ? (
                <AuthenticatedButtons
                  userRole={userRole}
                  handleLogout={handleLogout}
                  isScrolled={isScrolled}
                />
              ) : (
                <GuestButtons isScrolled={isScrolled} />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                isScrolled
                  ? "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                  : "text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <MobileMenu
              navItems={NAV_ITEMS}
              pathname={pathname}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              userRole={userRole}
              handleLogout={handleLogout}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isScrolled={isScrolled}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;