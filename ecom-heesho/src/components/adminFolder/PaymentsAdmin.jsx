// src/components/admin/PaymentAdmin.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentAdmin = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/payments/admin/all"
      );
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
              <th>Response Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.pgPaymentId}</td>
                  <td>{payment.pgName}</td>
                  <td>{payment.pgResponseMessage}</td>
                  <td>
                    <span
                      className={`badge ${
                        payment.pgStatus === "Success"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {payment.pgStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
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
