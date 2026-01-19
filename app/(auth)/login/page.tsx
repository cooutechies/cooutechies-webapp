import Login from "@/components/auth/login-form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "LogIn TO Admin Dashboard",
};

function page() {
  return (
    <main>
      <div className="mt-14">
        <Navbar />
        <Login />;
        <Footer />
      </div>
    </main>
  );
}

export default page;
