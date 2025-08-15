"use client";

import React from "react";

export interface Package {
  name: string;
  price: number;
  offeringIntent: string;
  whoFor: string;
  details: string[];
  subscription?: boolean;
  monthlyPrice?: number;
  annualPrice?: number;
}


interface Props {
  packages: Package[];
  selectedPackage: string;
  setSelectedPackage: (pkg: string) => void;
}

export const PackageSelector: React.FC<Props> = ({
  packages,
  selectedPackage,
  setSelectedPackage,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 border-b pb-3">Choose Your Package</h2>
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        {packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.name;
          return (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg.name)}
              className={`cursor-pointer rounded-lg border p-6 transition-shadow ${
                isSelected
                  ? "border-black shadow-lg ring-2 ring-black"
                  : "border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{pkg.name}</h3>
                <span className="text-lg font-bold text-black">
                  $
                  {pkg.subscription
                    ? `${pkg.monthlyPrice}/mo or ${pkg.annualPrice}/yr`
                    : pkg.price}
                </span>
              </div>
              <p className="text-sm mb-2 italic text-gray-700">{pkg.offeringIntent}</p>
              <p className="text-sm mb-3 font-semibold text-gray-900">Who It&apos;s For:</p>
              <p className="text-sm mb-3">{pkg.whoFor}</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                {pkg.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
