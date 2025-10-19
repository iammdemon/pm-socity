"use client";


import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


// Consultant data array
const consultants = [
  {
    name: "Olivia McGlothen",
    title: "Mentorship & Training",
    description:
      "Expert guidance on mentorship, hands-on training, and tailored project management sessions.",
    bookingLink: "https://calendly.com/olivia-mcglothen-thepmsociety/30min",
    isAvailable: true,
    specialties: ["Mentorship", "Training", "Project Management"],
    sessionDuration: "30 minutes",
    avatar: "/image/olivia.webp",
  },
  {
    name: "Toni Merrill",
    title: "Executive Coaching",
    description:
      "High-level coaching to elevate your leadership in project management.",
    bookingLink: "https://calendly.com/toni-merrill-thepmsociety/30min",
    isAvailable: true,
    specialties: ["Leadership", "Strategy", "Executive Coaching"],
    sessionDuration: "45 minutes",
    avatar: "/image/toni.webp",
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
    <section className="relative py-16 md:py-24 bg-white dark:bg-black transition-colors duration-300 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-wider text-black dark:text-white bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800"
          >
            Book a Session
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-extrabold text-black dark:text-white mb-4 tracking-tight"
          >
            Schedule a Session
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Connect with our expert consultants for personalized guidance and mentorship
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {consultants.map((consultant, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden group ${
                  !consultant.isAvailable ? "opacity-80" : ""
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-black dark:bg-white"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      
                      <div className="text-left">
                        <CardTitle className="text-xl font-bold text-black dark:text-white">
                          {consultant.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {consultant.title}
                        </p>
                      </div>
                    </div>
                    {consultant.isAvailable ? (
                      <Badge variant="outline" className="bg-white dark:bg-black text-black dark:text-white border-black dark:border-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {consultant.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {consultant.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{consultant.sessionDuration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      <span>Video Call</span>
                    </div>
                  </div>
                  
                  {consultant.isAvailable ? (
                    <Button
                      asChild
                      className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-medium py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <a
                        href={consultant.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        Book 30-Min Call
                      </a>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium py-3 rounded-xl cursor-not-allowed"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Coming Soon
                      </span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
     
      </div>
    </section>
  );
}