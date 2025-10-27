import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MyCart from "./MyCart";
import MyOrderHistory from "./MyOrderHistory";
import MyProfile from "./MyProfile";
import PaymentPage from "./PaymentPage";
import { Button } from "react-bootstrap";
import OrderingPage from "./OrderingPage";

const Dashboard = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  return (
    <div className="mt-4 container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary mb-0">Welcome to Your Dashboard</h2>

        {/* 🌟 Decorative Right-Aligned Button */}
        <Button
          variant="outline-success"
          size="lg"
          className="fw-semibold shadow-sm"
          onClick={() => navigate("/")}
        >
          🛍️ Shop More
        </Button>
      </div>

      {userName && (
        <p className="text-muted">
          👋 Logged in as: <strong>{userName}</strong>
        </p>
      )}

      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/dashboard/mycart")}
        >
          My Cart
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => navigate("/dashboard/myorderhistory")}
        >
          My Orders History
        </button>
        <button
          className="btn btn-info text-white"
          onClick={() => navigate("/dashboard/myprofile")}
        >
          My Profile
        </button>
      </div>

      <hr />

      <Routes>
        <Route path="mycart" element={<MyCart />} />
        <Route path="myorderhistory" element={<MyOrderHistory />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="paymentpage" element={<PaymentPage />} />
        <Route index element={<p>Please select a section.</p>} />
        <Route path="orderingpage" element={<OrderingPage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
