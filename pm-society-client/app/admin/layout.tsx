import AdminSidebar from "../components/layout/AdminSidebar";
import Footer from "../components/layout/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 min-w-0 lg:ml-64 transition-all duration-300">
        {children}
        <Footer />
      </main>
    </div>
  );
}
