import Image from "next/image";

export default function ParallaxSection() {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-[85vh] overflow-hidden dark:bg-gray-900 transition-colors duration-300">
      
      {/* Background Image - Centered */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/image/elevate.webp"
          alt="Project Management Career - Professional team collaboration"
          className="w-full h-full object-cover md:object-[center_30%]"
          width={1080}
          height={1080}
        />
      </div>

      {/* Gradient Overlay - Responsive darkness */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70 md:bg-gradient-to-r md:from-black/30 md:via-black/60 md:to-black/85"></div>
      <div className="absolute inset-0 bg-black/20 md:hidden"></div>

      {/* Content - Responsive positioning */}
      <div className="relative z-10 h-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center md:justify-end px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-[95%] sm:max-w-[85%] md:max-w-xl lg:max-w-2xl md:mr-8 lg:mr-12">
          
          <span className="inline-block px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
            Career Growth
          </span>
          
          <h2 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight drop-shadow-2xl tracking-tight">
            Elevate Your Project Management Career
          </h2>

          <p className="text-white/95 text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-5 md:mt-6 drop-shadow-xl leading-relaxed font-light max-w-lg md:max-w-none">
            Step into a program built for the next generation of project leaders - certification is just the beginning.
          </p>
          
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center justify-center md:justify-start w-full">
              <div className="h-1 w-20 sm:w-24 bg-white/80 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}