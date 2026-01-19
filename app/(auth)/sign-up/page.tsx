import CreateAccount from "@/components/auth/create-account-form";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Create Admin Account",
};

function page() {
  return (
    <main>
      <div className="mt-20">
        <Navbar />
        <CreateAccount />;
        <Footer />
      </div>
    </main>
  );
}

export default page;
