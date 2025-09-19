"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Calendar, Users, Gift, ArrowRight, Download, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export const SuccessCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate steps progressively
    const timer = setInterval(() => {
      setCurrentStep(prev => prev < 3 ? prev + 1 : prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSteps = [
    {
      icon: Mail,
      title: "Check Your Email",
      description: "Confirmation and access details sent",
      completed: currentStep >= 1
    },
    {
      icon: Download,
      title: "Download Resources",
      description: "Access your starter materials",
      completed: currentStep >= 2
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with fellow members",
      completed: currentStep >= 3
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ECE8E1] via-[#F5F2ED] to-[#E8E3DB] px-4 py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-100 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-20 animate-ping"></div>
      </div>

      <div className={`relative z-10 max-w-2xl w-full transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Main Success Card */}
        <Card className="text-center shadow-2xl border-2 border-black rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">
          
          {/* Success Header */}
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-8 pt-12">
            <div className="relative">
              {/* Animated Success Icon */}
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
                <CheckCircle className="w-12 h-12 text-white drop-shadow-sm" />
              </div>
              
              {/* Celebration Stars */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`absolute w-6 h-6 text-yellow-400 fill-current animate-pulse`}
                    style={{
                      left: `${(i - 1) * 40}px`,
                      top: `${Math.sin(i) * 20}px`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <CardTitle className="text-3xl md:text-4xl font-bold text-black mb-4">
              🎉 Welcome to The Society!
            </CardTitle>
            <CardDescription className="text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
              Your enrollment was successful! You're now part of an exclusive community 
              dedicated to growth and collaboration.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            
            {/* Order Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-black mb-4 flex items-center">
                <Gift className="w-5 h-5 mr-2 text-green-600" />
                Your Society+ Membership Includes:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Certification Programs
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Expert-Led Sessions
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Community Access
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Career Resources
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-black text-left">What happens next?</h3>
              <div className="space-y-3">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-xl border-2 transition-all duration-500 ${
                        step.completed
                          ? 'bg-green-50 border-green-200 transform scale-105'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <Icon className={`w-5 h-5 ${step.completed ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-black">{step.title}</div>
                        <div className="text-sm text-gray-600">{step.description}</div>
                      </div>
                      {step.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                href="/login"
                className="group w-full bg-black text-white py-4 px-6 font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Access Your Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
            
            </div>

            {/* Support Info */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-black mb-1">Need Help Getting Started?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Our support team is here to help you make the most of your membership.
                  </p>
                  <Link
                    href="/connect"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>

            {/* Estimated Timeline */}
            <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
              <Calendar className="w-4 h-4 inline mr-2" />
              <strong>Expected Timeline:</strong> You'll receive your welcome email within 5 minutes, 
              and full access will be activated within 1 hour.
            </div>
          </CardContent>
        </Card>

     
      </div>
    </div>
  );
};