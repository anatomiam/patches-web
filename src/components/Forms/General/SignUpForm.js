import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { withRouter } from "react-router";

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .max(200, "Username must be 200 characters or less")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email addresss`")
    .required("Required"),
  password: Yup.string()
    .max(200, "Password must be 200 characters or less")
    .required("Required")
});

const SignUpForm = React.memo(({ history }) => {
  const [signup] = useMutation(SIGNUP);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: "",
        email: "",
        password: ""
      }}
      validationSchema={SignUpSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        const response = await signup({
          variables: {
            name: values.username,
            email: values.email,
            password: values.password
          }
        });
        console.log(response);
        // history.push("/");
        setSubmitting(false);
      }}
    >
      {({
        dirty,
        values,
        errors,
        handleChange,
        handleReset,
        isSubmitting,
        handleSubmit
      }) => (
        <Form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Field>
            <Input
              id="username"
              label="Username"
              placeholder="Set Username"
              name="username"
              type="text"
              onChange={handleChange}
              value={values.username}
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="email"
              label="Email"
              placeholder="Set Email"
              name="email"
              type="text"
              onChange={handleChange}
              value={values.email}
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="password"
              label="Password"
              placeholder="Set Password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />
          </Form.Field>
          <Button type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
          <Button type="button" disabled={!dirty} onClick={handleReset}>
            Reset
          </Button>
          {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
        </Form>
      )}
    </Formik>
  );
});

export const SignUpFormWithRouter = withRouter(SignUpForm);
