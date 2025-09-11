"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FaSignInAlt,
  FaChalkboardTeacher,
  FaUserCheck,
  FaHandsHelping,
  FaTrophy,
} from 'react-icons/fa';
import Image from 'next/image';
import localFont from 'next/font/local';

const bonVivant = localFont({
  src: '../../../public/fonts/BonVivantSerifBold.ttf',
});

const steps = [
  {
    title: 'Initiate with Enrollment',
    description: 'Enroll in a Society program, define your vision, and set the foundation for success.',
    icon: <FaSignInAlt className="h-6 w-6 dark:text-blue-400" />,
    image: '/image/enroll.webp',
  },
  {
    title: 'Plan to Learn',
    description: 'Strengthen skills through structured learning, resources, and peer engagement.',
    icon: <FaChalkboardTeacher className="h-6 w-6 dark:text-blue-400" />,
    image: '/image/learn.webp',
  },
  {
    title: 'Execute with Support',
    description: 'Apply knowledge through coaching, practice, and real-world scenarios.',
    icon: <FaUserCheck className="h-6 w-6 dark:text-blue-400" />,
    image: '/image/coach-2.webp',
  },
  {
    title: 'Monitor & Elevate',
    description: 'Stay accountable and sharpen your edge with mentorship and growth strategies.',
    icon: <FaHandsHelping className="h-6 w-6 dark:text-blue-400" />,
    image: '/image/mentor-2.webp',
  },
  {
    title: 'Close as a Leader',
    description: 'Transition into leadership, achieve career impact, and give back to the community.',
    icon: <FaTrophy className="h-6 w-6 dark:text-blue-400" />,
    image: '/image/thrive.webp',
  },
];

// Type-safe variants
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } // cubic-bezier
  },
};

const scaleVariant: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] } },
};

const lineVariant: Variants = {
  hidden: { scaleX: 0, transformOrigin: 'left' },
  visible: { scaleX: 1, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] } },
};

const OurApproach: React.FC = () => {
  return (
    <section id="our-approach" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
        >
          <span className="text-sm font-semibold uppercase tracking-wider">
            Our Approach
          </span>
          <h2
            className={`mt-2 text-2xl md:text-5xl font-bold ${bonVivant.className} text-gray-900 dark:text-white`}
          >
            The Society Lifecycle 
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
           Our framework mirrors the PMI project lifecycle—so members not only prepare for certification but also experience the discipline in action.
          </p>
        </motion.div>

        {/* Timeline row */}
        <div className="relative hidden md:flex items-center justify-between">
          {steps.map((_, index) => {
            const delay = index * 0.2;
            return (
              <React.Fragment key={index}>
                <motion.div
                  className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-semibold shadow-md"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={scaleVariant}
                  transition={{ delay }}
                >
                  {index + 1}
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="h-1 bg-black dark:bg-blue-400 flex-grow min-w-[40px] max-w-[100px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={lineVariant}
                    transition={{ delay: delay + 0.4 }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const delay = index * 0.2;
            return (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUpVariant}
                transition={{ delay }}
              >
                <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 20vw"
                    loading='lazy'
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="flex justify-center mb-4">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white ">
                  {step.title}
                </h3>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
