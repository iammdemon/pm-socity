"use client";
import Link from "next/link";
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react"; // icons for sound toggle

declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        element: HTMLElement,
        options: {
          id: string;
          background?: boolean;
          autoplay?: boolean;
          loop?: boolean;
          muted?: boolean;
          controls?: boolean;
          responsive?: boolean;
          playsinline?: boolean;
        }
      ) => VimeoPlayer;
    };
  }
}

interface VimeoPlayer {
  on: (event: string, callback: () => void) => void;
  setVolume: (volume: number) => Promise<void>;
  destroy: () => Promise<void>;
}

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

export default function Hero() {
  const vimeoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!vimeoRef.current) return;

    let scriptElement: HTMLScriptElement | null = null;

    const initializePlayer = () => {
      if (!window.Vimeo || !vimeoRef.current) return;

      const player = new window.Vimeo.Player(vimeoRef.current, {
        id: "1115442895",
        background: true,
        autoplay: true,
        loop: true,
        muted: true,
        controls: false,
        responsive: true,
        playsinline: true,
      });

      playerRef.current = player;
      player.on("loaded", () => setIsVideoReady(true));
    };

    if (window.Vimeo) {
      initializePlayer();
    } else {
      scriptElement = document.createElement("script");
      scriptElement.src = "https://player.vimeo.com/api/player.js";
      scriptElement.onload = initializePlayer;
      scriptElement.onerror = () =>
        console.error("Failed to load Vimeo Player API");
      document.head.appendChild(scriptElement);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy().catch(console.error);
        playerRef.current = null;
      }
      if (scriptElement?.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  const toggleMute = async () => {
    if (!playerRef.current) return;

    if (isMuted) {
      await playerRef.current.setVolume(1); // unmute
      setIsMuted(false);
    } else {
      await playerRef.current.setVolume(0); // mute
      setIsMuted(true);
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[350px] md:min-h-[500px] py-6 overflow-hidden">
      {/* Vimeo Video Background */}
      <div className="absolute inset-0 z-0">
        <div
          ref={vimeoRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.78vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition md:bottom-6 md:right-6"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center px-4 py-10 h-full">
        <div className="text-center w-full max-w-4xl">
          <h1
            className={`text-2xl leading-tight sm:text-4xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl ${bonVivant.className}`}
          >
            Welcome to The Society!
          </h1>

          <p className="text-sm leading-relaxed sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed text-white/90 mb-6 md:mb-8 drop-shadow-lg max-w-2xl mx-auto">
            More Than a Certificate — A Society Built on Collaboration. Get
            Certified, Build Confidence, Community, & Your Career.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/services"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/50 text-white hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-medium transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Compare Programs
            </Link>
            <Link
              href="/enroll"
              className="w-full sm:w-auto bg-white text-black hover:bg-white/90 px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-semibold transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Join Society+
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
