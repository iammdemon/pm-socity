
import Header from "../components/layout/DashHeader";

import MobileNav from "../components/layout/MobileNav";
import MobileHeader from "../components/layout/MobileHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 text-black dark:text-white space-y-2">
     
        <MobileHeader />
        <Header />
        <main className="pt-16 pb-16 md:pb-0 max-w-7xl mx-auto">
          {children}
        </main>
        <MobileNav />
      
    </div>
  );
}
