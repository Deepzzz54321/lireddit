import React, { useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import { Alert, Button } from "react-bootstrap";
import InputField from "../components/InputField";
import UserForm from "../components/UserForm";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [successMessage, setSucessMessage] = useState("");
  return (
    <UserForm title="Reset Password">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          const response = await forgotPassword({
            email: values.email,
          });
          if (response.data?.forgotPassword) {
            setSucessMessage(
              "Please check your email inbox for a link to change your password!"
            );
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <FormikForm className="text-left">
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              <InputField type="email" name="email" label="Email" />
              <hr />
              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Send Email
                </Button>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </UserForm>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
