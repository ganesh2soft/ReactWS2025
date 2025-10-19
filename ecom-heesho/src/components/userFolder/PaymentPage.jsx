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
    if (success) {
      try {
        // Simulate payment success
        for (const item of orderItems) {
          await axios.delete(
            `${CART_API_BASE}/userrelated/cart/${encodeURIComponent(email)}/${
              item.productId
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        alert("✅ Payment successful! Items removed from cart.");
        navigate("/cart"); // or /orders, etc.
      } catch (err) {
        console.error("Error removing items after payment", err);
        alert("Payment succeeded but failed to update cart.");
      }
    } else {
      // Payment failed
      alert("❌ Payment failed. Your cart items are retained.");
      navigate("/cart");
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
