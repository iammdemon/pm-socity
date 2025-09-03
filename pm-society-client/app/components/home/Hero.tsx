"use client";
import Link from "next/link";
import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-[80px] md:pt-[0px]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full object-cover md:h-screen min-h-[400px]"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12 md:h-screen">
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
              className="w-full sm:w-auto border border-white text-white hover:bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg transition duration-300"
            >
              Compare Programs
            </Link>
            <Link
              href="/enroll"
              className="w-full sm:w-auto border border-white text-white hover:bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg transition duration-300"
            >
              Join Society+
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
