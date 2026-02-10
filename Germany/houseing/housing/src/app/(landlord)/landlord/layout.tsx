import LandlordSidebar from "@/components/landlord/LandlordSidebar";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <LandlordSidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}