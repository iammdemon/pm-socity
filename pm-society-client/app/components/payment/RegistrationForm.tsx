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

import { Package } from "@/types/package";

import {
  FiAward,
  FiBookOpen,
  FiSettings,
  FiTrendingUp,
  FiUser,
  FiUsers,
} from "react-icons/fi";



export const packages: Package[] = [
  {
    id: "IGNITE",
    name: "IGNITE",
    tagline: "Spark Your PM Journey",
    description:
      "Explore project management & build a foundation. Perfect for career changers & aspiring PMs.",
    whoItsFor: "Career changers and aspiring project professionals",
    features: [
      "PM 101 Course",
      "2 Executive Coaching Sessions",
      "2 months learning material access",
      "2 months society portal access",
    ],
    pricing: { oneTime: 999 },
    icon: <FiAward className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    gradient: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  {
    id: "ELEVATE",
    name: "ELEVATE",
    tagline: "Rise to PMP Excellence",
    description:
      "Guide professionals through PMP certification, mentoring & leadership roles. For experienced PMs ready for growth.",
    whoItsFor:
      "Professionals with project experience ready for PMP certification",
    features: [
      "35 hours virtual instructor-led training",
      "PMP application support",
      "3 executive coaching sessions",
      "3 months learning material access",
      "2 mentorship society portal access",
    ],
    pricing: { oneTime: 3500 },
    icon: <FiBookOpen className="w-8 h-8" />,
    color: "from-blue-500 to-purple-600",
    gradient: "bg-gradient-to-br from-blue-50 to-purple-50",
  },
  {
    id: "ASCEND",
    name: "ASCEND",
    tagline: "Master Advanced Leadership",
    description:
      "Bridge gap post-certification & build leadership. Ideal for certified PMs, team leads, future executives.",
    whoItsFor:
      "Certified PMs and experienced professionals growing into executive roles",
    features: [
      "PMI-ACP training",
      "Advanced PM workshops",
      "5 executive coaching sessions",
      "5 PM mentorship sessions",
      "25 PDU credits",
      "Mastermind group access",
      "6 months society portal access",
    ],
    pricing: { oneTime: 4500 },
    icon: <FiTrendingUp className="w-8 h-8" />,
    color: "from-purple-600 to-pink-600",
    gradient: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  {
    id: "THE_SOCIETY",
    name: "THE SOCIETY",
    tagline: "Your PM Community Hub",
    description:
      "Membership designed to keep project professionals connected, resourced, & growing.",
    whoItsFor:
      "Any project professional seeking ongoing learning and community",
    features: [
      "1 Executive Coaching  or PM Mentorship session per month",
      "Growth Partner Matching",
      "Access to PM discussion forums",
      "PMBOK & Learning Library",
      "Blogs & community events",
      "On-demand content",
    ],
    pricing: { monthly: 49, yearly: 499 },
    icon: <FiUsers className="w-8 h-8" />,
    color: "from-green-500 to-teal-500",
    gradient: "bg-gradient-to-br from-green-50 to-teal-50",
  },
  {
    id: "THE_SOCIETY_PLUS",
    name: "THE SOCIETY+",
    tagline: "Premium PM Experience",
    description:
      "Enhanced membership with coaching and mentorship. For project professionals wanting monthly mentoring or coaching & deeper community.",
    whoItsFor: "Project professionals wanting premium support and development",
    features: [
      "1 Executive Coaching  or PM Mentorship session per month",
      "Growth Partner Matching",
      "Access to PM discussion forums",
      "PMBOK & Learning Library",
      "Blogs & community events",
      "On-demand content",
    ],
    pricing: { monthly: 99, yearly: 999 },
    icon: <FiUser className="w-8 h-8" />,
    color: "from-amber-500 to-orange-600",
    gradient: "bg-gradient-to-br from-amber-50 to-orange-50",
  },
  {
    id: "BUILD_YOUR_OWN_PATH",
    name: "BUILD YOUR OWN PATH",
    tagline: "Customized PM Coaching",
    description:
      "Coaching & PM support on your terms. Ideal for professionals needing personalized support in leadership, communication, Agile/Scrum, or project delivery.",
    whoItsFor:
      "Project professionals who want flexible coaching tailored to their needs",
    features: [
      "Executive Coaching",
      "Project Management Mentorship",
      "Leadership Communication Coaching",
      "Agile & Scrum Practice Deep Dives",
      "Open-Topic Sessions"
    ],
    pricing: { oneTime: 400 },
    icon: <FiSettings className="w-8 h-8" />,
    color: "from-gray-600 to-indigo-600",
    gradient: "bg-gradient-to-br from-gray-50 to-indigo-50",
  },
];


const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
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
    defaultValues: { name: "", email: "", password: "", phoneNumber: "" },
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
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-black text-white p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Complete Registration</h1>
            <p className="text-gray-300 mt-1">
              {selectedPackageData
                ? `Enrolling in ${
                    selectedPackageData.name
                  } • ${getPriceDisplay()}`
                : "Select a package to continue"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-8">
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          {/* Personal Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Full Name
                  </label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
                    placeholder="Enter your full name"
                    type="text"
                  />
                  {form.formState.errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      {...form.register("email")}
                      type="email"
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {form.formState.errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  {...form.register("phoneNumber")}
                  type="tel"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
                  placeholder="Enter your phone number"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {form.formState.errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
                  placeholder="Create a secure password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Information
            </h3>
            <div className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "system-ui, sans-serif",
                      "::placeholder": {
                        color: "#6B7280",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {paymentError && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-700 font-medium">{paymentError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedPackageData || isProcessing}
            className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </div>
            ) : selectedPackageData ? (
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Secure Enrollment • {getPriceDisplay()}
              </div>
            ) : (
              "Select a package to continue"
            )}
          </button>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              🔒 Your payment is secured with 256-bit SSL encryption
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
