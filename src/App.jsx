import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Sidebar from "./components/Sidebar/Sidebar";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin";
import AddAdmin from "./pages/AddAdmin/AddAdmin";
import ListAdmin from "./pages/ListAdmin/ListAdmin";
import OrdersAdmin from "./pages/OrdersAdmin/OrdersAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import CancelPage from "./pages/CancelPaymentPage/CancelPaymentPage";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      {isAdmin ? (
        <div>
          <ToastContainer />
          <NavbarAdmin setIsAdmin={setIsAdmin} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<AddAdmin />} />
              <Route path="/list" element={<ListAdmin />} />
              <Route path="/orders" element={<OrdersAdmin />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          {showLogin ? (
            <LoginPopup setShowLogin={setShowLogin} setIsAdmin={setIsAdmin} />
          ) : (
            <></>
          )}
          <div className="app">
            <ToastContainer />
            <Navbar setShowLogin={setShowLogin} />
              <Routes>
                <Route path="/" element={<Home isAdmin={isAdmin} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<PlaceOrder />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
              </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
