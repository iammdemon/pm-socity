// ComingSoon.tsx
"use client";

import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  variation?: number;
  title?: string;
  description?: string;
  className?: string;
  showCta?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}

const variations = [
  {
    title: "🚧 Something Awesome is Coming!",
    description: "We're putting the final touches on this feature. It'll be ready for you very soon. Stay tuned for updates!"
  },
  {
    title: "⏳ Coming Soon!",
    description: "Our team is working hard behind the scenes. This feature will be live shortly. Thanks for your patience!"
  },
  {
    title: "✨ Exciting Feature Ahead!",
    description: "Big things are on the way! We're building a new experience for you, and it'll launch very soon."
  },
  {
    title: "🚀 Feature Launching Soon!",
    description: "We're crafting something special for you. Hang tight—it'll be available before you know it!"
  },
  {
    title: "🛠 Work in Progress",
    description: "We're currently working on this feature to make it even better. Stay tuned—something great is coming your way!"
  }
];

export default function ComingSoon({
  variation = 5,
  title,
  description,
  className = "",
  showCta = true,
  ctaText = "Get Notified",
  onCtaClick
}: ComingSoonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Use custom title/description if provided, otherwise use the variation
  const currentTitle = title || variations[variation - 1].title;
  const currentDescription = description || variations[variation - 1].description;

  return (
    <div className={cn("bg-white h-screen dark:bg-black text-black dark:text-white p-8 md:p-16", className)}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {currentTitle}
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {currentDescription}
        </p>
        
        {/* Visual Element */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-24 h-1 bg-black dark:bg-white"></div>
            <div 
              className={cn(
                "absolute top-0 left-0 h-1 bg-black dark:bg-white transition-all duration-1000",
                isHovered ? "w-full" : "w-0"
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            ></div>
          </div>
        </div>
        
        {/* Call to Action */}
        {showCta && (
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={onCtaClick}
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 flex items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {ctaText}
              <ChevronRight 
                className={cn(
                  "w-4 h-4 ml-2 transition-transform duration-300",
                  isHovered ? "translate-x-1" : "translate-x-0"
                )} 
              />
            </button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>We&apos;ll notify you when it&apos;s ready</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}