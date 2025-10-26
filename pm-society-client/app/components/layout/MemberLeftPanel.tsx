// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {

  BookOpen,
  Users,
  Video,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ---------- Types ----------
// interface ProgressModule {
//   name: string;
//   progress: number;
//   status: "completed" | "in-progress" | "upcoming";
// }

// interface NotificationItem {
//   id: string;
//   type: "mention" | "like" | "comment" | "follow" | "system";
//   text: string;
//   time: string;
//   read: boolean;
//   user?: {
//     name: string;
//   };
// }

interface PanelProps {
  className?: string;
}

// ---------- Data ----------
// const progressData = [
//   { name: "Completed", value: 75 },
//   { name: "Remaining", value: 25 },
// ];

// const modules: ProgressModule[] = [
//   { name: "PM Certification Course", progress: 100, status: "completed" },
//   { name: "Executive Coaching ", progress: 80, status: "in-progress" },
//   { name: "Resume", progress: 60, status: "in-progress" },
//   { name: "Completion Status", progress: 20, status: "upcoming" },
// ];

// const notifications: NotificationItem[] = [
//   {
//     id: "1",
//     type: "mention",
//     text: "Sarah Chen mentioned you",
//     time: "2m ago",
//     read: false,
//     user: { name: "Sarah Chen" },
//   },
//   {
//     id: "2",
//     type: "like",
//     text: "David Kim liked your post",
//     time: "15m ago",
//     read: false,
//     user: { name: "David Kim" },
//   },
//   {
//     id: "3",
//     type: "comment",
//     text: "Emma Wilson commented",
//     time: "1h ago",
//     read: true,
//     user: { name: "Emma Wilson" },
//   },
//   {
//     id: "4",
//     type: "follow",
//     text: "Marcus Rodriguez started following you",
//     time: "2h ago",
//     read: true,
//     user: { name: "Marcus Rodriguez" },
//   },
// ];

// ---------- Components ----------
const LogoHeader = () => (
  <div className="p-3 flex justify-center">
    <Link href="/dashboard" className="inline-block">
      <div className="h-20 w-20 overflow-hidden">
        <Image
          src="/logo.png"
          alt="PM Society"
          width={80}
          height={80}
          className="object-contain dark:hidden"
        />
        <Image
          src="/logo-2.png"
          alt="PM Society"
          width={80}
          height={80}
          className="object-contain hidden dark:block"
        />
      </div>
    </Link>
  </div>
);

LogoHeader.displayName = "LogoHeader";

// const ProgressSection = () => {
//   const completedCount = modules.filter((m) => m.status === "completed").length;
//   const inProgressCount = modules.filter(
//     (m) => m.status === "in-progress"
//   ).length;

//   return (
//     <section className="mb-6">
//       <div className="flex items-center justify-center mb-4">
//         <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
//           My Journey
//         </h2>
//       </div>

//       <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/50 shadow-xl relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

//         <div className="flex justify-center mb-6 relative">
//           <div className="relative">
//             <ResponsiveContainer width={120} height={120}>
//               <PieChart>
//                 <Pie
//                   data={progressData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={60}
//                   innerRadius={50}
//                   dataKey="value"
//                   startAngle={90}
//                   endAngle={-270}
//                   strokeWidth={0}
//                 >
//                   <Cell fill="#10b981" />
//                   <Cell className="dark:fill-gray-700" fill="#e5e7eb" />
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center">
//                 <span className="text-2xl font-bold text-green-500 block">
//                   75%
//                 </span>
//                 <span className="text-sm text-gray-500 dark:text-gray-400 px-2">
//                   Complete
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-3 mb-4">
//           {modules.map((module, i) => (
//             <div key={i} className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                   {module.name}
//                 </span>
//                 <span
//                   className={`text-xs font-medium ${
//                     module.status === "completed"
//                       ? "text-green-600 dark:text-green-400"
//                       : module.status === "in-progress"
//                       ? "text-blue-600 dark:text-blue-400"
//                       : "text-gray-500 dark:text-gray-400"
//                   }`}
//                 >
//                   {module.status === "completed"
//                     ? "✓"
//                     : module.status === "in-progress"
//                     ? "⏳"
//                     : "○"}{" "}
//                   {module.progress}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2">
//                 <div
//                   className={`h-2 rounded-full transition-all duration-700 ease-out relative overflow-hidden ${
//                     module.status === "completed"
//                       ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                       : module.status === "in-progress"
//                       ? "bg-gradient-to-r from-blue-500 to-purple-500"
//                       : "bg-gray-500"
//                   }`}
//                   style={{ width: `${module.progress}%` }}
//                 >
//                   {module.status === "in-progress" && (
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-evenly gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
//           <div className="text-center p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-600/20">
//             <div className="text-lg font-bold text-green-600 dark:text-green-400">
//               {completedCount}
//             </div>
//             <div className="text-xs text-gray-500 dark:text-gray-400">
//               Completed
//             </div>
//           </div>
//           <div className="text-center p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-600/20">
//             <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
//               {inProgressCount}
//             </div>
//             <div className="text-xs text-gray-500 dark:text-gray-400">
//               In Progress
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// ProgressSection.displayName = "ProgressSection";

const LearningResources = () => {
  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        The Learning Suite
      </h2>

      <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 shadow-xl">
        <div className="space-y-3">
          <Link
            href="https://thepmsociety.pmtraining.com/partner-login"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Training Pathway
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Practice Exams & On Demand Content
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
          </Link>

          <Link
            href="https://calendly.com/toni-merrill-thepmsociety/50-minute-coaching-session"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-600/20 dark:to-emerald-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Live Sessions
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Join instructor-led sessions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-green-500 transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

LearningResources.displayName = "LearningResources";

const MentorBooking = () => {
  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
       Society Success Sessions
      </h2>

      <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 shadow-xl">
        <div className="space-y-3">
          <Link
            href="https://calendly.com/olivia-mcglothen-thepmsociety/30min"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-600/20 dark:to-pink-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Olivia McGlothen
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Schedule a mentorship session
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
          </Link>
          <Link
            href="https://calendly.com/toni-merrill-thepmsociety/30min"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-600/20 dark:to-pink-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Toni Merrill
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                 Schedule a coaching session
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-600/20 dark:to-pink-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Alana Captain
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                 Schedule a resume consultation
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-600/20 dark:to-pink-600/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Erin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Schedule a resume consultation
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
};

MentorBooking.displayName = "MentorBooking";

// const NotificationsSection = () => {
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case "mention":
//         return <AtSign className="w-4 h-4 text-blue-500" />;
//       case "like":
//         return <Heart className="w-4 h-4 text-red-500" />;
//       case "comment":
//         return <MessageCircle className="w-4 h-4 text-green-500" />;
//       case "follow":
//         return <User className="w-4 h-4 text-purple-500" />;
//       default:
//         return <Bell className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   return (
//     <section className="mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
//           Notifications
//         </h2>
//         {unreadCount > 0 && (
//           <div className="relative">
//             <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full px-2 py-1">
//               {unreadCount}
//             </span>
//             <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//           </div>
//         )}
//       </div>

//       <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
//         {notifications.map((item, index) => (
//           <div
//             key={item.id}
//             className={`p-3 flex items-start gap-3 transition-all duration-200 cursor-pointer hover:bg-gray-100/70 dark:hover:bg-gray-700/50 ${
//               !item.read
//                 ? "bg-blue-50 dark:bg-blue-900/30 border-l-2 border-l-blue-500 dark:border-l-blue-600"
//                 : ""
//             } ${
//               index !== notifications.length - 1
//                 ? "border-b border-gray-200/50 dark:border-gray-700/50"
//                 : ""
//             }`}
//           >
//             <div
//               className={`relative p-2 rounded-xl ${
//                 !item.read
//                   ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
//                   : "bg-white dark:bg-gray-800"
//               }`}
//             >
//               {getNotificationIcon(item.type)}
//               {!item.read && (
//                 <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
//                 {item.text}
//                 {item.user && (
//                   <span className="font-medium"> {item.user.name}</span>
//                 )}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 {item.time}
//               </p>
//             </div>
//           </div>
//         ))}

//         <button className="w-full p-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100/70 dark:hover:bg-gray-700/50 transition-colors border-t border-gray-200/50 dark:border-gray-700/50">
//           View all notifications
//         </button>
//       </div>
//     </section>
//   );
// };

// NotificationsSection.displayName = "NotificationsSection";

// const QuickLinks = () => {
//   const quickLinks = [
//     { icon: <Search className="w-5 h-5" />, label: "Search", color: "from-blue-500 to-cyan-500" },
//     { icon: <TrendingUp className="w-5 h-5" />, label: "Trending", color: "from-green-500 to-emerald-500" },
//     { icon: <Sparkles className="w-5 h-5" />, label: "AI", color: "from-purple-500 to-pink-500" },
//   ];

//   return (
//     <section>
//       <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
//         <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
//         Quick Links
//       </h2>
//       <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-3 shadow-xl">
//         <div className="grid grid-cols-3 gap-3">
//           {quickLinks.map((link, i) => (
//             <button
//               key={i}
//               className="group flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/50 hover:scale-105"
//             >
//               <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 group-hover:scale-110 transition-transform duration-300">
//                 <div className="text-white">{link.icon}</div>
//               </div>
//               <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{link.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// QuickLinks.displayName = "QuickLinks";

// const ActivityCard = () => {
//   const activities = [
//     { icon: <Zap className="w-4 h-4" />, label: "Streak", value: "15 days", color: "from-yellow-500 to-orange-500" },
//     { icon: <Target className="w-4 h-4" />, label: "Goals", value: "8/10", color: "from-blue-500 to-purple-500" },
//     { icon: <Activity className="w-4 h-4" />, label: "Activity", value: "High", color: "from-green-500 to-emerald-500" },
//   ];

//   return (
//     <section>
//       <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
//         <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
//         Activity Stats
//       </h2>
//       <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 shadow-xl">
//         <div className="space-y-3">
//           {activities.map((activity, i) => (
//             <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-600/20">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
//                   <div className="text-white">{activity.icon}</div>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.label}</p>
//                 </div>
//               </div>
//               <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{activity.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ActivityCard.displayName = "ActivityCard";

// ---------- Main Component ----------
export default function MemberLeftPanel({ className = "" }: PanelProps) {
  const panelContent = (
    <div className="h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>

      <LogoHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10">
        {/* <ProgressSection /> */}
        <LearningResources />
        <MentorBooking />
        {/* <NotificationsSection /> */}
      </div>
    </div>
  );

  // Desktop: Always visible sidebar
  return (
    <div className={className}>
      <aside className={`hidden md:flex h-screen lg:w-80 flex-shrink-0`}>
        {panelContent}
      </aside>
    </div>
  );
}
