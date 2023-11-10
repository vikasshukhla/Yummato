import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Layout from "./Layout";
import Restaurant from "./Pages/Restaurant";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";
import Register from "./Components/Authentication/Register";
import Login from "./Components/Authentication/Login";
import OrderSummary from "./Pages/OrderSummary";
import OrderHistory from "./Pages/OrderHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import AuthContext from "./store/auth-context";
import OrderHistoryId from "./Pages/OrderHistoryId";
import OrderHistoryAdmin from "./Pages/OrderHistoryAdmin";
import { LoginSuccess } from "./containers/loginSuccess";
import ChatBot from "react-simple-chatbot";
import ReactChatBot from "./Components/ChatBot/ReactChatBot";
import LoginFailure from "./containers/loginSuccess/LoginFailure";
import ResetPassword from "./Pages/ResetPassword";
import UserProfile from "./Pages/UserProfile";

function App() {
  const [login, setLogin] = useState(false);
  const steps = [
    {
      id: "0",
      message: "Welcome to react chatbot!",
      trigger: "1",
    },
    {
      id: "1",
      message: "Bye!",
      end: true,
    },
  ];

  return (
    <AuthContext.Provider value={{ login: login }}>
      <ToastContainer
        autoClose={2000}
        toastStyle={{
          background: "#00FF00 !important",
          color: "white !important",
          fontWeight: "bold",
        }}
        position="top-right"
      />

      <BrowserRouter>
        <Routes>
          <Route exact path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route exact path="/login/success" element={<LoginSuccess />} />
          <Route path="/login/error" element={<LoginFailure />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="restaurant" element={<Restaurant />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="contact" element={<Contact />}></Route>
            <Route path="*" element={<div>404 Error</div>}></Route>
            <Route path="shoppingcart" element={<ShoppingCart />}></Route>
            <Route path="ordersummary" element={<OrderSummary />}></Route>
            <Route path="orderhistory" element={<OrderHistory />}></Route>
            <Route path="orderhistory/:id" element={<OrderHistoryId />}></Route>
            <Route
              path="orderhistoryadmin"
              element={<OrderHistoryAdmin />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
