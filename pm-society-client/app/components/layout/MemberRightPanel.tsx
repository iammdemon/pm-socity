"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  User,
  Edit3,
  Users,
  ChevronRight,
  ChevronLeft,
  Flame,
  Plus,
  Check,
  Calendar,
  TrendingUp,
  Crown,
  ExternalLink,
  Settings,
  Camera,
  X,
  Save,
} from "lucide-react";
import { useSession } from "next-auth/react";

// ---------- Types ----------
interface Member {
  id: number;
  name: string;
  role: string;
  img: string;
  linked: boolean;
  members: number;
  verified?: boolean;
  badges?: string[];
}

interface Goal {
  id: number;
  title: string;
  deadline: string;
  progress: number;
  category: "certification" | "skill" | "project";
  priority: "high" | "medium" | "low";
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
}

const goals: Goal[] = [
  {
    id: 1,
    title: "Pass PMP Certification",
    deadline: "October 2025",
    progress: 75,
    category: "certification",
    priority: "high",
  },
  {
    id: 2,
    title: "Lead Agile Transformation Workshop",
    deadline: "December 2025",
    progress: 35,
    category: "skill",
    priority: "medium",
  },
  {
    id: 3,
    title: "Publish PM Best Practices Guide",
    deadline: "March 2026",
    progress: 15,
    category: "project",
    priority: "high",
  },
];

const interests = [
  "Agile",
  "Leadership",
  "ERP",
  "Design Thinking",
  "Scrum",
  "Digital Transformation",
  "Team Management",
  "Process Optimization",
  "AI/ML",
  "Data Analytics",
];

const badges: Badge[] = [
  { id: "1", name: "Agile Master", icon: "🚀", rarity: "epic", earned: true },
  {
    id: "2",
    name: "Leadership Guru",
    icon: "👑",
    rarity: "legendary",
    earned: true,
  },
  {
    id: "3",
    name: "Top Contributor",
    icon: "⭐",
    rarity: "rare",
    earned: true,
  },
  {
    id: "4",
    name: "Community Builder",
    icon: "🤝",
    rarity: "epic",
    earned: true,
  },
  {
    id: "5",
    name: "Knowledge Sharer",
    icon: "📚",
    rarity: "rare",
    earned: false,
  },
];

const innerCircleMembers: Member[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Agile Coach",
    img: "/avatar1.png",
    linked: true,
    members: 487,
    verified: true,
    badges: ["Leadership", "Agile Expert"],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Product Strategy Lead",
    img: "/avatar2.png",
    linked: false,
    members: 312,
    verified: true,
    badges: ["Innovation", "Strategy"],
  },
  {
    id: 3,
    name: "David Kim",
    role: "Scrum Master",
    img: "/avatar3.png",
    linked: true,
    members: 623,
    verified: false,
    badges: ["Scrum", "Team Building"],
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Digital Transformation",
    img: "/avatar4.png",
    linked: false,
    members: 201,
    verified: true,
    badges: ["Digital", "Change Management"],
  },
  {
    id: 5,
    name: "James Park",
    role: "Enterprise Architect",
    img: "/avatar5.png",
    linked: true,
    members: 398,
    verified: true,
    badges: ["Architecture", "Strategy"],
  },
  {
    id: 6,
    name: "Lisa Chang",
    role: "UX Research Lead",
    img: "/avatar6.png",
    linked: false,
    members: 275,
    verified: false,
    badges: ["UX", "Research"],
  },
];

// ---------- Utility Functions ----------
const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "from-yellow-400 to-amber-500";
    case "epic":
      return "from-purple-400 to-pink-500";
    case "rare":
      return "from-blue-400 to-cyan-500";
    default:
      return "from-gray-400 to-gray-500";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "border-red-500/30 bg-red-500/10";
    case "medium":
      return "border-yellow-500/30 bg-yellow-500/10";
    case "low":
      return "border-green-500/30 bg-green-500/10";
    default:
      return "border-slate-500/30 bg-slate-500/10";
  }
};

const getPriorityTextColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-300";
    case "medium":
      return "text-yellow-300";
    case "low":
      return "text-green-300";
    default:
      return "text-slate-300";
  }
};

// ---------- Components ----------
const StatCard = ({
  icon: Icon,
  value,
  label,
  gradient,
  className = "",
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  gradient: string;
  className?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-3 sm:p-4 text-center group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 ${className}`}
  >
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative z-10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-white drop-shadow-lg" />
      <div className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-white/90 drop-shadow-sm">
        {label}
      </div>
    </div>
  </div>
);

const GoalCard = ({
  goal,
}: {
  goal: Goal;
  onUpdate: (id: number, progress: number) => void;
}) => (
  <div
    className={`group relative overflow-hidden rounded-xl border ${getPriorityColor(
      goal.priority
    )} backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/20 hover:scale-[1.02] hover:shadow-lg`}
  >
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors truncate">
            {goal.title}
          </h4>
          <div className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className="text-xs">{goal.deadline}</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(
                goal.priority
              )} ${getPriorityTextColor(goal.priority)} border`}
            >
              {goal.priority}
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-lg font-bold text-blue-400">
            {goal.progress}%
          </div>
          <div className="text-xs text-slate-500">Complete</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{goal.progress}/100</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out shadow-lg shadow-blue-500/30"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

const MemberCard = ({
  member,
  onToggleLink,
}: {
  member: Member;
  onToggleLink: (id: number) => void;
}) => (
  <div className="group min-w-[140px] sm:min-w-[160px] bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 sm:p-4 text-center hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm hover:shadow-lg">
    <div className="relative mb-3">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-0.5 shadow-xl">
        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold text-sm">
          {member.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      </div>
      {member.verified && (
        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
        </div>
      )}
    </div>

    <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-blue-300 transition-colors truncate">
      {member.name}
    </h4>
    <p className="text-slate-400 text-xs mb-1 truncate">{member.role}</p>
    <p className="text-slate-500 text-xs mb-3">{member.members} connections</p>

    {member.badges && (
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {member.badges.slice(0, 2).map((badge) => (
          <span
            key={badge}
            className="px-2 py-0.5 bg-slate-700/50 text-xs rounded-full text-slate-300 truncate max-w-full"
          >
            {badge}
          </span>
        ))}
      </div>
    )}

    <button
      onClick={() => onToggleLink(member.id)}
      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
        member.linked
          ? "bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
          : "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
      }`}
    >
      {member.linked ? "Linked ✓" : "Link"}
    </button>
  </div>
);

// ---------- Main Component ----------
export default function MemberRightPanel() {
  const [circle, setCircle] = useState<Member[]>(innerCircleMembers);
  const [goalsList, setGoalsList] = useState<Goal[]>(goals);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(
    "I'm a passionate project manager with over 10 years of experience in leading cross-functional teams to deliver complex projects on time and within budget. I specialize in Agile methodologies and love fostering collaboration and innovation."
  );
  const [isScrollable, setIsScrollable] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSession();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleLink = useCallback((id: number) => {
    setCircle((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, linked: !member.linked } : member
      )
    );
  }, []);

  const updateGoalProgress = useCallback((id: number, progress: number) => {
    setGoalsList((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, progress } : goal))
    );
  }, []);

  const scrollLeft = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  }, []);

  const saveBio = useCallback(() => {
    setEditingBio(false);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const checkScrollable = () => {
        setIsScrollable(container.scrollWidth > container.clientWidth);
      };
      checkScrollable();
      window.addEventListener("resize", checkScrollable);
      return () => window.removeEventListener("resize", checkScrollable);
    }
  }, [circle]);

  const linkedCount = circle.filter((m) => m.linked).length;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg text-white"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <User className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Profile Panel */}
      <aside
        className={`
    fixed lg:static top-0 right-0 h-screen 
    w-full sm:w-80 lg:w-96 flex-shrink-0
    bg-gradient-to-b from-slate-900 via-slate-950 to-black 
    text-white border-l border-slate-800
    backdrop-blur-2xl shadow-2xl
    transform transition-all duration-500 ease-in-out
    ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
  `}
      >
        {/* Enhanced Profile Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          {/* Settings Button */}
          <button className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10">
            <Settings className="w-5 h-5 text-white" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="flex items-end gap-3 sm:gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl sm:text-2xl font-bold shadow-2xl text-white">
                  {session.data?.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                {session.data?.user && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold mb-1 drop-shadow-lg truncate">
                  {session.data?.user?.name}
                </h2>
                <p className="text-sm text-white/80 mb-1 truncate">
                  Project Manager
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-yellow-400/30">
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    <span className="text-xs sm:text-sm text-yellow-100 font-medium whitespace-nowrap">
                      Best Employee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 custom-scrollbar">
          {/* Quick Stats */}
          <section className="grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard
              icon={Flame}
              value="45"
              label="Day Streak"
              gradient="from-orange-500 to-red-500"
            />
            <StatCard
              icon={Users}
              value={linkedCount}
              label="Connections"
              gradient="from-blue-500 to-purple-500"
            />
          </section>

          {/* Bio Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                About Me
              </h3>
              <button
                onClick={() => setEditingBio(!editingBio)}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {editingBio ? (
              <div className="space-y-3">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-sm text-sm"
                  rows={4}
                  placeholder="Tell the community about yourself..."
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setEditingBio(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveBio}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-300 leading-relaxed bg-slate-800/30 border border-slate-700/30 p-4 rounded-xl backdrop-blur-sm text-sm">
                {bio}
              </p>
            )}
          </section>

          {/* Goals Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                My Goals
              </h3>
              <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {goalsList.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={updateGoalProgress}
                />
              ))}
            </div>
          </section>

          {/* Inner Circle Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                My Inner Circle
              </h3>
              <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                View all
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {session.data?.user?.name?.split(" ")[0]}&apos;s Inner Circle —{" "}
                {linkedCount} of {circle.length} Linked
              </span>
            </p>

            <div className="relative">
              {isScrollable && (
                <>
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg backdrop-blur-sm hover:scale-110"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg backdrop-blur-sm hover:scale-110"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div
                ref={scrollContainerRef}
                className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-2 px-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {circle.length === 0 ? (
                  <div className="w-full text-center py-12 text-slate-500 bg-slate-800/20 rounded-xl border-2 border-dashed border-slate-600/30">
                    <Users className="w-8 h-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No suggestions yet.</p>
                    <p className="text-xs mt-1">
                      Join Society Circles to expand your Inner Circle.
                    </p>
                  </div>
                ) : (
                  circle.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onToggleLink={toggleLink}
                    />
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Interests Section */}
          <section>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
              Interests & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  className="bg-slate-800/30 hover:bg-gradient-to-r hover:from-blue-600/80 hover:to-purple-600/80 border border-slate-600/30 hover:border-transparent text-slate-300 hover:text-white px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                >
                  {interest}
                </button>
              ))}
            </div>
          </section>

          {/* Badges Section */}
          <section>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {badges
                .filter((b) => b.earned)
                .map((badge) => (
                  <div
                    key={badge.id}
                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getRarityColor(
                      badge.rarity
                    )} p-3 text-center group hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                      <div className="text-xl sm:text-2xl mb-1">
                        {badge.icon}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white drop-shadow-lg truncate">
                        {badge.name}
                      </div>
                      <div className="text-xs text-white/80 capitalize">
                        {badge.rarity}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>

        {/* Enhanced Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
            <span className="truncate">
              Showcase your profile, goals, and Inner Circle
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
              <span className="whitespace-nowrap">
                Member since {session.data?.user?.createdAt?.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </aside>

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
    </>
  );
}
