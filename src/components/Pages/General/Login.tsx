import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import { SignUpFormWithRouter } from "../../Forms/General/SignUpForm";
import { LoginFormWithRouter } from "../../Forms/General/LoginForm";
import { LogoutButtonWithRouter } from "../../Forms/General/LogoutButton";
import styled from "styled-components";

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Landing = () => {
  const loggedIn = false;
  const [isNewUser, setIsNewUser] = useState(true);

  return (
    <>
      {!loggedIn && !isNewUser ? (
        <LoginDiv>
          <LoginFormWithRouter />
          <Message>
            Are you new here?{" "}
            <a className="icon-pointer" onClick={() => setIsNewUser(true)}>
              Join Us
            </a>
          </Message>
        </LoginDiv>
      ) : (
        <LoginDiv>
          <SignUpFormWithRouter />
          <Message>
            Already a user?{" "}
            <a className="icon-pointer" onClick={() => setIsNewUser(false)}>
              Login
            </a>
          </Message>
        </LoginDiv>
      )}
      {loggedIn ? <LogoutButtonWithRouter /> : null}
    </>
  );
};

export default Landing;
