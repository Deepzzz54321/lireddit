import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { Button, Form } from "react-bootstrap";
import UserForm from "../components/UserForm";
import InputField from "../components/InputField";

export default function register() {
  return (
    <UserForm title="Sign Up">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, isSubmitting, handleChange }) => (
          <FormikForm className="text-left">
            <InputField type="text" name="username" label="Username" />
            <InputField type="email" name="email" label="EMail" />
            <InputField type="password" name="password" label="Password" />
            <hr />
            <div className="text-center">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Sign Up
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </UserForm>
  );
}
