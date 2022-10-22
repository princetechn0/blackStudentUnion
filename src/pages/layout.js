import { Outlet, Link } from "react-router-dom";
import Navbar2 from "../components/navbar";

const Layout = () => {
  return (
    <>
      <Navbar2></Navbar2>
      <Outlet />
    </>
  );
};

export default Layout;
