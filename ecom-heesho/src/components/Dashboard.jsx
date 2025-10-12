import React from "react";
import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  const userName = localStorage.getItem("userName"); // optional

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
        <hr />
        <p>This is a protected page visible only after login.</p>

        {userName && (
          <p>
            👋 Logged in as: <strong>{userName}</strong>
          </p>
        )}
      </Card>
    </Container>
  );
};

export default Dashboard;
