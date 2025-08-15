"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

export default function VideoSection() {
  return (
    <section className="py-16  relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`${bonVivant.className} text-3xl md:text-5xl font-bold text-gray-900 mb-4`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
           See How TPMS Supports the 
          </motion.h2>
          <motion.h2
            className={`${bonVivant.className} text-3xl md:text-5xl font-bold text-gray-900 mb-4`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
          Journey — Not Just the Exam
          </motion.h2>

          <motion.p
            className="text-base text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
           We help you build real skills, lasting confidence, and a career in project leadership that goes beyond the credential.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <VideoCard
            thumbnailUrl="https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg"
            title="The TPMS Difference"
            videoUrl="https://www.youtube.com/embed/hmnoMYWbxLg?autoplay=1"
          />
        </motion.div>
      </div>
    </section>
  );
}

interface VideoCardProps {
  thumbnailUrl: string;
  title: string;
  videoUrl: string;
}

function VideoCard({ thumbnailUrl, title, videoUrl }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  return (
    <motion.div
      className="relative max-w-2xl mx-auto group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle Shadow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100 group-hover:shadow-xl transition-shadow duration-300">
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="video"
              className="relative aspect-video w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <iframe
                src={videoUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              />
            </motion.div>
          ) : (
            <motion.div
              key="thumbnail"
              className="relative aspect-video w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Play Button */}
              <motion.button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Ripple Effect */}
                <motion.div
                  className="absolute w-24 h-24 rounded-full border border-white/40"
                  animate={{
                    scale: isHovered ? [1, 1.3, 1] : 1,
                    opacity: isHovered ? [0.5, 0, 0.5] : 0.5,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Play Icon */}
                <motion.div
                  className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover/btn:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-600 ml-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <path
                      d="M8 5.14v14.72l11-7.36L8 5.14z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </motion.div>
              </motion.button>

              {/* Content Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {title}
                </motion.h3>
                <motion.p
                  className="text-white/90 text-sm"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  Watch how our program works
                </motion.p>

                {/* Duration Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  10:24 mins
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </motion.div>
  );
}