import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import Register from "@/components/sections/Register";

export const metadata = {
  title: "Join Community",
  description: "Register to become a member of our tech community",
};

export default function page() {
  return (
    <>
      <Navbar />
      <Register />;
      <Footer />
    </>
  );
}
