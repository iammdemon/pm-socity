import React from "react";

import { Check, Star } from "lucide-react";
import { Package } from "@/types/package";

interface PackageCardProps {
  pkg: Package;
  selectedPackage: string;
  selectedBilling: string;
  onSelect: (id: string) => void;
  onBillingChange: (billing: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  selectedPackage,
  selectedBilling,
  onSelect,
  onBillingChange,
}) => {
  const isSelected = selectedPackage === pkg.id;
  const hasSubscription = pkg.pricing.monthly || pkg.pricing.yearly;

  const getPriceDisplay = () => {
    if (pkg.pricing.oneTime) return `$${pkg.pricing.oneTime}`;
    if (selectedBilling === "monthly") return `$${pkg.pricing.monthly}/mo`;
    if (selectedBilling === "yearly") return `$${pkg.pricing.yearly}/yr`;
    return "";
  };

  return (
    <div
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? "border-black ring-4 ring-black ring-opacity-20"
          : "border-gray-200 hover:border-gray-300"
      } ${pkg.gradient}`}
      onClick={() => onSelect(pkg.id)}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-4 h-4" />
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${pkg.color} text-white`}>
          {pkg.icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{getPriceDisplay()}</div>
          {hasSubscription && (
            <div className="text-sm text-gray-500">
              {selectedBilling === "yearly" ? "Save 2 months!" : "Billed monthly"}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
      <p className="text-lg font-semibold text-gray-700 mb-2">{pkg.tagline}</p>
      <p className="text-gray-600 mb-3">{pkg.description}</p>
      <p className="text-sm text-gray-500 mb-4 italic">{pkg.whoItsFor}</p>

      {hasSubscription && (
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedBilling === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onBillingChange("monthly");
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedBilling === "yearly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onBillingChange("yearly");
            }}
          >
            Yearly
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
