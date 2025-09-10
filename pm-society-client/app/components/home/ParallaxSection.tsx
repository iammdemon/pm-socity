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
        const rate = relativePos * 0.3; // Slower parallax for smoother effect
        imageRef.current.style.transform = `translateY(${rate}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
    >
      {/* Image Container with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[110%] -top-[5%]"
      >
        <Image
          src="/image/elevate.webp"
          alt="Project Management Career - Professional team collaboration"
          fill
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectPosition: 'center 30%', // Focus on upper-center area to show faces better
          }}
          onLoad={() => setImageLoaded(true)}
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h2 
            className={`
              ${bonVivant.className} 
              font-bold 
              text-white 
              text-2xl 
              sm:text-3xl 
              md:text-5xl 
              lg:text-6xl 
              xl:text-7xl 
              leading-tight 
              drop-shadow-2xl
            `}
          >
            Elevate Your Project Management Career
          </h2>
          
          {/* Optional subtitle for better context */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mt-4 md:mt-6 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who've transformed their careers with our comprehensive PMP certification program
          </p>
        </div>
      </div>

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="text-white/50 text-sm">Loading...</div>
        </div>
      )}
    </section>
  );
}