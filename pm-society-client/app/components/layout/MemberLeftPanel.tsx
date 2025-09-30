"use client";

import { JSX, useState, useEffect, useCallback, memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Search,
  BookOpen,
  MessageCircle,
  Heart,
  
  Trophy,
  Clock,

  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

// ---------- Types ----------
interface ProgressModule {
  name: string;
  progress: number;
  color: string;
  status: "completed" | "in-progress" | "upcoming";
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface RecentSearch {
  query: string;
  trending: boolean;
  category: string;
  resultCount?: number;
}

interface ActivityItem {
  icon: JSX.Element;
  text: string;
  time: string;
  color: string;
  type: "enrollment" | "engagement" | "achievement" | "search";
  badge?: string;
}

interface PanelProps {
  className?: string;
}

// ---------- Data ----------
const progressData = [
  { name: "Completed", value: 75 },
  { name: "Remaining", value: 25 },
];

const COLORS = ["#1DB954", "#191414"];
const HOVER_COLORS = ["#1ed760", "#2a2a2a"];

const recentSearches: RecentSearch[] = [
  {
    query: "Agile Training",
    trending: true,
    category: "Course",
    resultCount: 12,
  },
  {
    query: "Leadership Workshop",
    trending: false,
    category: "Workshop",
    resultCount: 8,
  },
  {
    query: "Data Strategy",
    trending: true,
    category: "Strategy",
    resultCount: 15,
  },
  {
    query: "Product Roadmaps",
    trending: false,
    category: "Framework",
    resultCount: 6,
  },
  {
    query: "User Research",
    trending: true,
    category: "Method",
    resultCount: 23,
  },
];

const activity: ActivityItem[] = [
  {
    icon: <BookOpen className="w-4 h-4" />,
    text: "Enrolled in 'Agile Foundations'",
    time: "2h ago",
    color: "text-green-400",
    type: "enrollment",
    badge: "New",
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    text: "Commented on Leadership post",
    time: "4h ago",
    color: "text-blue-400",
    type: "engagement",
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    text: "Completed 'Design Thinking' module",
    time: "1d ago",
    color: "text-yellow-400",
    type: "achievement",
    badge: "Achievement",
  },
  {
    icon: <Heart className="w-4 h-4" />,
    text: "Liked 'Product Strategy Guide'",
    time: "1d ago",
    color: "text-pink-400",
    type: "engagement",
  },
  {
    icon: <Search className="w-4 h-4" />,
    text: "Searched 'Design Thinking'",
    time: "2d ago",
    color: "text-gray-400",
    type: "search",
  },
];

// ---------- Components ----------
const LogoHeader = memo(() => (
  <header className="flex items-center justify-center p-2" role="banner">
    <Image
      src="/logo-2.png"
      alt="The PM Society Logo"
      width={50}
      height={50}
      priority
    />
  </header>
));

LogoHeader.displayName = "LogoHeader";
 
const ScrollContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar"
    role="main"
    tabIndex={0}
    aria-label="Main content area" 
  >
    {children}
  </div>
);

const ProgressTracker = ({ expanded, toggleExpanded, hovering, onHover } : { expanded: boolean, toggleExpanded: () => void, hovering: boolean, onHover: (hovering: boolean) => void }) => {
  const modules: ProgressModule[] = [
    {
      name: "Fundamentals",
      progress: 100,
      color: "bg-green-400",
      status: "completed",
      difficulty: "beginner",
    },
    {
      name: "Advanced Topics",
      progress: 80,
      color: "bg-blue-400",
      status: "in-progress",
      difficulty: "intermediate",
    },
    {
      name: "Case Studies",
      progress: 60,
      color: "bg-yellow-400",
      status: "in-progress",
      difficulty: "intermediate",
    },
    {
      name: "Final Project",
      progress: 20,
      color: "bg-gray-600",
      status: "upcoming",
      difficulty: "advanced",
    },
  ];

  const getDifficultyIcon = (difficulty: ProgressModule["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "●";
      case "intermediate":
        return "●●";
      case "advanced":
        return "●●●";
    }
  };

  const getStatusColor = (status: ProgressModule["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in-progress":
        return "text-yellow-400";
      case "upcoming":
        return "text-gray-500";
    }
  };

  return (
    <section
      className="group"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      aria-labelledby="progress-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          id="progress-heading"
          className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors flex items-center gap-2"
        >
          <Trophy className="w-4 h-4 text-yellow-400" />
          My Journey
        </h2>
        <button
          onClick={toggleExpanded}
          className="text-gray-400 hover:text-white transition-all duration-200 p-1 rounded-lg hover:bg-gray-800/50"
          aria-expanded={expanded}
          aria-label={
            expanded ? "Collapse progress details" : "Expand progress details"
          }
        >
          <ChevronRight
            className={`w-4 h-4 transform transition-transform duration-300 ${
              expanded ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm group-hover:border-green-400/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-400/10">
        <div className="flex flex-col items-center">
          <div className="relative">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  innerRadius={35}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                  animationDuration={1000}
                  animationBegin={0}
                >
                  {progressData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={hovering ? HOVER_COLORS[index] : COLORS[index]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-bold text-green-400 block">
                  75%
                </span>
                <span className="text-xs text-gray-400">Complete</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-white">Course Progress</p>
            <p className="text-xs text-gray-400 flex items-center gap-1 justify-center mt-1">
              <Clock className="w-3 h-3" />3 of 4 modules completed
            </p>
          </div>

          {expanded && (
            <div className="mt-6 space-y-4 w-full animate-in slide-in-from-top-2 duration-300">
              {modules.map((module, i) => (
                <div
                  key={i}
                  className="space-y-2 p-3 rounded-lg bg-gray-800/20 hover:bg-gray-800/40 transition-colors"
                >
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 font-medium">
                        {module.name}
                      </span>
                      <span
                        className={`${getStatusColor(module.status)} text-xs`}
                      >
                        {getDifficultyIcon(module.difficulty)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={getStatusColor(module.status)}>
                        {module.status === "completed"
                          ? "✓"
                          : module.status === "in-progress"
                          ? "⏳"
                          : "⭕"}
                      </span>
                      <span className="text-gray-400">{module.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${module.color} h-2 rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
                      style={{ width: `${module.progress}%` }}
                    >
                      {module.status === "in-progress" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const QuickAccess = () => (
  <section aria-labelledby="quick-access-heading">
    <div className="flex items-center gap-2 mb-4">
      <h2
        id="quick-access-heading"
        className="text-sm font-semibold text-gray-300"
      >
        Quick Access
      </h2>
      <TrendingUp className="w-4 h-4 text-green-400" />
    </div>
    <div className="space-y-2" role="list">
      {recentSearches.map((item, i) => (
        <div
          key={i}
          className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-700/50"
          role="listitem"
          tabIndex={0}
          aria-label={`Search for ${item.query} in ${item.category}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              // Handle search action
            }
          }}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Search className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors block truncate">
                {item.query}
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                {item.category} • {item.resultCount} results
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {item.trending && (
              <div className="flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Hot</span>
              </div>
            )}
            <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
          </div>
        </div>
      ))}
    </div>
  </section>
)

const ActivitySection = memo(
  () => (
    <section aria-labelledby="activity-heading">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="activity-heading"
          className="text-sm font-semibold text-gray-300 flex items-center gap-2"
        >
          <Clock className="w-4 h-4 text-blue-400" />
          Recent Activity
        </h2>
      </div>
      <div className="space-y-3" role="list">
        {activity.map((item, i) => (
          <div
            key={i}
            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-800/30 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-black/10"
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                // Handle activity item action
              }
            }}
          >
            <div
              className={`${item.color} p-2 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 transition-all duration-200 group-hover:scale-110 relative overflow-hidden`}
            >
              {item.icon}
              {item.type === "achievement" && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2 flex-1">
                  {item.text}
                </p>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      item.badge === "New"
                        ? "bg-green-400/10 text-green-400"
                        : item.badge === "Achievement"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-gray-600/10 text-gray-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-gray-500">{item.time}</p>
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
                <p className="text-xs text-gray-500 capitalize">{item.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
);

ActivitySection.displayName = "ActivitySection";

const Footer =() => (
  <footer className="p-4 border-t border-gray-800/50 backdrop-blur-sm relative z-10">
    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse text-center" />
      <span>Track your growth and milestones</span>
    </div>
  </footer>
)

// ---------- Main Component ----------
export default function MemberLeftPanel({ className = "" }: PanelProps) {
  const [open, setOpen] = useState(false);
  const [progressExpanded, setProgressExpanded] = useState(false);
  
  const [hovering, setHovering] = useState(false);

  // Auto-close drawer on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const toggleExpanded = useCallback(() => {
    setProgressExpanded((prev) => !prev);
  }, []);



  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const panelContent = (
    <div className="h-full bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl animate-pulse animation-delay-1000" />

      <LogoHeader />
      <ScrollContainer>
        <ProgressTracker
          expanded={progressExpanded}
          toggleExpanded={toggleExpanded}
          hovering={hovering}
          onHover={setHovering}
        />
        <QuickAccess />
        <ActivitySection   />
      </ScrollContainer>
      <Footer />
    </div>
  );

  return (
    <div className={className}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-80 flex-shrink-0">
        {panelContent}
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={handleOpen}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50 shadow-lg shadow-black/25 hover:bg-gray-800/80 transition-all duration-200 hover:scale-105"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={handleClose}
          role="button"
          tabIndex={0}
          aria-label="Close navigation menu"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClose();
            }
          }}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {panelContent}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animate-in {
          animation: animate-in 0.3s ease-out forwards;
        }

        .fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        .slide-in-from-top-2 {
          animation: slide-in-from-top-2 0.3s ease-out forwards;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-from-top-2 {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
