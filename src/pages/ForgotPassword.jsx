import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import ToastNotification from "../components/ToastNotification";

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { forgotPassword } = useAuth();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  console.log(query.get("oobCode"));
  console.log(query.get("mode"));
  console.log(query.get("continueUrl"));

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await forgotPassword(emailRef.current.value);
      setMessage("Check your email for further instructions");
    } catch {
      setError("Failed to reset the password");
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <>
      {error && (
        <ToastNotification
          title="¡Algo salió mal!"
          body={message}
          variant="Danger"
        />
      )}

      {message && (
        <ToastNotification title="¡Excelente!" body={message} variant="Light" />
      )}
      <Card>
        <Card.Body>
          <img
            src="../src/assets/mascotapp.png"
            style={{ height: "200px", width: "150px" }}
            className="mt-0 pt-0"
          />
          <h2 className="text-center mb-4">Cambia tu contraseña</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button type="submit" className="w-100 mt-2 " disabled={loading}>
              Cambia tu contraseña
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
