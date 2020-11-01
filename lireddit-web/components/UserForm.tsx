import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default function UserForm({ title, children }) {
  return (
    <Container style={{ marginTop: "7rem" }}>
      <Row className="justify-content-center">
        <Col md="5">
          <Card className="text-center">
            <Card.Header>
              <h3 className="text-primary">{title}</h3>
            </Card.Header>
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
