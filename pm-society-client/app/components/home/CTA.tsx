'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


// Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut' as const, 
    },
  },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const CallToAction = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 dark:text-white md:text-4xl mb-6 leading-tight"
            variants={itemVariants}
          >
            Ready to Become a Certified Project Leader with a Community to Support You?
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join our next training cohort and grow with expert guidance, accountability, and real connection.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-gray-800 font-semibold px-8 py-3 shadow-lg"
              >
                <Link href="/enroll">Enroll Now</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold px-8 py-3"
              >
                <Link href="/connect">Let&apos;s Connect</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;