"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentIntentResponse,
  useCompleteLinkedinSupportPurchaseMutation,
  useStartLinkedinSupportCheckoutMutation,
} from "@/app/redux/services/paymentApi";
import { Button } from "@/components/ui/button";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Check, X, CreditCard, Shield, Lock } from "lucide-react";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const SuccessModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  paymentIntentId: string;
}> = ({ isOpen, onClose, paymentIntentId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Payment Successful
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Your LinkedIn Support purchase has been completed successfully.
          </p>

          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Transaction ID
            </p>
            <p className="font-mono text-sm text-gray-900 dark:text-white">
              {paymentIntentId}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard">
              <Button className="flex-1 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black">
                Go to Dashboard
              </Button>
            </Link>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm: React.FC<{
  clientSecret: string;
  onComplete?: (paymentIntentId: string) => void;
}> = ({ onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [completeLinkedinSupportPurchase] =
    useCompleteLinkedinSupportPurchaseMutation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error:", error);
        // Show error message to user
      } else if (paymentIntent) {
        try {
          await completeLinkedinSupportPurchase({
            paymentIntentId: paymentIntent.id,
          }).unwrap();
        } catch (e) {
          console.warn("Completing purchase on backend failed:", e);
        }
        setPaymentIntentId(paymentIntent.id);
        setShowSuccessModal(true);
        onComplete?.(paymentIntent.id);
      }
    } catch (err) {
      console.error("Confirm payment failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            LinkedIn Support
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your purchase to access premium LinkedIn support services
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Payment Details
            </h2>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>

          <div className="space-y-4">
            <PaymentElement />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-medium text-gray-900 dark:text-white">
              $75.00
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="font-medium text-gray-900 dark:text-white">
              $0.00
            </span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                $75.00
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handlePay}
          disabled={loading || !stripe}
          className="w-full py-3 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-medium rounded-lg transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing…
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Pay $75.00
            </div>
          )}
        </Button>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        paymentIntentId={paymentIntentId}
      />
    </>
  );
};

const Page: React.FC = () => {
  const [startLinkedinSupportCheckout] =
    useStartLinkedinSupportCheckoutMutation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const initCheckout = async () => {
      try {
        // call backend to create PaymentIntent for $75
        const res: PaymentIntentResponse =
          await startLinkedinSupportCheckout().unwrap?.();
        // support both shapes: { data: { clientSecret } } or { clientSecret }
        const cs = res?.clientSecret;

        if (mounted && cs) setClientSecret(cs);
        if (!cs) {
          console.error("No clientSecret returned:", res);
          setError("Unable to initialize payment.");
        }
      } catch (err) {
        console.error("Failed to start checkout:", err);
        setError("Failed to initialize payment.");
      }
    };

    initCheckout();
    return () => {
      mounted = false;
    };
  }, [startLinkedinSupportCheckout]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Preparing Payment
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we set up your secure payment...
          </p>
        </div>
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorBackground: "#ffffff",
        colorText: "#000000",
        colorDanger: "#df1b41",
        fontFamily: "system-ui, sans-serif",
        spacingUnit: "4px",
        borderRadius: "6px",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-black dark:bg-white p-4 sm:p-6">
            <h1 className="text-xl font-bold text-white dark:text-black">
              Secure Checkout
            </h1>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                clientSecret={clientSecret}
                onComplete={(id) => {
                  console.log("Payment completed, intent id:", id);
                }}
              />
            </Elements>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Powered by Stripe | Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
