"use client";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useRef, useCallback, useState } from "react";

declare global {
  interface Window {
    Vimeo?: {
      Player: new (element: HTMLElement, options: {
        id: string;
        background?: boolean;
        autoplay?: boolean;
        loop?: boolean;
        muted?: boolean;
        controls?: boolean;
        responsive?: boolean;
      }) => VimeoPlayer;
    };
  }
}

interface VimeoPlayer {
  setVolume: (volume: number) => Promise<void>;
  play: () => Promise<void>;
  on: (event: string, callback: () => void) => void;
  destroy: () => Promise<void>;
}

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

export default function Hero() {
  const vimeoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const hasInteractedRef = useRef(false);

  const handleUserInteraction = useCallback(() => {
    if (!hasInteractedRef.current && playerRef.current) {
      hasInteractedRef.current = true;
      
      playerRef.current.setVolume(1)
        .then(() => playerRef.current?.play())
        .catch(error => console.log("Vimeo play failed:", error));
      
      // Remove listeners after first interaction
      const events = ['click', 'touchstart', 'keydown'];
      events.forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      );
    }
  }, []);

  useEffect(() => {
    if (!vimeoRef.current) return;

    let scriptElement: HTMLScriptElement | null = null;

    const initializePlayer = () => {
      if (!window.Vimeo || !vimeoRef.current) return;

      const player = new window.Vimeo.Player(vimeoRef.current, {
        id: '1115442895',
        background: true,
        autoplay: true,
        loop: false, // No loop as requested
        muted: true,
        controls: false,
        responsive: true,
      });

      playerRef.current = player;
      player.on('loaded', () => setIsVideoReady(true));

      // Add interaction listeners
      const events = ['click', 'touchstart', 'keydown'];
      events.forEach(event => 
        document.addEventListener(event, handleUserInteraction, { passive: true })
      );
    };

    // Check if Vimeo API is already loaded
    if (window.Vimeo) {
      initializePlayer();
    } else {
      // Load Vimeo Player API
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://player.vimeo.com/api/player.js';
      scriptElement.onload = initializePlayer;
      scriptElement.onerror = () => console.error('Failed to load Vimeo Player API');
      document.head.appendChild(scriptElement);
    }

    return () => {
      // Cleanup
      const events = ['click', 'touchstart', 'keydown'];
      events.forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      );

      if (playerRef.current) {
        playerRef.current.destroy().catch(console.error);
        playerRef.current = null;
      }

      if (scriptElement?.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [handleUserInteraction]);

  return (
    <section className="relative w-full overflow-hidden pt-[30px] md:pt-0">
      {/* Vimeo Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Poster Image */}
        {!isVideoReady && (
          <div>
            <Image
              src="/image/connect.webp"
              alt="Loading video..."
              className="w-full h-full object-cover"
              fill
             
            />
         
          </div>
        )}
        
        {/* Vimeo Player */}
        <div 
          ref={vimeoRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>
 
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center px-4 py-5 md:h-screen">
        <div className="text-center w-full max-w-3xl">
          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg ${bonVivant.className}`}
          >
            Welcome to The Society!
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-white mb-6 drop-shadow">
            More Than a Certificate — Build a Career, Community, and Real Confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/services"
              className="w-full sm:w-auto border border-white text-white hover:bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg transition-colors duration-300"
            >
              Compare Programs
            </Link>
            <Link
              href="/enroll"
              className="w-full sm:w-auto border border-white text-white hover:bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg transition-colors duration-300"
            >
              Join Society+
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}