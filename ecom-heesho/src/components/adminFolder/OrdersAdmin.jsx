// src/components/admin/OrdersAdmin.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { ORDER_API_BASE } from "../misc/constants";
const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${ORDER_API_BASE}/admin/getallorders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setStatus(order.orderStatus);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const updateOrderStatus = async () => {
    try {
      const updatedOrder = { ...selectedOrder, orderStatus: status };
      await axios.put(
        `${ORDER_API_BASE}/admin/update/${selectedOrder.orderId}`,
        updatedOrder
      );
      fetchOrders();
      closeModal();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Orders</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.email}</td>
                  <td>{order.orderDate}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.address}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => openModal(order)}
                    >
                      View / Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order #{selectedOrder?.orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Email:</strong> {selectedOrder?.email}
          </p>
          <p>
            <strong>Order Date:</strong> {selectedOrder?.orderDate}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{selectedOrder?.totalAmount}
          </p>
          <p>
            <strong>Address:</strong> {selectedOrder?.address}
          </p>
          <Form.Group>
            <Form.Label>Order Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={handleStatusChange}
            >
              <option>Confirmed</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={updateOrderStatus}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrdersAdmin;
