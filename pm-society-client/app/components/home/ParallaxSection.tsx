'use client';

import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';
const bonVivant = localFont({
  src: '../../../public/fonts/BonVivantSerifBold.ttf',})

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      
      // Only apply parallax if section is in view
      if (
        scrollPosition + window.innerHeight > sectionTop && 
        scrollPosition < sectionTop + sectionHeight
      ) {
        const yPos = (scrollPosition - sectionTop) * 0.2;
        if (sectionRef.current) {
          sectionRef.current.style.backgroundPositionY = `${yPos}px`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="h-[600px] bg-[url(/image/elevate.jpeg)] bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-[#0a192f]/70 "></div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <h2 className={`md:text-6xl ${bonVivant.className} font-bold text-white text-center px-4 text-xl`}>
          Elevate Your Project Management Career
        </h2>
      </div>
    </section>
  );
}