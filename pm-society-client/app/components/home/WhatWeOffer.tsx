"use client";
import { motion } from "framer-motion";
import { BiBookOpen, BiCheckCircle, BiGroup } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

const WhatWeOffer = () => {
  const offerings = [
    {
      title: "Live Virtual PMP Course",
      description:
        "Comprehensive certification preparation with expert instruction and built-in support.",
      features: [
        "35 hours of live instruction",
        "Covers PMBOK® + Agile practices",
        "Full-length practice exams included",
        "Interactive quizzes & templates",
        "Office hours & Q&A sessions",
        "Earn PMI-recognized Contact Hours",
      ],
      icon: <BiBookOpen className="h-8 w-8" />,
      badge: "Most Popular",
    },
    {
      title: "Executive Coaching & Mentorship",
      description:
        "Personalized support for your certification, career transition, and long-term growth.",
      features: [
        "Personalized 1:1 or group coaching",
        "Application & exam strategy help",
        "Career strategy for PM transition",
        "Long-term support into PM roles",
      ],
      icon: <FaUsers className="h-8 w-8" />,
      badge: "1:1 Support",
    },
    {
      title: "Society+ Membership",
      description:
        "Monthly membership for ongoing coaching, mentorship, and exclusive resources.",
      features: [
        "1 Executive Coaching  or PM Mentorship session per month",
        "Growth Partner Matching",
        "Access to PM discussion forums",
        "PMBOK & Learning Library",
        "Blogs & community events",
        "On-demand content",
      ],
      icon: <BiGroup className="h-8 w-8" />,
      badge: "Best Value",
    },
  ];

  return (
    <section id="offerings" className="py-20 px-4 ">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-3xl md:text-5xl font-bold mb-4 text-gray-900 ${bonVivant.className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What We Offer
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Expert-led certification training and an ongoing professional
            community built to support your growth in project management.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.8 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -15,
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-lg"
                whileHover={{
                  borderColor: "#3b82f6",
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              />

              {offering.badge && (
                <motion.div
                  className="absolute top-3 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 1.2 + index * 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                >
                  {offering.badge}
                </motion.div>
              )}

              <div className="p-8 relative z-10">
                <div className="text-center mb-6">
                  <motion.div
                    className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full w-fit"
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {offering.icon}
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold mb-2 text-gray-900"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.2 }}
                  >
                    {offering.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.2 }}
                  >
                    {offering.description}
                  </motion.p>
                </div>

                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.2 }}
                >
                  {offering.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 1.4 + index * 0.2 + featureIndex * 0.1,
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.3,
                          rotate: 360,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <BiCheckCircle className="h-5 w-5  mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
