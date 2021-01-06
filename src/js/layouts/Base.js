import React from "react";
import Navbar from "../components/Navbar";

const BaseLayout = ({ children, ...props }) => {
  return (
    <>
      <Navbar {...props} />
      {children}
    </>
  );
};

export default BaseLayout;
