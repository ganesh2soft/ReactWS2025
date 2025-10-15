import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://localhost:8082/api/carts"; // Change if needed

const CartAdmin = () => {
  const [carts, setCarts] = useState([]);

  // Fetch all carts on component mount
  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(`${API_BASE}/getcarts`, config);
      setCarts(res.data);
    } catch (err) {
      console.error("Error fetching carts:", err);
    }
  };

  // Delete cart by ID
  const handleDelete = async (cartId) => {
    if (window.confirm("Are you sure you want to delete this cart?")) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`${API_BASE}/${cartId}`, config);
        fetchCarts(); // refresh list after deletion
      } catch (err) {
        console.error("Error deleting cart:", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">🛒 Cart Management</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-info">
          <tr>
            <th>Cart ID</th>
            <th>User ID</th>
            <th>Items Count</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts.length > 0 ? (
            carts.map((cart) => (
              <tr key={cart.cartId}>
                <td>{cart.cartId}</td>
                <td>{cart.userId}</td>
                <td>{cart.items ? cart.items.length : 0}</td>
                <td>₹{cart.totalPrice?.toFixed(2) || 0}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cart.cartId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No carts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartAdmin;
