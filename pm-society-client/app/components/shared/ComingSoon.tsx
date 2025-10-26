

import {  Wrench } from "lucide-react";


export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
 

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
            <Wrench className="w-3 h-3" />
            Work in Progress
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-light">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            We&apos;re working on something new. This feature will be available shortly.
          </p>
        </div>
      </main>

  
    </div>
  );
}