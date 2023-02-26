import React, { useEffect, useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "../hooks/useQuery";

export const ResetPassword = () => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { resetPassword, setMode, setOobCode, oobCode, setPasswordChanged } =
    useAuth();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    setMode(query.get("mode"));
    setOobCode(query.get("oobCode"));
    console.log(window.location.pathname);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(query.get("oobCode"), passwordRef.current.value);
      setMessage("Check your email for further instructions");
      setPasswordChanged(true);
      navigate("/success");
    } catch (error) {
      setPasswordChanged(false);
      setError("Failed to reset the password");
      console.log(error);
      setLoading(true);
    }
    setLoading(false);
  }
  return (
    <div className="h-100">
      <Card>
        <Card.Body>
          <img
            src="../src/assets/mascotapp.png"
            style={{ height: "200px", width: "150px" }}
            className="mt-0 pt-0"
          />
          <h2 className="text-center mb-4">Cambia tu contraseña</h2>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          {message && (
            <Alert variant="success" className="text-center">
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confirma tu contraseña</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button
              type="submit"
              className="w-100 mt-2 $indigo-700"
              disabled={loading}
            >
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
