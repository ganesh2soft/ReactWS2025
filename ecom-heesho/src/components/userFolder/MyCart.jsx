import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCart = () => {
  const [cart, setCart] = useState({ products: [] }); // initialize with shape
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email"); // parse if saved as JSON string

  console.log("Email from localStorage:", email);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8082/api/carts/userrelated/cart/${encodeURIComponent(
            email
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched cart data:", res.data);
        setCart(res.data);
      } catch (err) {
        console.error("Failed to fetch cart", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token && email) {
      fetchCart();
    } else {
      setLoading(false);
      setError(new Error("User not logged in or email missing"));
    }
  }, [token, email]);

  if (loading) {
    return <div className="container mt-4">Loading cart…</div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <p>Failed to load cart: {error.message}</p>
      </div>
    );
  }

  // Use your returned shape: according to your logs you had { cartId: 902, totalPrice: 0, products: [...] }
  const items = Array.isArray(cart.products) ? cart.products : [];

  if (items.length === 0) {
    return <div className="container mt-4">No items in your cart.</div>;
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
          {items.map((item) => (
            <tr key={item.productId}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <strong>Total: </strong> ₹
        {(
          cart.totalPrice ||
          items.reduce((sum, it) => sum + it.price * it.quantity, 0)
        ).toFixed(2)}
      </div>
    </div>
  );
};

export default MyCart;
