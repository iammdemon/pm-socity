"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaCertificate, FaBook, FaBullseye, FaPlay } from "react-icons/fa";
import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

const reasons = [
  { title: "Your Path to Success", description: "We're more than training—we're a full ecosystem of support, strategy, and community.", icon: <FaUserTie className="h-6 w-6" /> },
  { title: "Pathway to Certification", description: "Live, instructor-led PMP training with expert guidance and real-world readiness.", icon: <FaCertificate className="h-6 w-6" /> },
  { title: "Project Management Mentorship", description: "1-on-1 guidance for aspiring and active project professionals building clarity, confidence, and experience.", icon: <FaBook className="h-6 w-6" /> },
  { title: "Society Membership", description: "Access peer matching, on-demand content, discussion forums, and a thriving community.", icon: <FaBullseye className="h-6 w-6" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const videoVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const WhyChoose: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <section id="why-choose" className="py-20 md:px-12">
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
              <span className="text-sm font-semibold uppercase tracking-wider">
                Why Choose TPMS
              </span>
              <h2 className={`mt-2 text-3xl font-bold text-black dark:text-white md:text-5xl ${bonVivant.className}`}>
                Your Path to PMP Success
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                We empower you with the skills, confidence, and resources to excel in project management, not just pass an exam.
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    {reason.icon}
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

          {/* Right: Improved Video Player */}
          <motion.div
            className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-xl"
            variants={videoVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Custom Play Button Overlay - Only shown before video starts */}
            {!hasStarted && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 cursor-pointer"
                onClick={() => setHasStarted(true)}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <motion.div
                  className="flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-2xl hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPlay className="w-8 h-8 text-blue-600 ml-1" />
                </motion.div>
              </motion.div>
            )}

            {/* YouTube Video Iframe */}
            <iframe
              src={`https://www.youtube.com/embed/8WTlff0TT_w?${hasStarted ? 'autoplay=1&mute=0' : 'mute=1'}&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="w-full h-full rounded-xl"
              frameBorder="0"
              allowFullScreen
              title="TPMS Training Video"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;