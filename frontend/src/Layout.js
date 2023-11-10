import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { isLogin } from "./utils/Auth";
import ReactChatBot from "./Components/ChatBot/ReactChatBot";

const Layout = () => {
  const login = isLogin();

  return (
    <>
      {login ? (
        <>
          <Header />
          <Outlet />
          <Footer />
          <ReactChatBot />
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default Layout;
