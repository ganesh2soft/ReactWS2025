import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CART_API_BASE,
  PAYMENT_API_BASE,
  ORDER_API_BASE,
} from "../misc/constants";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  // When order data is passed from OrderingPage
  const { order = {} } = state || {};
  const { orderItems = [], totalAmount = 0, orderId } = order;

  if (!orderItems.length) {
    return <div className="container mt-4">⚠️ No items to pay for.</div>;
  }

  const handlePayment = async () => {
    try {
      // 1️⃣ Prepare Stripe payload
      const stripePayload = {
        amount: totalAmount, // backend divides by 100
        currency: "usd",
        name: email,
        email: email,
        description: `Payment for order #${orderId}`,
      };

      // 2️⃣ Call backend to create Stripe payment
      const paymentRes = await axios.post(
        `${PAYMENT_API_BASE}/stripe/test/${orderId}`,
        stripePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const paymentDTO = paymentRes.data;
      console.log("✅ Payment response:", paymentDTO);
      const userId = localStorage.getItem("userId");
      // 3️⃣ Fetch updated order (with payment info attached)
      const orderRes = await axios.get(
        `${ORDER_API_BASE}/userrelated/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedOrders = orderRes.data;
      const updatedOrder = updatedOrders.find((o) => o.orderId === orderId);
      console.log("🔄 Updated Order:", updatedOrder);

      // 4️⃣ Remove items from cart (optional cleanup)
      const productIds = orderItems.map(
        (item) => item.productDTO?.productId || item.productId
      );
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

      // 5️⃣ Success message
      alert(
        `✅ Payment successful!\nOrder #${orderId}\nStatus: ${
          updatedOrder?.payment?.pgStatus || "Success"
        }\nGateway: ${updatedOrder?.payment?.pgName || "Stripe"}`
      );

      navigate("/dashboard/myorders");
    } catch (err) {
      console.error("❌ Payment failed:", err);
      alert(`❌ Payment failed: ${err.response?.data || err.message}`);
      navigate("/dashboard/mycart");
    }
  };

  return (
    <div className="container mt-4">
      <h3>💳 Payment for Order #{orderId}</h3>

      <ul className="list-group mb-3">
        {orderItems.map((item) => (
          <li
            key={item.orderItemId}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              {item.productDTO?.productName || "Product"} × {item.placedQty}
            </div>
            <div>₹{(item.orderedProductPrice * item.placedQty).toFixed(2)}</div>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between fw-bold">
          <div>Total</div>
          <div>₹{totalAmount}</div>
        </li>
      </ul>

      <button className="btn btn-success" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
