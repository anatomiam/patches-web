import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import { SignUpFormWithRouter } from "../../Forms/General/SignUpForm";
import { LoginFormWithRouter } from "../../Forms/General/LoginForm";
import { LogoutButtonWithRouter } from "../../Forms/General/LogoutButton";
import styled from "styled-components";
import { connect } from "react-redux";
import { setIsLoggedIn } from "../../../state/Actions/Actions";

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface Props {
  patcherState: any;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Login: React.FC<Props> = props => {
  const { patcherState, setIsLoggedIn } = props;
  const { isLoggedIn } = patcherState;
  const [isNewUser, setIsNewUser] = useState(true);

  if (isLoggedIn) {
    return <LogoutButtonWithRouter setIsLoggedIn={setIsLoggedIn} />;
  } else {
    if (!isLoggedIn && !isNewUser) {
      return (
        <LoginDiv>
          <LoginFormWithRouter setIsLoggedIn={setIsLoggedIn} />
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

const mapStateToProps = (state: { patcherState: any }) => {
  return {
    patcherState: state.patcherState
  };
};

const mapDispatchToProps = { setIsLoggedIn };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
