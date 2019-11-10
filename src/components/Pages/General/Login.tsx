import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import { SignUpFormWithRouter } from "../../Forms/General/SignUpForm";
import { LoginFormWithRouter } from "../../Forms/General/LoginForm";
import { LogoutButtonWithRouter } from "../../Forms/General/LogoutButton";
import styled from "styled-components";
import { useStateValue } from "../../../state/StateProvider";

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Login = () => {
  const [{ localState }, dispatch] = useStateValue();
  const { isLoggedIn } = localState;
  const [isNewUser, setIsNewUser] = useState(true);

  if (isLoggedIn) {
    return <LogoutButtonWithRouter dispatch={dispatch} />;
  } else {
    if (!isLoggedIn && !isNewUser) {
      return (
        <LoginDiv>
          <LoginFormWithRouter dispatch={dispatch} />
          <Message>
            Are you new here?{" "}
            <a className="icon-pointer" onClick={() => setIsNewUser(true)}>
              Join Us
            </a>
          </Message>
        </LoginDiv>
      );
    } else {
      return (
        <LoginDiv>
          <SignUpFormWithRouter />
          <Message>
            Already a user?{" "}
            <a className="icon-pointer" onClick={() => setIsNewUser(false)}>
              Login
            </a>
          </Message>
        </LoginDiv>
      );
    }
  }
};

export default Login;
