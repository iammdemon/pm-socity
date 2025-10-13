"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Consultant data array
const consultants = [
  {
    name: "Olivia McGlothen",
    title: "Mentorship & Training",
    description:
      "Expert guidance on mentorship, hands-on training, and tailored project management sessions.",
    bookingLink: "https://calendly.com/olivia-mcglothen-thepmsociety/30min",
    isAvailable: true,
  },
  {
    name: "Angela Ward",
    title: "Mentorship & Training",
    description:
      "Schedule your complimentary consultation to learn more about The PM Society's courses, mentoring, and community offerings.",
    bookingLink: "https://calendly.com/angela-ward-thepmsociety/30min",
    isAvailable: true,
  },
  {
    name: "Toni Merrill",
    title: "Executive Coaching",
    description:
      "High-level coaching to elevate your leadership in project management.",
    bookingLink: "",
    isAvailable: false,
  },
];

// Animation variants consistent with ContactPage
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function BookWithCalendly() {
  return (
    <section className="relative py-12 md:py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-3 py-1 mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-full"
          >
            Book a Session
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 md:mb-12 tracking-tight"
          >
            Schedule a Session
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultants.map((consultant, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group ${
                    !consultant.isAvailable ? "opacity-70" : ""
                  }`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <Calendar
                        className={`h-5 w-5 mr-2 ${
                          consultant.isAvailable
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      />
                      {consultant.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
                      {consultant.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                      {consultant.description}
                    </p>
                    {consultant.isAvailable ? (
                      <Button
                        asChild
                        className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 text-sm font-medium py-2 rounded-lg transition-colors duration-200"
                      >
                        <a
                          href={consultant.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          Book 30-Min Call
                          <Calendar className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="w-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium py-2 rounded-lg cursor-not-allowed"
                      >
                        <span className="inline-flex items-center gap-2">
                          Coming Soon
                          <Calendar className="h-4 w-4" />
                        </span>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}