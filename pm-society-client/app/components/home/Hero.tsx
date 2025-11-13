"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
  fallback: ["Georgia", "serif"],
  display: "swap",
});

const VIDEO_PATH = "/video/welcome.mp4";
const POSTER_PATH = "/image/video.webp";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Detect iOS device
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOSDevice = 
      /ipad|iphone|ipod/.test(userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    setIsIOS(isIOSDevice);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    console.error("Video failed to load");
    setIsVideoLoaded(false);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const newMutedState = !video.muted;
      video.muted = newMutedState;
      
      // iOS requires user interaction to play with sound
      if (!newMutedState && isIOS) {
        video.play().catch((err) => {
          console.warn("iOS autoplay with sound failed:", err);
          video.muted = true;
          setIsMuted(true);
        });
      }
      
      setIsMuted(newMutedState);
    } catch (error) {
      console.error("Toggle mute failed:", error);
    }
  }, [isIOS]);

  return (
    <section className="relative w-full md:h-screen min-h-[400px] py-6 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={POSTER_PATH}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          style={{ WebkitAppearance: 'none' }}
        >
          <source src={VIDEO_PATH} type="video/mp4" />
          <source src="/video/welcome.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div 
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${
            isVideoLoaded ? 'bg-black/20' : 'bg-black/40'
          }`} 
        />
      </div>

      {/* Sound Toggle Button */}
      {isVideoLoaded && !isIOS && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 md:bottom-6 md:right-6 focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>
      )}

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center px-4 py-10 h-full">
        <div className="text-center w-full max-w-4xl">
          <h1 className={`text-2xl leading-tight sm:text-4xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl ${bonVivant.className}`}>
            Welcome to The Society!
          </h1>
          <p className="text-sm leading-relaxed sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed text-white/90 mb-6 md:mb-8 drop-shadow-lg max-w-2xl mx-auto">
            More Than a Certificate — A Society Built on Collaboration. Get
            Certified, Build Confidence, Community, & Your Career.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/services"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/50 text-white hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-medium transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl will-change-transform"
            >
              Compare Programs
            </Link>
            <Link
              href="/enroll"
              className="w-full sm:w-auto bg-white text-black hover:bg-white/90 px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-semibold transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl will-change-transform"
            >
              Join Society+
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}