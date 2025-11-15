"use client";
import { useGetMeQuery } from "@/app/redux/services/authApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LinkedinSupportButton = () => {
  const { data: user } = useGetMeQuery({});
  const linkedinSupport = user?.data?.linkedinSupport;
  const isAdmin = user?.data?.role === "admin"
  const isActive = linkedinSupport === "active";

  // Don't render anything if user has active LinkedIn support
  if (isActive || isAdmin) return null;

  return (
    <div className="w-full">
      <Link href="/dashboard/linkedin-support">
        <Button 
          variant="outline" 
          className="w-full bg-white text-black border-black hover:bg-black hover:text-white transition-colors dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
        >
         Pay for LinkedIn Support
        </Button>
      </Link>
    </div>
  );
};

export default LinkedinSupportButton;