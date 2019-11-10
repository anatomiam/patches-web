import React from "react";
import { Button, Input, Form, Header } from "semantic-ui-react";
import { ValidationErrors } from "../Shared/ValidationErrors";
import { setAccessToken } from "../../../auth/Auth";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

interface Props extends RouteComponentProps {
  dispatch: <T>(arg: T) => void;
}

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

const LoginDiv = styled.div`
  width: 50%;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address`")
    .required("Required"),
  password: Yup.string().required("Required")
});

const LoginForm: React.FC<Props> = React.memo(({ history, dispatch }) => {
  const [login] = useMutation(LOGIN);
  return (
    <LoginDiv>
      <Header as="h2" color="violet" textAlign="center">
        Login to your account
      </Header>
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
            if (response && response.data) {
              setAccessToken(response.data.login.token);
              setSubmitting(false);
              dispatch({
                type: "SET_IS_LOGGED_IN",
                isLoggedIn: true
              });
            }
            history.push("/");
          } catch (e) {
            console.log(e);
            setSubmitting(false);
          }
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
                id="login-email"
                icon="user"
                iconPosition="left"
                placeholder="Email"
                name="email"
                type="text"
                onChange={handleChange}
                value={values.email}
              />
            </Form.Field>
            <Form.Field>
              <Input
                id="login-password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
              />
            </Form.Field>
            <Button type="submit" color="violet" disabled={isSubmitting}>
              Login
            </Button>
            {!isEmpty(errors) ? <ValidationErrors errors={errors} /> : null}
          </Form>
        )}
      </Formik>
    </LoginDiv>
  );
});

export const LoginFormWithRouter = withRouter(LoginForm);
