import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// const eye = <FontAwesomeIcon icon={faEye} />;

const AdminLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (
        emailRef.current.value === "test@test.com" &&
        passwordRef.current.value === "pass@123"
      ) {
        console.log("entered")
        await login(emailRef.current.value, passwordRef.current.value);
        console.log("entered")
        navigate("/admin-panel");
      } else {
        setError("Failed to sign in!");
      }
    } catch {
      setError("Failed to sign in!");
    }

    setLoading(false);
  }
  function handleLogin() {
    navigate("/");
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text mb-4">Admin Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
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
            </Form.Group>
            <div className="d-flex">
                <Button onClick={handleLogin} className="my-4" variant="outline-dark">
                  Go To Customer Login
                </Button>
                <Button disabled={loading} onClick={handleSubmit} className="my-4 mx-3 btn-warning text-white">
                  Login
                </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminLogin;
