import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
