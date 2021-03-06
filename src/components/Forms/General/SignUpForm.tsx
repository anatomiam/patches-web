import * as Yup from "yup";

import { Button, Form, Header, Input } from "semantic-ui-react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Formik } from "formik";
import React from "react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { gql } from "apollo-boost";
import { isEmpty } from "lodash";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";

interface Props extends RouteComponentProps {}

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

const SignupDiv = styled.div`
  width: 50%;
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

const SignUpForm: React.FC<Props> = React.memo(({ history }) => {
  const [signup] = useMutation(SIGNUP);
  return (
    <SignupDiv>
      <Header as="h2" color="violet" textAlign="center">
        Create an account
      </Header>
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
          try {
            const response = await signup({
              variables: {
                name: values.username,
                email: values.email,
                password: values.password
              }
            });
            console.log(response);
            // history.push("/");
          } catch (e) {
            console.log(e);
          }
          setSubmitting(false);
        }}
      >
        {({ values, errors, handleChange, isSubmitting, handleSubmit }) => (
          <Form
            onSubmit={event => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Field>
              <Input
                id="username"
                icon="user"
                iconPosition="left"
                placeholder="Set Username"
                name="username"
                type="text"
                onChange={handleChange}
                value={values.username}
              />
            </Form.Field>
            <Form.Field>
              <Input
                id="signup-email"
                icon="mail"
                iconPosition="left"
                placeholder="Set Email"
                name="email"
                type="text"
                onChange={handleChange}
                value={values.email}
              />
            </Form.Field>
            <Form.Field>
              <Input
                id="signup-password"
                icon="lock"
                iconPosition="left"
                placeholder="Set Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
              />
            </Form.Field>
            <Button type="submit" color="violet" disabled={isSubmitting}>
              Sign Up
            </Button>
            {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
          </Form>
        )}
      </Formik>
    </SignupDiv>
  );
});

export const SignUpFormWithRouter = withRouter(SignUpForm);
