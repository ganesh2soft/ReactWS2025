import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCart = () => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8082/api/carts/users/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(res.data);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    if (token) {
      fetchCart();
    }
  }, []);

  // ⛔️ While loading or no cart data
  if (!cart || !Array.isArray(cart.cartItems)) {
    return <div className="container mt-4">Loading cart...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>🛒 My Cart</h3>
      <table className="table table-bordered">
        <thead className="table-light">
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
        </tbody>
      </table>
    </div>
  );
};

export default MyCart;
