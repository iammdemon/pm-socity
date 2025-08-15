

export interface Package {
  id: string;
  name: string;
  tagline: string;
  description: string;
  whoItsFor: string;
  features: string[];
  pricing: {
    oneTime?: number;
    monthly?: number;
    yearly?: number;
  };
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}
