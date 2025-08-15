import { Skeleton } from "@/components/ui/skeleton"
import { LuLoader } from "react-icons/lu"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ECE8E1] text-black space-y-10 px-4">
      <LuLoader className="h-14 w-14 animate-spin text-black opacity-80" />

      <div className="w-full max-w-md space-y-6 mt-4">
        <Skeleton className="h-8 w-4/5 rounded-lg shadow-sm" />
        <Skeleton className="h-8 w-3/5 rounded-lg shadow-sm" />
        <Skeleton className="h-52 w-full rounded-2xl shadow-md" />
      </div>
    </div>
  )
}
