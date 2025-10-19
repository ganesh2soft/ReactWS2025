import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MyCart = () => {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({}); // productId -> boolean
  const [quantities, setQuantities] = useState({}); // productId -> quantity

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

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
        setCart(res.data);

        // Initialize quantities and selection state
        const initialQuantities = {};
        const initialSelection = {};
        res.data.products.forEach((item) => {
          initialQuantities[item.productId] = item.quantity;
          initialSelection[item.productId] = false;
        });

        setQuantities(initialQuantities);
        setSelectedProducts(initialSelection);
      } catch (err) {
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

  if (loading) return <div className="container mt-4">Loading cart…</div>;
  if (error)
    return (
      <div className="container mt-4">Failed to load cart: {error.message}</div>
    );

  const items = Array.isArray(cart.products) ? cart.products : [];

  if (items.length === 0) {
    return <div className="container mt-4">No items in your cart.</div>;
  }

  // Handle checkbox toggle
  const toggleSelect = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Handle quantity update
  const updateQuantity = (productId, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[productId] || 1) + delta);
      return { ...prev, [productId]: newQty };
    });
  };

  // Compute total of selected items
  const selectedTotal = items.reduce((sum, item) => {
    if (selectedProducts[item.productId]) {
      const qty = quantities[item.productId] || item.quantity;
      return sum + item.price * qty;
    }
    return sum;
  }, 0);

  return (
    <div className="container mt-4">
      <h3>🛒 My Cart</h3>
      <table className="table table-bordered align-middle">
        <thead className="table-danger">
          <tr>
            <th>Select</th>
            <th>Product</th>
            <th style={{ width: "150px" }}>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const qty = quantities[item.productId] || item.quantity;
            return (
              <tr key={item.productId}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts[item.productId] || false}
                    onChange={() => toggleSelect(item.productId)}
                  />
                </td>
                <td>{item.productName}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Quantity control"
                  >
                    <button
                      className="btn btn-sm btn-outline-danger rounded-start"
                      onClick={() => updateQuantity(item.productId, -1)}
                      title="Decrease quantity"
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <button className="btn btn-sm btn-light px-3" disabled>
                      {qty}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success rounded-end"
                      onClick={() => updateQuantity(item.productId, 1)}
                      title="Increase quantity"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </td>
                <td>₹{(item.price * qty).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h5>
          Selected Total: <strong>₹{selectedTotal.toFixed(2)}</strong>
        </h5>
        <button
          className="btn btn-success"
          disabled={selectedTotal === 0}
          onClick={() => {
            // placeholder: next step could go to payment or order confirmation
            alert("Proceeding to next step (Order or Payment)");
          }}
        >
          {selectedTotal > 0 ? "Order Now" : "Select Products to Continue"}
        </button>
      </div>
    </div>
  );
};

export default MyCart;
