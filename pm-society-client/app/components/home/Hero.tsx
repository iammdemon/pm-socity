"use client";
import Link from "next/link";
import localFont from "next/font/local";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
  fallback: ["Georgia", "serif"],
});

const VIDEO_PATH = "/video/welcome.mp4";
const POSTER_PATH = "/image/video.webp";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) {
      console.warn("Video element not found");
      return;
    }
    videoRef.current.muted = !videoRef.current.muted;
    videoRef.current.volume = videoRef.current.muted ? 0 : 1;
    if (!videoRef.current.muted) {
      videoRef.current.play().catch((err) => console.error("Playback failed:", err));
    }
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative w-full md:h-screen min-h-[400px] py-6 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={VIDEO_PATH}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={POSTER_PATH}
          className="absolute inset-0 w-full h-full object-cover aspect-video"
          onError={() => console.error("Video failed to load")}
        />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition md:bottom-6 md:right-6 focus-visible:ring-2 focus-visible:ring-white"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        title={isMuted ? "Unmute video" : "Mute video"}
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