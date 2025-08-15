'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  src: '../../../public/fonts/BonVivantSerifBold.ttf',})
const steps = [
  {
    title: 'Enroll',
    description: 'Join our live virtual PMP course to kickstart your journey.',
    icon: <FaSignInAlt className="h-6 w-6  dark:text-blue-400" />,
    image:
      '/image/enroll.jpeg',
  },
  {
    title: 'Learn',
    description: 'Engage in interactive sessions with comprehensive resources.',
    icon: <FaChalkboardTeacher className="h-6 w-6  dark:text-blue-400" />,
    image:
      '/image/learn.jpeg',
  },
  {
    title: 'Coach',
    description: 'Receive customized 1:1 guidance tailored to your needs.',
    icon: <FaUserCheck className="h-6 w-6  dark:text-blue-400" />,
    image:
      '/image/coach-2.jpeg',
  },
  {
    title: 'Mentor',
    description: 'Get career strategy support post-certification.',
    icon: <FaHandsHelping className="h-6 w-6  dark:text-blue-400" />,
    image:
      '/image/mentor-2.jpeg',
  },
  {
    title: 'Thrive',
    description: 'Excel in your new project leadership role.',
    icon: <FaTrophy className="h-6 w-6  dark:text-blue-400" />,
    image:
      '/image/thrive.jpeg',
  },
];

const OurApproach: React.FC = () => {
  return (
    <section id="our-approach" className="py-20 md:px-12 ">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider ">
            Our Approach
          </span>
          <h2 className={`mt-2 text-2xl md:text-5xl font-bold ${bonVivant.className} text-gray-900 dark:text-white `}>
            Your Roadmap to Success
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Follow our proven, step-by-step process to achieve certification and thrive as a project leader.
          </p>
        </motion.div>

        {/* Timeline row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          {steps.map((step, index) => {
            const delay = index * 0.8;

            return (
              <React.Fragment key={index}>
                {/* Dot with number */}
                <motion.div
                  className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-semibold shadow-md"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay, duration: 0.4, ease: 'easeOut' }}
                >
                  {index + 1}
                </motion.div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block h-1 bg-black dark:bg-blue-400"
                    style={{ minWidth: '40px', maxWidth: '100px', flexGrow: 1 }}
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: delay + 0.4,
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const delay = index * 0.8;
            return (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.6 }}
              >
                <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="flex justify-center mb-4">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
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
