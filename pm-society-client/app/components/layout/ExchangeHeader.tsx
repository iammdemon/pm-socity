"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  Users,
 
  Calendar,
  BookOpen,
 
  Search,
  LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";



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
  { name: "Society Circles", href: "/dashboard/circles", icon: Users },
  // { name: "SIA AI", href: "/dashboard/sia", icon: Sparkles },
  { name: "Upcoming Events", href: "/dashboard/events", icon: Calendar },
  { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
  
];

// Clean Search Bar with black/white styling
const SearchBar = () => (
  <div className="relative max-w-2xl w-full mx-auto">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
    <Input
      placeholder="Search members, posts, events, resources"
      className="w-full rounded-full pl-10 bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
    />
  </div>
);

// NavLink with black/white active and hover states
const NavLink: React.FC<NavLinkProps> = ({ item, isActive }) => (
  <Link
    href={item.href}
    className={`
      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${isActive
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}
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
    if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
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