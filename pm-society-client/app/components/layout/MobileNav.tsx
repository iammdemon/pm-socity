import Link from "next/link";
import { Home, Calendar, BookOpen, Sparkles, Users } from "lucide-react";

const MobileNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-neutral-950 dark:border-neutral-800 z-50">
      <div className="flex justify-around items-center py-2">
        <Link href="/dashboard" className="flex flex-col items-center text-sm">
          <Home className="w-6 h-6" />
        </Link>


        <Link
          href="/dashboard/cohorts"
          className="flex flex-col items-center text-sm"
        >
          <Users className="w-6 h-6" />
        </Link>
        <Link
          href="/dashboard/sia"
          className="flex flex-col items-center text-sm"
        >
          <Sparkles className="w-6 h-6" />
        </Link>

        <Link
          href="/dashboard/events"
          className="flex flex-col items-center text-sm"
        >
          <Calendar className="w-6 h-6" />
        </Link>
        <Link
          href="/dashboard/resources"
          className="flex flex-col items-center text-sm"
        >
          <BookOpen className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
