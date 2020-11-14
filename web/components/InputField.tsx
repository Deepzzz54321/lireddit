import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  label: string;
  placeholder?: string;
  name: string;
};

export default function InputField(props: InputFieldProps) {
  const [field, { error }] = useField(props);

  return (
    <Form.Group controlId={field.name}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        {...field}
        type={props.type}
        placeholder={props.placeholder || props.label}
        isInvalid={!!error}
      />
      {error ? (
        <Form.Control.Feedback type="invalid" className="text-capitalize">
          {error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}
