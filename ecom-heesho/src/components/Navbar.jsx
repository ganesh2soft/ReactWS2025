import React from "react";
import { Container, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Make sure you have a logo here

function AppNavbar() {
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
            <Nav.Link as={Link} to="/products">
              Products
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
            <Nav.Link as={Link} to="/login">
              SignUp/Login
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
