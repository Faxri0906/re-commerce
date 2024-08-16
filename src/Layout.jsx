import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
        <Navbar />
        <Toaster />
        <Outlet />
    </>
  );
};

export default Layout;