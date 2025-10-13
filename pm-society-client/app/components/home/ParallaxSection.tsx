'use client';

import Image from 'next/image';
import localFont from 'next/font/local';
import { useState } from 'react';
import { motion } from 'framer-motion';

const bonVivant = localFont({
  src: '../../../public/fonts/BonVivantSerifBold.ttf',
});

export default function ParallaxSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] max-h-[90vh] overflow-hidden dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/image/elevate.webp"
          alt="Project Management Career - Professional team collaboration"
          fill
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectPosition: 'center 30%',
          }}
          onLoad={() => setImageLoaded(true)}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (min-width: 1280px) 1200px"
        />
      </div>

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <motion.div 
          className="flex flex-col items-center justify-center text-center w-full max-w-[95%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block px-3 py-1 mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Career Growth
          </motion.span>
          
          <motion.h2
            className={`
              ${bonVivant.className}
              font-bold
              text-white
              text-lg
              sm:text-xl
              md:text-3xl
              lg:text-4xl
              xl:text-5xl
              2xl:text-6xl
              leading-tight
              drop-shadow-2xl
              tracking-tight
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Elevate Your Project Management Career
          </motion.h2>

          {/* Subtitle with responsive sizing */}
          <motion.p
            className="
              text-white/90
              text-xs
              sm:text-sm
              md:text-base
              lg:text-lg
              xl:text-xl
              mt-2
              sm:mt-3
              md:mt-4
              lg:mt-5
              drop-shadow-lg
              max-w-[90%]
              sm:max-w-md
              md:max-w-xl
              lg:max-w-2xl
              mx-auto
              leading-relaxed
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Step into a program built for the next generation of project leaders - certification is just the beginning.
          </motion.p>
          
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-center">
              <div className="h-1 w-16 sm:w-20 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-900 dark:bg-black animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin mb-2"></div>
            <div className="text-white/50 text-xs sm:text-sm">Loading...</div>
          </div>
        </div>
      )}
    </section>
  );
}