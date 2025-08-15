"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaHandsHelping } from "react-icons/fa";
import Image from "next/image";

import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

const services = [
  {
    title: "Coach",
    description:
      "Get personalized 1:1 support to help you plan, prepare, and succeed in your journey.",
    icon: <FaChalkboardTeacher className="h-8 w-8 dark:text-blue-400" />,
    image:
      "/image/coach.jpeg",
  },
  {
    title: "Mentor",
    description:
      "Partner with a seasoned PM for career guidance, real-world insight, and post-certification growth.",
    icon: <FaHandsHelping className="h-8 w-8 dark:text-blue-400" />,
    image:
      "/image/mentor.jpeg",
  },
];

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Card animation
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WhoWeHelp: React.FC = () => {
  return (
    <section id="who-we-help" className="py-20 md:px-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider">
            Who We Help
          </span>
          <h2
            className={`mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-5xl ${bonVivant.className}`}
          >
            Empowering Every Step of Your PM Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you&apos;re just getting started or leading at a senior level,
            TPMS offers personalized support, practical resources, and a
            community built for your growth.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} illustration`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeHelp;