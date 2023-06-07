import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
