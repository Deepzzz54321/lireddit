import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import UserForm from "../components/UserForm";

export default function register() {
  return (
    <UserForm title="Sign Up">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <FormikForm className="text-left">
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                // isValid={touched.firstName && !errors.firstName}
              />
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>
            <hr />
            <div className="text-center">
              <Button variant="primary" className="">
                Sign Up
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </UserForm>
  );
}
