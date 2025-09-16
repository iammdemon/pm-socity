"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";

import {
  useCompleteSubscriptionRegistrationMutation,
  useStartCheckoutMutation,
  useStartSubscriptionCheckoutMutation,
  useVerifyPaymentMutation,
} from "@/app/redux/services/userApi";
import { packages } from "./Packages";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service",
  }),
  agreeToRefundPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Refund & Dispute Resolution Policy",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  selectedPackage: string;
  selectedBilling: string;
  onRegistrationComplete: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  selectedPackage,
  selectedBilling,
  onRegistrationComplete,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [showPassword, setShowPassword] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [startCheckout] = useStartCheckoutMutation();
  const [startSubscriptionCheckout] = useStartSubscriptionCheckoutMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [completeSubscription] = useCompleteSubscriptionRegistrationMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      name: "", 
      email: "", 
      password: "", 
      phoneNumber: "",
      agreeToTerms: false,
      agreeToRefundPolicy: false,
    },
  });

  const selectedPackageData = packages.find((p) => p.id === selectedPackage);

  const onSubmit = async (data: FormData) => {
    if (!stripe || !elements || !selectedPackageData) return;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      let clientSecret: string;
      let isSubscription = false;
      let subscriptionData: {
        subscriptionId: string;
        customerId: string;
      } | null = null;

      if (selectedPackageData.pricing.oneTime) {
        // One-time payment flow
        const result = await startCheckout({
          packageType: selectedPackage,
          subscriptionType: "one_time",
        }).unwrap();
        clientSecret = result.clientSecret;
      } else {
        // Subscription payment flow
        const result = await startSubscriptionCheckout({
          packageType: selectedPackage,
          subscriptionType: selectedBilling,
          email: data.email,
          name: data.name,
        }).unwrap();
        clientSecret = result.clientSecret;
        isSubscription = true;
        subscriptionData = result;
      }

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: data.name, email: data.email },
          },
        }
      );

      if (error) {
        setPaymentError(error.message || "Payment failed");
        return;
      }

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        setPaymentError("Payment was not successful");
        return;
      }

      // Different flows for one-time vs subscription
      if (isSubscription && subscriptionData) {
        await completeSubscription({
          subscriptionId: subscriptionData.subscriptionId,
          customerId: subscriptionData.customerId,
          password: data.password,
        }).unwrap();
      } else {
        // For one-time payments
        await verifyPayment({
          paymentIntentId: paymentIntent.id,
          email: data.email,
          name: data.name,
          password: data.password,
          phoneNumber: data.phoneNumber,
          course: selectedPackageData.name,
          amount: selectedPackageData.pricing.oneTime!,
          packageType: selectedPackage,
          subscriptionType: "one_time",
        }).unwrap();
      }

      onRegistrationComplete();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "message" in err.data
      ) {
        setPaymentError(
          (err.data as { message?: string }).message || "Unknown server error"
        );
      } else if (err instanceof Error) {
        setPaymentError(err.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const getPriceDisplay = () => {
    if (!selectedPackageData) return "";
    if (selectedPackageData.pricing.oneTime)
      return `$${selectedPackageData.pricing.oneTime}`;
    if (selectedBilling === "monthly")
      return `$${selectedPackageData.pricing.monthly}/mo`;
    if (selectedBilling === "yearly")
      return `$${selectedPackageData.pricing.yearly}/yr`;
    return "";
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile-first responsive container */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header Section - Responsive padding and text sizes */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm shrink-0">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                Complete Registration
              </h1>
              <p className="text-gray-300 mt-1 text-sm sm:text-base leading-snug">
                {selectedPackageData
                  ? `Enrolling in ${selectedPackageData.name} • ${getPriceDisplay()}`
                  : "Select a package to continue"}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section - Enhanced responsive design */}
        <div className="p-4 sm:p-6 lg:p-8">
          <form
            className="space-y-6 sm:space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            {/* Personal Information Section */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Personal Information
                </h3>
                
                {/* Responsive grid - single column on mobile, two columns on larger screens */}
                <div className="grid grid-cols-1  gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div >
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      {...form.register("name")}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-gray-900 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Enter your full name"
                      type="text"
                    />
                    {form.formState.errors.name && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div >
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        {...form.register("email")}
                        type="email"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-gray-900 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                        placeholder="Enter your email"
                      />
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    {form.formState.errors.email && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div >
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        {...form.register("phoneNumber")}
                        type="tel"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-gray-900 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                        placeholder="Enter your phone number"
                      />
                      <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    {form.formState.errors.phoneNumber && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600">
                        {form.formState.errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div >
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...form.register("password")}
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-gray-900 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                        placeholder="Create a secure password"
                      />
                      <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                    {form.formState.errors.password && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  Payment Information
                </h3>
              </div>
              
              <div className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg sm:rounded-xl bg-gray-50">
                <CardElement
                  options={{
                    style: {
                      base: {
                        color: "#111827",
                        fontFamily: "system-ui, sans-serif",
                        "::placeholder": {
                          color: "#6B7280",
                        },
                      },
                    },
                  }}
                />
              </div>

              {/* Payment Card Logos */}
              <div className="flex items-center justify-center  gap-2 sm:gap-4">
               
                
                  {/* Visa */}
                  <div className=" bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                    <Image
                      src="/image/visa.png" 
                      alt="Visa" 
                      className="w-12 h-8 object-contain"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className=" bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                    <Image
                      src="/image/mastercard.webp" 
                      alt="Mastercard" 
                      className="w-12 h-8 object-contain"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className=" bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                    <Image
                      src="/image/american-express.png" 
                      alt="American Express" 
                      className="w-12 h-8 object-contain"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className=" bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                    <Image
                      src="/image/discover.webp" 
                      alt="Discover" 
                      className="w-12 h-8 object-contain"
                      width={20}
                      height={20}
                    />
                  </div>
                  
             
                </div>
            
            </div>

            {/* Terms and Conditions Section */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                Terms and Conditions
              </h3>
              
              <div className="space-y-4 p-4 sm:p-6 border-2 border-gray-200 rounded-lg sm:rounded-xl bg-gray-50">
                {/* Terms of Service Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...form.register("agreeToTerms")}
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      <span className="italic">I confirm that I have read and agree to The PM Society&apos;s{" "}
                        <a 
                          href="terms" 
                          className="text-gray-900 underline hover:text-gray-700 font-medium"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Terms of Service
                        </a>.</span>
                    </p>
                    {form.formState.errors.agreeToTerms && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600">
                        {form.formState.errors.agreeToTerms.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Refund Policy Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...form.register("agreeToRefundPolicy")}
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      <span className="italic">I confirm that I have read and agree to The PM Society&apos;s{" "}
                        <a 
                          href="privacy-policy" 
                          className="text-gray-900 underline hover:text-gray-700 font-medium"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Refund & Dispute Resolution Policy
                        </a>.</span>
                    </p>
                    {form.formState.errors.agreeToRefundPolicy && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600">
                        {form.formState.errors.agreeToRefundPolicy.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Enrollment Commitment Notice */}
                <div className="pt-2 border-t border-gray-300">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="italic">I understand that my enrollment is a commitment to the program and subject to the stated refund policy.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {paymentError && (
              <div className="p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl">
                <p className="text-red-700 font-medium text-sm sm:text-base break-words">
                  {paymentError}
                </p>
              </div>
            )}

            {/* Submit Button - Enhanced responsive design */}
            <button
              type="submit"
              disabled={!selectedPackageData || isProcessing}
              className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:from-gray-800 hover:to-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm sm:text-base">Processing Payment...</span>
                </div>
              ) : selectedPackageData ? (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    Secure Enrollment • {getPriceDisplay()}
                  </span>
                </div>
              ) : (
                <span className="text-sm sm:text-base">Select a package to continue</span>
              )}
            </button>

            {/* Security Note */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-1">
                <span>🔒</span>
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};