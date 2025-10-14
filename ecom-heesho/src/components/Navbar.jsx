import React from "react";
import { Container, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Make sure you have a logo here
import { OverlayTrigger, Tooltip } from "react-bootstrap";
function AppNavbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const roles = localStorage.getItem("ROLES"); // get roles string
  console.log("User roles from localStorage:", roles);

  // Check if user is admin
  const isAdmin = roles === "ROLE_ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("ROLES");
    navigate("/login");
  };
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm navbar-custom-font">
      <Container fluid>
        {/* Logo and Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src={logo}
            alt="Company Logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          <span className="fw-bold fs-4 text-primary">Heesho</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/offers">
              Offers
            </Nav.Link>
          </Nav>
          {/* Search Bar */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search products"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/ordersandreturns">
              Orders & Returns
            </Nav.Link>
          </Nav>
          <Nav>
            {userName ? (
              <>
                <Navbar.Text className="me-3 text-warning">
                  👋 Logged in as {userName}
                </Navbar.Text>
                <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                SignUp/Login
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isAdmin ? (
              <Nav.Link as={Link} to="/adminpanel">
                Admin Panel
              </Nav.Link>
            ) : (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-disabled">Access Denied</Tooltip>}
              >
                <span
                  style={{
                    color: "#aaa",
                    cursor: "not-allowed",
                    userSelect: "none", // optional, to prevent text selection
                    display: "inline-block",
                  }}
                  // Don't use pointerEvents:none here, so tooltip can trigger
                >
                  Admin Panel
                </span>
              </OverlayTrigger>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
