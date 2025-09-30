

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#071018]">
  
      
        {children}
    
    </div>
  );
}
