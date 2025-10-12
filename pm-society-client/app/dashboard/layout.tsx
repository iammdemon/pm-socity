
import DashSidebar from "../components/layout/DashSidebar";
import MobileNav from "../components/layout/MobileNav";
import MobileHeader from "../components/layout/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen flex">
      {/* Fixed Sidebar - Always visible on desktop */}
      <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 fixed h-screen z-30">
        <DashSidebar />
      </aside>
      
      {/* Main Content Area - Takes remaining space with left margin for sidebar */}
      <main className="flex-1 lg:ml-64 xl:ml-72 overflow-y-auto">
        {/* Mobile Header - Visible only on mobile */}
        <div className="lg:hidden sticky top-0 z-40">
          <MobileHeader />
        </div>
        
        {/* Content Container with proper padding and max-width */}
        <div >
          {children}
        </div>
        
        {/* Mobile Navigation - Visible only on mobile */}
        <div className="lg:hidden sticky bottom-0 z-40">
          <MobileNav />
        </div>
      </main>
    </div>
  );
}