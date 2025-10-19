import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CART_API_BASE } from "../misc/constants";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const { orderItems = [], total = 0 } = state || {};

  const handlePayment = async (success = true) => {
    if (!success) {
      alert("❌ Payment failed. Your cart items are retained.");
      navigate("/dashboard/mycart");
      return;
    }
    try {
      const productIds = orderItems.map((item) => item.productId);
      await axios.delete(
        `${CART_API_BASE}/userrelated/cart/${encodeURIComponent(
          email
        )}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: productIds,
        }
      );
      alert("✅ Payment successful! Items removed from cart.");
      navigate("/dashboard/myorders"); // or wherever you want after payment
    } catch (err) {
      console.error("Error removing items after payment", err);
      alert("Payment succeeded but failed to update cart.");
      navigate("/dashboard/myorders");
    }
  };

  if (!orderItems.length) {
    return <div className="container mt-4">No items to pay for.</div>;
  }

  return (
    <div className="container mt-4">
      <h3>💳 Payment</h3>
      <ul className="list-group mb-3">
        {orderItems.map((item) => (
          <li
            key={item.productId}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              {item.productName} × {item.quantity}
            </div>
            <div>₹{(item.price * item.quantity).toFixed(2)}</div>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between fw-bold">
          <div>Total</div>
          <div>₹{total}</div>
        </li>
      </ul>

      <div className="d-flex gap-3">
        <button className="btn btn-success" onClick={() => handlePayment(true)}>
          Simulate Payment Success
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => handlePayment(false)}
        >
          Simulate Payment Failure
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
