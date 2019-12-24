import React, { useState } from "react";
import { Message, Button } from "semantic-ui-react";
import { SignUpFormWithRouter } from "../../Forms/General/SignUpForm";
import { LoginFormWithRouter } from "../../Forms/General/LoginForm";
import { LogoutButtonWithRouter } from "../../Forms/General/LogoutButton";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  setIsLoggedIn,
  setCurrentPage,
  setUserId
} from "../../../state/Actions/Actions";

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface Props {
  patcherState: any;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setCurrentPage: (currentPage: string) => void;
  setUserId: (userId: string) => void;
}

const Login: React.FC<Props> = props => {
  const { patcherState, setIsLoggedIn, setCurrentPage, setUserId } = props;
  const { isLoggedIn } = patcherState;
  const [isNewUser, setIsNewUser] = useState(true);

  if (isLoggedIn) {
    return (
      <LogoutButtonWithRouter
        setIsLoggedIn={setIsLoggedIn}
        setUserId={setUserId}
      />
    );
  } else {
    if (!isLoggedIn && !isNewUser) {
      return (
        <LoginDiv>
          <LoginFormWithRouter
            setIsLoggedIn={setIsLoggedIn}
            setCurrentPage={setCurrentPage}
            setUserId={setUserId}
          />
          <Message>
            Are you new here?{" "}
            <Button
              size="mini"
              color="blue"
              className="icon-pointer"
              onClick={() => setIsNewUser(true)}
            >
              Join Us
            </Button>
          </Message>
        </LoginDiv>
      );
    } else {
      return (
        <LoginDiv>
          <SignUpFormWithRouter />
          <Message>
            Already a user?{" "}
            <Button
              size="mini"
              color="blue"
              className="icon-pointer"
              onClick={() => setIsNewUser(false)}
            >
              Login
            </Button>
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

const mapDispatchToProps = { setIsLoggedIn, setCurrentPage, setUserId };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
