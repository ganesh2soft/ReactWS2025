import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../store-redux/actions/authenticateSignInUser"; // <-- import helper
import { toast } from "react-toastify";

import { Form, Button, Spinner, Container, Card } from "react-bootstrap";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // Use helper instead of inline thunk dispatch
  const loginHandler = (data) => {
    console.log("[loginHandler] Form submitted with:", data);
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card
        style={{ width: "100%", maxWidth: "400px" }}
        className="p-4 shadow-sm"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <AiOutlineLogin size={48} className="text-primary" />
          <h2 className="h4 mt-2">Login Here</h2>
        </div>

        <hr />

        <Form onSubmit={handleSubmit(loginHandler)} noValidate>
          {/* Username Field */}
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              {...register("email", { required: "*Email is required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              {...register("password", { required: "*Password is required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 d-flex justify-content-center align-items-center"
            disabled={loader}
          >
            {loader ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        {/* Register Link */}
        <div className="text-center mt-4">
          <span className="text-muted">Don’t have an account?</span>{" "}
          <Link
            to="/register"
            className="fw-semibold text-decoration-none text-primary"
          >
            Create one now
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default LogIn;
