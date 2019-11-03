import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { withRouter } from "react-router";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address`")
    .required("Required"),
  password: Yup.string().required("Required")
});

const LoginForm = React.memo(({ history }) => {
  const [login] = useMutation(LOGIN);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await login({
            variables: {
              email: values.email,
              password: values.password
            }
          });
          // history.push("/");
          console.log(response);
        } catch (e) {
          console.log(e);
        }
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
              id="login-email"
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
              id="login-password"
              label="Password"
              placeholder="Set Password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />
          </Form.Field>
          <Button type="submit" disabled={isSubmitting}>
            Login
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

export const LoginFormWithRouter = withRouter(LoginForm);
