"use client";

import Image from "next/image";
import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
  display: "swap",
});

export default function ParallaxSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-gray-900 dark:bg-black transition-colors duration-300"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Image */}
        <div className="relative w-full lg:w-1/2 h-64 md:h-96 lg:h-screen">
          {/* Fallback background color in case image doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-800 dark:to-black" />

          <Image
            src="/image/elevate.webp"
            alt="Professional team collaborating on project management"
            fill
            className="object-cover opacity-100"
            style={{ objectPosition: "center" }}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
         
          />

          {/* Gradient overlay on image for better text separation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/40 lg:hidden" />
        </div>

        {/* Right side - Content */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-2xl mx-auto text-center lg:text-left">
            {/* Enhanced Badge with better styling */}
            <div className="inline-flex items-center px-4 py-2 mb-6 sm:mb-8 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full border border-gray-300 dark:border-white/20 shadow-lg transition-all duration-300">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Career Growth
            </div>

            {/* Main Heading with better typography */}
            <h1
              id="hero-heading"
              className={`
                ${bonVivant.className}
                text-gray-900 dark:text-white
                text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
                xl:text-6xl
                font-bold
                leading-tight
                mb-4
                sm:mb-6
                tracking-tight
                transition-colors duration-300
              `}
            >
              Elevate Your Project Management Career
            </h1>

            {/* Enhanced Subtitle with better readability */}
            <p
              className="
                text-gray-700 dark:text-gray-300
                text-sm
                sm:text-base
                md:text-lg
                lg:text-xl
                max-w-none
                mx-auto lg:mx-0
                leading-relaxed
                mb-6
                sm:mb-8
                transition-colors duration-300
              "
            >
              Earn your PMP® or CAPM® certification through expert-led training,
              mentorship, and coaching built for the next generation of project
              leaders — because certification is just the beginning.
            </p>

       
          </div>
        </div>
      </div>
    </section>
  );
}
