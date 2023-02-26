import React from "react";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container fluid className="d-flex flex-column  flex-md-row align-middle">
      <div className="d-flex flex-column justify-content-center align-middle">
        <h2
          className="header position-relative lh-1"
          style={{ fontSize: "16vw" }}
        >
          404
        </h2>
        <h4>LO SENTIMOS</h4>
        <p>La URL {window.location.pathname} no fue encontrada.</p>
      </div>
      <img
        src="../src/assets/dog-cat-ball.jpg"
        alt="Dog confused cat yarn ball"
        style={{ height: "350px", width: "350px" }}
        className="img-fluid max-width: 100%;"
      />
    </Container>
  );
};

export default NotFound;
