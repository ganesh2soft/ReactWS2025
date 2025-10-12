import React from "react";

const PaymentsAdmin = () => {
  const dummyPayments = [
    {
      id: 101,
      email: "alice@example.com",
      orderId: "ORD001",
      method: "Credit Card",
      amount: "$120.00",
      status: "Completed",
    },
    {
      id: 102,
      email: "bob@example.com",
      orderId: "ORD002",
      method: "PayPal",
      amount: "$80.00",
      status: "Pending",
    },
    {
      id: 103,
      email: "charlie@example.com",
      orderId: "ORD003",
      method: "UPI",
      amount: "$150.00",
      status: "Failed",
    },
  ];

  return (
    <section>
      <h2>Payments Management</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "1rem", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Email</th>
            <th>Order ID</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.email}</td>
              <td>{payment.orderId}</td>
              <td>{payment.method}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PaymentsAdmin;
