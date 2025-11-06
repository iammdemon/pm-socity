"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaCertificate,
  FaBook,
  FaBullseye,
  FaPlay,
} from "react-icons/fa";
import localFont from "next/font/local";
import Image from "next/image";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

const reasons = [
  {
    title: "Your Path to Success",
    description:
      "We're more than training—we're a full ecosystem of support, strategy, and community.",
    icon: <FaUserTie className="h-6 w-6" />,
  },
  {
    title: "Pathway to Certification",
    description:
      "Live, instructor-led PMP training with expert guidance and real-world readiness.",
    icon: <FaCertificate className="h-6 w-6" />,
  },
  {
    title: "Project Management Mentorship",
    description:
      "1-on-1 guidance for aspiring and active project professionals building clarity, confidence, and experience.",
    icon: <FaBook className="h-6 w-6" />,
  },
  {
    title: "Society Membership",
    description:
      "Access peer matching, on-demand content, discussion forums, and a thriving community.",
    icon: <FaBullseye className="h-6 w-6" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

const WhyChoose: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <section id="why-choose" className="py-20 md:px-12 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left: Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-full">
                Why Choose TPMS
              </span>
              <h2
                className={`mt-2 text-3xl font-bold text-black dark:text-white md:text-5xl ${bonVivant.className}`}
              >
                Your Path to PMP Success
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                We empower you with the skills, confidence, and resources to
                excel in project management, not just pass an exam.
              </p>
            </motion.div>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-900 dark:border-white group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <div className="text-gray-900 dark:text-white">
                      {reason.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Video */}
          <motion.div
            className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Cover image with play button */}
            {!hasStarted && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                onClick={() => setHasStarted(true)}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              >
                {/* Cover image */}
                <Image
                  src="/image/interview.webp"
                  width={1920}
                  height={1080}
                  alt="Video Cover"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Play button */}
                <motion.div
                  className="flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-2xl hover:bg-white transition-colors z-30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPlay className="w-8 h-8 text-gray-900 ml-1" />
                </motion.div>
              </motion.div>
            )}

            {/* YouTube iframe */}
            {hasStarted && (
              <iframe
                src={`https://www.youtube.com/embed/lW9UpM4T_po?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=1`}
                allow="autoplay; encrypted-media; picture-in-picture"
                className="w-full h-full rounded-xl"
                frameBorder="0"
                allowFullScreen
                title="Why Choose TPMS"
              />
            )}

            {/* Subtle overlay gradient for aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;