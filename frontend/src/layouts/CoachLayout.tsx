import { Outlet } from "react-router-dom";
import HeaderCoach from "../components/Common/HeaderCoach";
import Footer from "@/shared/Footer";

const CoachLayout = () => {
  return (
     <div className="flex flex-col min-h-screen">
      <HeaderCoach />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CoachLayout;

