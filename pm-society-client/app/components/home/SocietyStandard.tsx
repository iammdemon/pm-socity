"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

const SocietyStandard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full my-5 px-4 md:px-0 max-w-5xl mx-auto"
    >
      <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 md:p-8 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full">
              Our Promise
            </span>
            <h2
              className={`${bonVivant.className} text-xl md:text-4xl font-bold tracking-wide text-gray-900 dark:text-white`}
            >
              The Society Standard
            </h2>
          </motion.div>
          
          <motion.p
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            At <span className="font-semibold text-gray-900 dark:text-white">TPMS</span>, excellence isn&apos;t optional;
            it is <span className="italic font-medium text-gray-900 dark:text-white">the standard</span>. If you don&apos;t pass the PMP exam
            on your first attempt, you can rejoin any future cohort at{" "}
            <strong className="text-gray-900 dark:text-white"> minimum to no additional cost</strong>. We&apos;re committed to your success, every step of the way.
          </motion.p>
          
          <motion.div
            className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-center">
              <div className="h-1 w-20 bg-gray-900 dark:bg-white rounded-full"></div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SocietyStandard;