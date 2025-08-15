import MemberSidebar from "@/app/components/layout/MemberSidebar";
import Footer from "../components/layout/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 min-w-0  lg:ml-64 transition-all duration-300">
        {children} <Footer />
      </main>
    </div>
  );
}
