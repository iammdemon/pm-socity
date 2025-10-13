import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";


export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white space-y-10 px-4">
      {/* Twitter-style Loader */}
      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500 dark:text-blue-400" />
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Loading...
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your content
        </p>
      </div>

      {/* Twitter-style Skeleton Cards */}
      <div className="w-full max-w-2xl space-y-4 mt-8">
        {/* Tweet Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex space-x-3">
            <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
          </div>
        </div>

        {/* Reply Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex space-x-3">
            <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>
        </div>

        {/* Media Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}