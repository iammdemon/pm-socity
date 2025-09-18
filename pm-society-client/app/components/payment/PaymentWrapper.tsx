"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { RegistrationForm } from "./RegistrationForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface PaymentWrapperProps {
  selectedPackage: string;
  selectedBilling: string;
  onRegistrationComplete: () => void;
}

export const PaymentWrapper: React.FC<PaymentWrapperProps> = ({
  selectedPackage,
  selectedBilling,
  onRegistrationComplete,
}) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Create PaymentIntent when package changes (for one-time payments)
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!selectedPackage) return;
      
      setIsLoading(true);
      setError("");

      try {
        // Call your API to create PaymentIntent
  
      


        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageType: selectedPackage,
            subscriptionType: selectedBilling === "monthly" || selectedBilling === "yearly" ? selectedBilling : "one_time",
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to initialize payment");
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize payment");
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [selectedPackage, selectedBilling]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="p-8 text-center text-gray-600">
        Please select a package to continue
      </div>
    );
  }

  const elementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#111827',
        colorBackground: '#ffffff',
        colorText: '#111827',
        colorDanger: '#dc2626',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      <RegistrationForm
        selectedPackage={selectedPackage}
        selectedBilling={selectedBilling}
        onRegistrationComplete={onRegistrationComplete}
        clientSecret={clientSecret}
      />
    </Elements>
  );
};