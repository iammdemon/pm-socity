"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { CheckCircle } from "lucide-react";
import Link from "next/link";


export const SuccessCard = () => {


  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#ECE8E1]">
      <Card className="max-w-md w-full text-center shadow-lg border border-black rounded-2xl p-6">
        <CardHeader>
          <div className="w-16 h-16 mx-auto bg-green-200 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-800" />
          </div>
          <CardTitle className="text-2xl font-semibold text-black">
            Enrollment Successful!
          </CardTitle>
          <CardDescription className="mt-2 text-gray-700">
            Thank you for enrolling. Check your email for details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/login"
            className="w-full bg-black text-white py-3 px-4 font-medium rounded-md hover:bg-gray-800 transition-colors"
            
          >
            Proceed to Login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
