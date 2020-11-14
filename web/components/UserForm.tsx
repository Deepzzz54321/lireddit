import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

interface UserFormProps {
  title: string;
  children?: React.ReactNode;
}

const UserForm: React.FC<UserFormProps> = ({ title, children }) => {
  return (
    <Container style={{ marginTop: "7rem" }}>
      <Row className="justify-content-center">
        <Col md="5">
          <Card className="text-center shadow">
            <Card.Header>
              <h3 className="text-primary my-auto">{title}</h3>
            </Card.Header>
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
