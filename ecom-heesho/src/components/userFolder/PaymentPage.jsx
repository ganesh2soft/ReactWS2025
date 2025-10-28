import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CART_API_BASE, PAYMENT_API_BASE } from "../misc/constants";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!state?.order) {
      alert("❌ No order found to pay for.");
      navigate("/dashboard/mycart");
      return;
    }
    setOrder(state.order);
  }, [state, navigate]);

  const handlePayment = async () => {
    if (!order || !order.orderItems?.length) {
      alert("❌ No items to pay for.");
      return;
    }

    try {
      // Prepare Stripe payment payload
      const stripePayload = {
        amount: order.totalAmount, // backend will convert to cents if needed
        currency: "usd",
        name: email,
        email: email,
        description: `Payment for order #${order.orderId}`,
      };

      // Call backend Stripe payment endpoint
      const res = await axios.post(
        `${PAYMENT_API_BASE}/stripe/test/${order.orderId}`,
        stripePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const paymentDTO = res.data;

      // Remove paid items from cart
      const productIds = order.orderItems
        .map((item) => item.productDTO?.productId)
        .filter(Boolean);
      if (productIds.length) {
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
      }

      // ✅ Payment success alert
      alert(
        `✅ Payment successful!\nPayment ID: ${paymentDTO.paymentId}\nStatus: ${paymentDTO.pgStatus}`
      );

      navigate("/dashboard/myorders");
    } catch (err) {
      console.error(err);
      // ❌ Payment failure alert
      alert(`❌ Payment failed: ${err.response?.data || err.message}`);
      navigate("/dashboard/mycart");
    }
  };

  if (!order) {
    return <div className="container mt-4">Loading order details...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>💳 Payment for Order #{order.orderId}</h3>
      <ul className="list-group mb-3">
        {order.orderItems.map((item) => (
          <li
            key={item.orderItemId}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              {item.productDTO?.productName || `Product #${item.orderItemId}`} ×{" "}
              {item.placedQty}
            </div>
            <div>₹{item.orderedProductPrice.toFixed(2)}</div>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between fw-bold">
          <div>Total</div>
          <div>₹{order.totalAmount}</div>
        </li>
      </ul>

      <button className="btn btn-success" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
