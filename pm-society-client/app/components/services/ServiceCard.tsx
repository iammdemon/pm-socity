"use client";
import { useState } from "react";
import { FiCheck, FiStar, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  price?: string;
  cta: string;
  ctaLink: string;
  icon: React.ReactNode;
  featured?: boolean;
  discountPrice?: string;
  discountText?: string | React.ReactNode;
}

function ServiceCard({
  title,
  description,
  features,
  price,
  cta,
  ctaLink,
  icon,
  discountPrice,
  discountText,
  featured = false,
}: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-xl sm:max-w-md mx-auto h-[480px] md:h-[520px]"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setIsFlipped(true);
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        setIsFlipped(false);
        setIsHovered(false);
      }}
      onClick={() => {
        if (window.innerWidth < 768) {
          setIsFlipped(!isFlipped);
          setIsHovered(!isHovered);
        }
      }}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 ease-out transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 border ${
            featured 
              ? "border-2 border-gray-900 dark:border-white" 
              : "border border-gray-200 dark:border-gray-700"
          } ${
            isHovered ? "shadow-2xl scale-[1.02]" : ""
          } transition-all duration-300`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {featured && (
            <div className="absolute top-4 right-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg z-10">
              <FiStar className="h-3 w-3 fill-current" />
              <span className="text-xs font-semibold">Popular</span>
            </div>
          )}
          
          <div className="p-6 sm:p-8 h-full flex flex-col relative">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 dark:from-gray-900/20 to-transparent pointer-events-none" />
            
            <div className={`mb-6 transform transition-transform duration-300 ${isHovered ? "scale-110 rotate-3" : ""}`}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-md">
                <div className="text-2xl text-gray-700 dark:text-gray-300">
                  {icon}
                </div>
              </div>
            </div>

            <div className="flex-1 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </p>
              
              <div className="mb-6">
                {discountPrice ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        {discountPrice}
                      </span>
                      <span className="text-lg text-red-500 dark:text-red-400 line-through">
                        {price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {discountText}
                    </p>
                  </div>
                ) : (
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {price}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="group relative z-10 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-lg hover:scale-105 text-base"
            >
              View Details
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="p-6 sm:p-8 h-full flex flex-col relative">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)`,
              }} />
            </div>

            <div className="mb-6 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <div className="w-12 h-12 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center">
                  <div className="text-xl text-white dark:text-gray-900">
                    {icon}
                  </div>
                </div>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-full" />
            </div>

            <div className="flex-1 overflow-y-auto relative z-10">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                What&apos;s Included:
              </h4>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 group/item"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <FiCheck className="h-3.5 w-3.5 text-white dark:text-gray-900" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 relative z-10">
              <Link
                href={ctaLink}
                className="group w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 text-base"
              >
                {cta}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;