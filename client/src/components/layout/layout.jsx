import React from "react";
import { Toaster } from "react-hot-toast";
import AppNavBar from "./appNavBar.jsx";
import Footer from "./footer.jsx";

const Layout = (props) => {
  return (
    <>
      <AppNavBar />
      {props.children}
      <Toaster position="bottom-center" />
      <Footer />
    </>
  );
};

export default Layout;
