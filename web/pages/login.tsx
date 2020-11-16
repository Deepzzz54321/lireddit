import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { Button } from "react-bootstrap";
import UserForm from "../components/UserForm";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <UserForm title="Log In">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <FormikForm className="text-left">
              <InputField type="text" name="username" label="Username" />
              <InputField type="password" name="password" label="Password" />
              <hr />
              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Log In
                </Button>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </UserForm>
  );
};

export default withUrqlClient(createUrqlClient)(login);
