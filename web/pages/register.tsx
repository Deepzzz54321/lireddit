import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { Button, Form } from "react-bootstrap";
import UserForm from "../components/UserForm";
import InputField from "../components/InputField";
import { useMutation } from "urql";

const REGISTER_MUTATION = `
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(options: { username: $username, email: $email, password: $password }) {
      errors {
        field,
        message
      },
      user {
        id,
        username
      }

    }
  }
`;

export default function register() {
  const [, register] = useMutation(REGISTER_MUTATION);

  return (
    <UserForm title="Sign Up">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values) => {
          console.log("Submitting", values);
          const response = await register(values);
        }}
      >
        {({ isSubmitting }) => (
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
