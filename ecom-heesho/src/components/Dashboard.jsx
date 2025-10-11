import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ Move this outside of JSX
  console.log("Dashboard token:", token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
        <hr />
        <p>This is a protected page visible only after login.</p>

        {/* ✅ This is now valid JSX */}
        <p>Your token: {token}</p>

        <Button variant="danger" onClick={handleLogout} className="mt-3">
          Logout
        </Button>
      </Card>
    </Container>
  );
};

export default Dashboard;
