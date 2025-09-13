'use client';

import Image from 'next/image';
import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';

const bonVivant = localFont({
  src: '../../../public/fonts/BonVivantSerifBold.ttf',
});

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;

      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;

      // Only apply parallax if section is in view
      if (
        scrollPosition + window.innerHeight > sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const relativePos = scrollPosition - sectionTop;
        // Adjust parallax rate based on screen size for smoother effect
        const rate = relativePos * (window.innerWidth < 768 ? 0.2 : 0.3);
        imageRef.current.style.transform = `translateY(${rate}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] md:min-h-[400px] max-h-[800px] overflow-hidden w-full"
    >
      {/* Image Container with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full md:h-[110%] md:-top-[5%]"
      >
        <Image
          src="/image/elevate.webp"
          alt="Project Management Career - Professional team collaboration"
          fill
          className={`md:object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectPosition: 'center 30%', // Focus on upper-center for better visibility
          }}
          onLoad={() => setImageLoaded(true)}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
        />
      </div>

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-[90%] sm:max-w-3xl md:max-w-4xl">
          <h2
            className={`
              ${bonVivant.className}
              font-bold
              text-white
              text-xl
              sm:text-2xl
              md:text-4xl
              lg:text-5xl
              xl:text-6xl
              leading-tight
              drop-shadow-2xl
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
              mt-3
              sm:mt-4
              md:mt-6
              drop-shadow-lg
              max-w-[90%]
              sm:max-w-xl
              md:max-w-2xl
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
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="text-white/50 text-xs sm:text-sm">Loading...</div>
        </div>
      )}
    </section>
  );
}