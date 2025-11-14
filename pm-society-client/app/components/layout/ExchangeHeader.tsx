"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  BookOpen,
  Search,
  LucideIcon,
  Sparkles,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavLinkProps {
  item: NavigationItem;
  isActive: boolean;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "The Exchange", href: "/dashboard", icon: Home },
  { name: "Cohorts", href: "/dashboard/cohorts", icon: Users },

  { name: "SIA AI", href: "/dashboard/sia", icon: Sparkles },
  { name: "Upcoming Events", href: "/dashboard/events", icon: Calendar },
  { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
];

export const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="
        group relative flex items-center w-full max-w-3xl mx-auto
        px-2 sm:px-4 md:px-0
      "
    >
      {/* Input Field */}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search members, posts, events, or resources..."
        className="
          w-full rounded-full pl-12 pr-20 py-3 sm:py-3.5
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          border border-transparent
          focus:border-gray-300 dark:focus:border-gray-700
          focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500
          shadow-sm transition-all duration-200
          text-sm sm:text-base
        "
      />

      {/* Search Icon on Left */}
      <Search
        onClick={handleSearch}
        className="
          absolute right-4 top-1/2 -translate-y-1/2 
          h-5 w-5 sm:h-5 sm:w-5 
          text-gray-500 dark:text-gray-400
          group-hover:text-gray-700 dark:group-hover:text-gray-300
          transition-colors
        "
      />
    </div>
  );
};

// NavLink with black/white active and hover states
const NavLink: React.FC<NavLinkProps> = ({ item, isActive }) => (
  <Link
    href={item.href}
    className={`
      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${
        isActive
          ? "bg-green-500 text-white  dark:text-black"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }
    `}
  >
    <item.icon className="h-4 w-4" />
    <span className=" hidden xl:block">{item.name}</span>
  </Link>
);

// Main Header Component
const ExchangeHeader: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/dashboard")
      return pathname === "/dashboard" || pathname === "/";
    return pathname === href;
  };

  return (
    <header className="hidden md:block sticky top-0 z-20 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      {/* Search Section */}
      <div className="w-full px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Navigation Section */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-0.5">
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExchangeHeader;
