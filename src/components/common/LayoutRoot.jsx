import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "../../assets/styles/LayoutRoot.module.scss";
import Header from "./Header";
import Footer from "./Footer";

const LayoutRoot = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div
      className={`d-flex justify-content-between flex-column ${classes.layout__root}`}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutRoot;
