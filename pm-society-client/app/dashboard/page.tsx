import MemberLeftPanel from "../components/layout/MemberLeftPanel";
import MemberRightPanel from "../components/layout/MemberRightPanel";
import MiddlePanel from "../components/layout/MiddlePanel";

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Container */}
      <div className="flex flex-col md:grid md:grid-cols-8 gap-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16 py-4">
        
        {/* Left Panel */}
        <aside className="hidden md:block col-span-2">
          <MemberLeftPanel />
        </aside>

        {/* Middle Panel */}
        <main className="col-span-8 md:col-span-4 order-1 md:order-none">
          <MiddlePanel />
        </main>

        {/* Right Panel */}
        <aside className="col-span-2">
          <MemberRightPanel />
        </aside>
      </div>
    </div>
  );
};

export default Page;
