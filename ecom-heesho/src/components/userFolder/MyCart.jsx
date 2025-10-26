import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { CART_API_BASE } from "../misc/constants";

const MyCart = () => {
  const [cart, setCart] = useState({ products: [] }); // products = mapped CartItemDTO
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({}); // productId -> boolean
  const [quantities, setQuantities] = useState({}); // productId -> quantity

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${CART_API_BASE}/userrelated/cart/${encodeURIComponent(email)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Map CartItemDTO to frontend-friendly format
        const cartItems = res.data.cartItemDTO.map((item) => ({
          productId: item.product.productId,
          productName: item.product.productName,
          price: item.product.specialPrice,
          discount: item.product.discount || 0,
          quantity: item.placedQty, // quantity in cart
          maxQty: item.product.quantity, // stock available
        }));

        setCart({ products: cartItems });

        // Initialize quantities and selection
        const initialQuantities = {};
        const initialSelection = {};
        cartItems.forEach((item) => {
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
  if (items.length === 0)
    return <div className="container mt-4">No items in your cart.</div>;

  // Toggle selection
  const toggleSelect = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Update quantity with maxQty enforcement
  const updateQuantity = (productId, delta, maxQty) => {
    setQuantities((prev) => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.min(Math.max(1, currentQty + delta), maxQty);
      return { ...prev, [productId]: newQty };
    });
  };

  // Compute price after discount
  const priceAfterDiscount = (price, discount) => price * (1 - discount / 100);

  // Compute total for selected items
  const selectedTotal = items.reduce((sum, item) => {
    if (selectedProducts[item.productId]) {
      const qty = quantities[item.productId] || item.quantity;
      return sum + priceAfterDiscount(item.price, item.discount) * qty;
    }
    return sum;
  }, 0);

  // Prepare order items for payment
  const selectedOrderItems = items
    .filter((item) => selectedProducts[item.productId])
    .map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: quantities[item.productId] || item.quantity,
      price: priceAfterDiscount(item.price, item.discount),
    }));

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
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-outline-danger rounded-start"
                      onClick={() =>
                        updateQuantity(item.productId, -1, item.maxQty)
                      }
                    >
                      -
                    </button>
                    <button className="btn btn-sm btn-light px-3" disabled>
                      {qty}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success rounded-end"
                      onClick={() =>
                        updateQuantity(item.productId, 1, item.maxQty)
                      }
                      disabled={qty >= item.maxQty} // disable if max reached
                    >
                      +
                    </button>
                  </div>
                  {qty >= item.maxQty && (
                    <small className="text-danger d-block">
                      Max available reached
                    </small>
                  )}
                </td>
                <td>
                  ₹
                  {(
                    priceAfterDiscount(item.price, item.discount) * qty
                  ).toFixed(2)}
                </td>
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
            navigate("/dashboard/paymentpage", {
              state: {
                orderItems: selectedOrderItems,
                total: selectedTotal.toFixed(2),
              },
            });
          }}
        >
          {selectedTotal > 0 ? "Pay Now" : "Select Products to Continue"}
        </button>
      </div>
    </div>
  );
};

export default MyCart;
