"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { SuccessCard } from "../components/payment/SuccessCard";
import { packages, RegistrationForm } from "../components/payment/RegistrationForm";
import { PackageCard } from "../components/payment/PackageCard";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function EnrollmentPage() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedBilling, setSelectedBilling] = useState("monthly");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <SuccessCard />
      </div>
    );
  }

  return (
    <> <Header/>
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Project Management Path
            </h1>
            <p className="text-xl text-gray-600">
              From beginner to expert, find the perfect package for your journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Package</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    selectedPackage={selectedPackage}
                    selectedBilling={selectedBilling}
                    onSelect={setSelectedPackage}
                    onBillingChange={setSelectedBilling}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <RegistrationForm
                selectedPackage={selectedPackage}
                selectedBilling={selectedBilling}
                onRegistrationComplete={() => setRegistrationComplete(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </Elements>
    <Footer/>
    </>
  );
}
