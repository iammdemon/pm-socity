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
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{
        duration: 0.9,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // cubic-bezier type-safe
        type: "spring",
        stiffness: 120,
      }}
      className="w-full my-12 px-4 md:px-0 max-w-5xl mx-auto relative"
    >
      <Card className="bg-white text-gray-800 border-4 border-yellow-500 rounded-2xl shadow-2xl overflow-hidden relative animate-glow">
        <style jsx>{`
          @keyframes glow {
            0% { box-shadow: 0 0 10px rgba(234, 179, 8, 0.5); }
            50% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.8); }
            100% { box-shadow: 0 0 10px rgba(234, 179, 8, 0.5); }
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
          .bg-gradient-animated {
            background: linear-gradient(45deg, #fef3c7, #fef9c3, #fef3c7);
            background-size: 200% 200%;
            animation: gradient 8s ease infinite;
          }
        `}</style>

        <CardContent className="p-8 md:p-12 text-center space-y-6 bg-gradient-animated">
          <motion.h2
            className={`${bonVivant.className} text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900 drop-shadow-lg`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
          >
            The Society Standard
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-gray-800 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.42, 0, 0.58, 1] }}
          >
            At <span className="text-yellow-600 font-bold">TPMS</span>, excellence isn’t optional;
            it is <span className="italic font-semibold underline decoration-yellow-600 decoration-2">the standard</span>. 
            If you don’t pass the PMP exam on your first attempt, you can rejoin any future cohort at{" "}
            <strong className="text-yellow-600 font-bold">no additional cost</strong>. 
            We’re committed to your success, every step of the way.
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SocietyStandard;
