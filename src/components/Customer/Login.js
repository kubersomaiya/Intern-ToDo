import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleAdmin = (e) => {
    e.preventDefault();
    history("/admin-login");
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/dashboard");
    } catch {
      setError("Failed to Log In");
    }
    setLoading(false);
  }
  return (
    <>
      <div>
        <h2 className="text-dark text-center my-4 py-4">ToDo App</h2>
          {/* <small>Welcome to ToDo App</small> */}
      </div>
      <Card>
        <Card.Body>
          <h2 className="text text mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
                autoComplete="off"
              />
              <div className="w=100 text-right my-4">
                <NavLink to="/forget-password">Forgot Password?</NavLink>
              </div>
            </Form.Group>
            <div className="d-flex">
              {/* <div className="text-center mt-3"> */}
                <Button
                  onClick={handleAdmin}
                  className=" mx-2 btn orBtn"
                  variant="outline-dark"
                >
                  Admin Login
                </Button>
              {/* </div> */}
              {/* <div className="text-center mt-3"> */}
                <Button
                  disabled={loading}
                  className="btn btn-warning orBtn text-white mx-5"
                  type="submit"
                >
                  Login
                </Button>
              {/* </div> */}
            </div>
          </Form>

          <div className="w-100 text-center mt-3">
            Need an account? <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
