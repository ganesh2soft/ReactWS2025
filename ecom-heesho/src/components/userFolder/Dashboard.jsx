import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MyCart from "./MyCart";
import MyOrders from "./MyOrders";
import MyProfile from "./MyProfile";

const Dashboard = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {userName && (
        <p>
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
          onClick={() => navigate("/dashboard/myorders")}
        >
          My Orders
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
        <Route path="myorders" element={<MyOrders />} />
        <Route path="myprofile" element={<MyProfile />} />

        <Route index element={<p>Please select a section.</p>} />
      </Routes>
    </div>
  );
};

export default Dashboard;
