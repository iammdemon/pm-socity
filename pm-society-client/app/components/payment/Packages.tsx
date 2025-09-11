import { Package } from "@/types/package";

import {
  FiAward,
  FiBookOpen,
  FiSettings,
  FiTrendingUp,
  FiUser,
  FiUsers,
} from "react-icons/fi";
export const packages: Package[] = [
  // {
  //   id: "IGNITE",
  //   name: "IGNITE",
  //   tagline: "Spark Your PM Journey",
  //   description:
  //     "Explore project management & build a foundation. Perfect for career changers & aspiring PMs.",
  //   whoItsFor: "Career changers and aspiring project professionals",
  //   features: [
  //     "23-hour PMI-aligned CAPM® instruction",
  //     "2 Executive Coaching Sessions",
  //     "2 months access to PM learning materials",
  //     "2 months access to Society+ portal",
  //   ],
  //   pricing: { oneTime: 999 },
  //   icon: <FiAward className="w-8 h-8" />,
  //   color: "from-orange-500 to-red-500",
  //   gradient: "bg-gradient-to-br from-orange-50 to-red-50",
  // },
  // {
  //   id: "ELEVATE",
  //   name: "ELEVATE",
  //   tagline: "Rise to PMP Excellence",
  //   description:
  //     "Guide professionals through PMP certification, mentoring & leadership roles. For experienced PMs ready for growth.",
  //   whoItsFor:
  //     "Professionals with project experience ready for PMP certification",
  //   features: [
  //     "35 hours of virtual instructor-led PMP® training",
  //     "PMP application support",
  //     "3 executive coaching sessions",
  //     "2 months access to PM learning materials",
  //     "2 mentorship sessions",
  //     "2 months access to Society+ portal",
  //   ],
  //   pricing: { oneTime: 3500 },
  //   icon: <FiBookOpen className="w-8 h-8" />,
  //   color: "from-blue-500 to-purple-600",
  //   gradient: "bg-gradient-to-br from-blue-50 to-purple-50",
  // },
  // {
  //   id: "ASCEND",
  //   name: "ASCEND",
  //   tagline: "Master Advanced Leadership",
  //   description:
  //     "Bridge gap post-certification & build leadership. Ideal for certified PMs, team leads, future executives.",
  //   whoItsFor:
  //     "Certified PMs and experienced professionals growing into executive roles",
  //   features: [
  //     "PMI-ACP® or PMP® training ",
  //     "Advanced project management workshops",
  //     "5 executive coaching sessions",
  //     "5 project management mentorship sessions",
  //     "2 months access to PM learning materials",
  //     "Mastermind group access (peer accountability + strategy)",
  //     "6 months of Society+ portal access",
  //   ],
  //   pricing: { oneTime: 4500 },
  //   icon: <FiTrendingUp className="w-8 h-8" />,
  //   color: "from-purple-600 to-pink-600",
  //   gradient: "bg-gradient-to-br from-purple-50 to-pink-50",
  // },
  // {
  //   id: "THE_SOCIETY",
  //   name: "THE SOCIETY",
  //   tagline: "Your PM Community Hub",
  //   description:
  //     "Membership designed to keep project professionals connected, resourced, & growing.",
  //   whoItsFor:
  //     "Any project professional seeking ongoing learning and community",
  //   features: [
  //     "Growth Partner Matching",
  //     "Access to PM discussion forums",
  //     "PMBOK & Learning Library",
  //     "Blogs & community events",
  //     "On-demand content",
  //   ],
  //   pricing: { monthly: 49, yearly: 499 },
  //   icon: <FiUsers className="w-8 h-8" />,
  //   color: "from-green-500 to-teal-500",
  //   gradient: "bg-gradient-to-br from-green-50 to-teal-50",
  // },
  // {
  //   id: "THE_SOCIETY_PLUS",
  //   name: "THE SOCIETY+",
  //   tagline: "Premium PM Experience",
  //   description:
  //     "Enhanced membership with coaching and mentorship. For project professionals wanting monthly mentoring or coaching & deeper community.",
  //   whoItsFor: "Project professionals wanting premium support and development",
  //   features: [
  //     "1 Executive Coaching  or PM Mentorship session per month",
  //     "Growth Partner Matching",
  //     "Access to PM discussion forums",
  //     "PMBOK & Learning Library",
  //     "Blogs & community events",
  //     "On-demand content",
  //   ],
  //   pricing: { monthly: 89, yearly: 899 },
  //   icon: <FiUser className="w-8 h-8" />,
  //   color: "from-amber-500 to-orange-600",
  //   gradient: "bg-gradient-to-br from-amber-50 to-orange-50",
  // },
  // {
  //   id: "BUILD_YOUR_OWN_PATH",
  //   name: "BUILD YOUR OWN PATH",
  //   tagline: "Customized PM Coaching",
  //   description:
  //     "Coaching & PM support on your terms. Choose your focus: executive coaching, mentorship, communication, Agile/Scrum, or open topics.",
  //   whoItsFor:
  //     "Project professionals who want flexible coaching tailored to their needs",
  //   features: [
  //     "Executive Coaching",
  //     "Project Management Mentorship",
  //     "Leadership Communication Coaching",
  //     "Agile & Scrum Practice Deep Dives",
  //     "Open-Topic Sessions",
  //   ],
  //   pricing: { oneTime: 400 }, // 3 sessions for $400
  //   icon: <FiSettings className="w-8 h-8" />,
  //   color: "from-gray-600 to-indigo-600",
  //   gradient: "bg-gradient-to-br from-gray-50 to-indigo-50",
  // },
  {
    id: "ELEVATE_PILOT",
    name: "ELEVATE (Pilot Cohort)",
    tagline: "Special Pilot Pricing",
    description:
      "Guide professionals through PMP certification, mentoring & leadership roles. For experienced PMs ready for growth.",
    whoItsFor: "Professionals seeking PMP with pilot program pricing",
    features: [
      "35 hours of virtual instructor-led PMP® training",
      "PMP application support",
      "3 executive coaching sessions",
      "2 months access to PM learning materials",
      "2 mentorship sessions",
      "2 months access to Society+ portal",
    ],
    pricing: { oneTime: 558 },
    icon: <FiSettings className="w-8 h-8" />,
    color: "from-pink-500 to-red-500",
    gradient: "bg-gradient-to-br from-pink-50 to-red-50",
  },
];

