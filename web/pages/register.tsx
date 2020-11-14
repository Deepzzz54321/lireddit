import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { Button } from "react-bootstrap";
import UserForm from "../components/UserForm";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

export default function register() {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <UserForm title="Sign Up">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <FormikForm className="text-left">
              <InputField type="text" name="username" label="Username" />
              <InputField type="email" name="email" label="EMail" />
              <InputField type="password" name="password" label="Password" />
              <hr />
              <div className="text-center">
                <Button variant="success" type="submit" disabled={isSubmitting}>
                  Sign Up
                </Button>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </UserForm>
  );
}
