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
      <Card className="bg-white text-gray-800 border border-gray-200 ">
        <CardContent className="p-6 md:p-8 text-center space-y-3">
          <h2
            className={`${bonVivant.className} text-xl md:text-2xl font-semibold tracking-wide`}
          >
            The Society Standard
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-gray-700">
            At <span className="text-yellow-600 font-semibold">TPMS</span>, excellence isn’t optional;
            it is <span className="italic font-medium">the standard</span>. If you don’t pass the PMP exam
            on your first attempt, you can rejoin any future cohort at{" "}
            <strong>no additional cost</strong>. We’re committed to your success, every step of the way.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SocietyStandard;
