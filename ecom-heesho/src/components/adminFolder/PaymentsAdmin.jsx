// src/components/admin/PaymentAdmin.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PAYMENT_API_BASE } from "../misc/constants";
const PaymentAdmin = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${PAYMENT_API_BASE}/admin/all`);
      console.log("Fetched payments:", response.data);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">All Payment Records</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover table-sm shadow">
          <thead className="table-warning text-center">
            <tr>
              <th>Payment ID</th>
              <th>Method</th>
              <th>PG Payment ID</th>
              <th>PG Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Customer Email</th>
              <th>Customer Name</th>
              <th>Order ID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.paymentIntentId}</td>
                  <td>{payment.paymentGateway}</td>
                  <td>{payment.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        payment.status === "succeeded"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.amount}</td>
                  <td>{payment.currency}</td>
                  <td>{payment.customerEmail}</td>
                  <td>{payment.customerName}</td>
                  <td>{payment.orderId}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-muted">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentAdmin;
