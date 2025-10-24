

import MobileNav from "../components/layout/MobileNav";
import MobileHeader from "../components/layout/MobileHeader";
import ExchangeHeader from "../components/layout/ExchangeHeader";
import MemberLeftPanel from "../components/layout/MemberLeftPanel";
import MemberRightPanel from "../components/layout/MemberRightPanel";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Three Column Layout */}
        <div className="flex flex-1 h-full w-full">
          {/* Left Panel */}
          <div className="w-80 flex-shrink-0 overflow-hidden">
            <MemberLeftPanel />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="flex-shrink-0">
              <ExchangeHeader />
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>

          {/* Right Panel */}
          <div className="w-80 flex-shrink-0 overflow-hidden">
            <MemberRightPanel />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-screen">
        <div className="sticky top-0 z-40">
          <MobileHeader />
        </div>
        <main className="flex-1 overflow-y-auto pb-16">{children}</main>
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <MobileNav />
        </div>
      </div>

  
     
    </div>
  );
}
