import React, { useState } from "react";
import { Formik, Form as FormikForm, FormikValues, FormikErrors } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Alert, Button } from "react-bootstrap";
import InputField from "../../components/InputField";
import UserForm from "../../components/UserForm";
import { useChangePasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <UserForm title="Reset Password">
      <Formik
        initialValues={{ password: "", password2: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            password: values.password,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
        validate={(values: FormikValues) => {
          let errors: FormikErrors<FormikValues> = {};
          if (values.password != values.password2) {
            errors.password2 = "Passwords don't match!";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => {
          return (
            <FormikForm className="text-left">
              {tokenError && <Alert variant="danger">{tokenError}</Alert>}
              <InputField
                type="password"
                name="password"
                label="New Password"
              />
              <InputField
                type="password"
                name="password2"
                label="Confirm Password"
              />
              <hr />
              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Reset Password
                </Button>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </UserForm>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
