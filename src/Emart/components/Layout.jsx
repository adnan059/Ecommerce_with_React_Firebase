import React from "react";
import "../../assets/css/layout.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="main-content min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
