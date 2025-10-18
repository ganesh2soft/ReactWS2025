import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/orders/userrelated/${userId}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
        console.log("Orders data:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders", err);
        alert("Failed to load order history.");
        setLoading(false);
      });
  }, [userId]);

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeDetails = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return <div className="container mt-4">Loading orders...</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Orders</h3>
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
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.orderStatus}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <button
                      className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontWeight: "strong",
                        padding: 0,
                        color: "green",
                      }}
                      onClick={() => openDetails(order)}
                      title="View Details"
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      <Modal show={showModal} onHide={closeDetails} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details - #{selectedOrder?.orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.orderStatus}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.address}
              </p>
              <hr />
              <h6>Items:</h6>

              <div className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderItems?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.productName || item.product?.productName}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price || item.product?.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                <h6>Payment Details:</h6>
                <p>
                  <strong>Payment ID:</strong>{" "}
                  {selectedOrder.payment?.paymentId || "N/A"}
                </p>
                <p>
                  <strong>Method:</strong>{" "}
                  {selectedOrder.payment?.paymentMethod || "N/A"}
                </p>
                <p>
                  <strong>PG Payment ID:</strong>{" "}
                  {selectedOrder.payment?.pgPaymentId || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedOrder.payment?.pgStatus || "N/A"}
                </p>
                <p>
                  <strong>Response Message:</strong>{" "}
                  {selectedOrder.payment?.pgResponseMessage || "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <p>No order selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyOrders;
