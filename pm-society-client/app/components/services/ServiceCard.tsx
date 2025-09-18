"use client";
import { useState } from "react";
import { FiCheck, FiStar } from "react-icons/fi";
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
      className="relative w-full max-w-xl sm:max-w-md mx-auto h-[450px] md:h-[500px] "
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
          className={`absolute inset-0 rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-100 ${
            isHovered ? "shadow-2xl border-gray-200" : ""
          } transition-all duration-300`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {featured && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gray-900 text-white rounded-full px-2 sm:px-3 py-1 flex items-center gap-1">
              <FiStar className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
              <span className="text-xs font-medium">Popular</span>
            </div>
          )}
          
          <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
            <div className={`mb-4 sm:mb-6 transform transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                <div className="text-xl sm:text-2xl text-gray-700">
                  {icon}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 leading-tight text-gray-900">{title}</h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed text-gray-600">
                {description}
              </p>
              
              {discountPrice ?  (
                <div className="mb-4 sm:mb-6">
                  <div className="text-lg sm:text-xl  md:text-2xl font-bold text-gray-900">
                     <span className=" line-through text-red-500">{price}</span><span className="text-gray-900 ml-2">{discountPrice}</span>
                  </div>
                  <p className="mt-1 text-sm sm:text-base text-gray-600">{discountText}</p>
                </div>): (<div className="mb-4 sm:mb-6">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {price}
                  </div>
                </div>)
              }
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="group flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium transition-all duration-200 bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md text-sm sm:text-base"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{title}</h3>
              <div className="w-10 sm:w-12 h-1 bg-white/30 rounded"></div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-300">What&#39;s Included:</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 group">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                      <FiCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                    <span className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <Link
                href={ctaLink}
                className="group w-full bg-white text-gray-900 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg text-sm sm:text-base"
              >
                {cta}
              </Link>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default ServiceCard;