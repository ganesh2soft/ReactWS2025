import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CART_API_BASE } from "../misc/constants";
import { ORDER_API_BASE } from "../misc/constants";
const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${CART_API_BASE}/users/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  const placeOrder = async (paymentMethod = "COD") => {
    if (!cart) return;

    const orderPayload = {
      address: cart.address || "User Address", // or ask user
      pgName: paymentMethod,
      pgPaymentId: "dummy123",
      pgStatus: "SUCCESS",
      pgResponseMessage: "Paid successfully",
    };

    try {
      // 1. Place the order
      await axios.post(
        `${ORDER_API_BASE}/order/users/payments/${paymentMethod}`,
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2. Optionally: Clear cart or fetch updated one
      // 3. Redirect to orders
      navigate("/dashboard/myorders");
    } catch (err) {
      console.error("Order failed", err);
      alert("Payment failed or order API issue.");
    }
  };

  if (!cart)
    return <div className="container mt-4">Loading cart for payment...</div>;

  const totalAmount = cart.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>💳 Confirm Payment</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-secondary">
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className="text-end fw-bold">
              Total
            </td>
            <td className="fw-bold text-success">₹{totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-end">
        <button
          className="btn btn-outline-success me-2"
          onClick={() => placeOrder("stripe")}
        >
          Pay with Stripe
        </button>
        <button className="btn btn-primary" onClick={() => placeOrder("COD")}>
          Cash on Delivery
        </button>
      </div>
    </div>
  );
};

export default Payment;
