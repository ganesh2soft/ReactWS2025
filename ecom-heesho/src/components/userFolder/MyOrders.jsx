import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/orders/userrelated/${userId}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
        console.log("Fetching orders for user:", userId);
      })
      .catch((err) => {
        console.error("Error fetching orders", err);
        alert("Failed to load order history.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="container mt-4">Loading orders...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-start fw-bold">My Order History</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.orderStatus}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
