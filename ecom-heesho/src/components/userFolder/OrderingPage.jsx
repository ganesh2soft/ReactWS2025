import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { ORDER_API_BASE } from "../misc/constants";
const OrderingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get selected items and total passed from cart
  const { orderItems = [], total = 0 } = location.state || {};

  const [quantities, setQuantities] = useState(
    orderItems.reduce((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {})
  );

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email"); // ensure this is stored at login

  if (!orderItems.length) {
    return (
      <div className="container mt-4">
        <p>No items selected. Please go back to your cart.</p>
        <Button onClick={() => navigate("/dashboard/mycart")}>
          Back to Cart
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, prev[productId] + delta);
      return { ...prev, [productId]: newQty };
    });
  };

  const updatedTotal = orderItems.reduce((sum, item) => {
    const qty = quantities[item.productId] || item.quantity;
    return sum + item.price * qty;
  }, 0);

  // ✅ Create order and navigate to payment
  const handleProceedToPayment = async () => {
    if (!email) {
      alert("User email not found. Please log in again.");
      navigate("/login");
      return;
    }

    const orderDTO = {
      orderItems: orderItems.map((item) => ({
        productDTO: { productId: item.productId },
        placedQty: quantities[item.productId],
        orderedProductPrice: item.price,
        discount: item.discount || 0,
      })),
      totalAmount: updatedTotal,
      address: "Default Address", // You can add a form field for this later
      payment: null, // will be updated after payment page
    };

    setLoading(true);

    try {
      const response = await axios.post(
        `${ORDER_API_BASE}/create/${email}`,
        orderDTO
      );

      const createdOrder = response.data;
      console.log("✅ Order created successfully:", createdOrder);

      // Navigate to Payment Page with order data
      navigate("/dashboard/paymentpage", {
        state: { order: createdOrder },
      });
    } catch (error) {
      console.error("❌ Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>📝 Review Your Order</h3>
      <Table bordered hover className="mt-3">
        <thead className="table-secondary">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => {
            const qty = quantities[item.productId];
            return (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, -1)}
                    >
                      -
                    </Button>
                    <Button variant="light" disabled size="sm">
                      {qty}
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, 1)}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>₹{(item.price * qty).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Form.Group className="mb-3">
        <Form.Label>Order Notes (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Add any notes or instructions for your order"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-between align-items-center">
        <h5>
          Total: <strong>₹{updatedTotal.toFixed(2)}</strong>
        </h5>
        <Button
          variant="success"
          onClick={handleProceedToPayment}
          disabled={loading}
        >
          {loading ? "Creating Order..." : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  );
};

export default OrderingPage;
