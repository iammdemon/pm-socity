'use client';

import Image from 'next/image';
import localFont from 'next/font/local';
import { useState } from 'react';

const bonVivant = localFont({
  src: '../../../public/fonts/BonVivantSerifBold.ttf',
});

export default function ParallaxSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] max-h-[90vh] overflow-hidden"
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/image/elevate.webp"
          alt="Project Management Career - Professional team collaboration"
          fill
          className={`object-cover transition-opacity duration-300 ease-in-out ${
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-[95%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl">
          <h2
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
          >
            Elevate Your Project Management Career
          </h2>

          {/* Subtitle with responsive sizing */}
          <p
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
          >
            Step into a program built for the next generation of project leaders - certification is just the beginning.
          </p>
        </div>
      </div>

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
          <div className="text-white/50 text-xs sm:text-sm">Loading...</div>
        </div>
      )}
    </section>
  );
}