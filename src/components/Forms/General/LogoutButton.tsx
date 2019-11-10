import React from "react";
import { Button } from "semantic-ui-react";
import { setAccessToken } from "../../../auth/Auth";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  dispatch: <T>(arg: T) => void;
}

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

const LogoutButton: React.FC<Props> = React.memo(({ history, dispatch }) => {
  const [logout, { client }] = useMutation(LOGOUT);
  return (
    <Button
      content="Logout"
      size="mini"
      className="icon-pointer"
      color="grey"
      fluid
      onClick={async event => {
        event.preventDefault();
        await logout();
        setAccessToken("");
        dispatch({
          type: "SET_IS_LOGGED_IN",
          isLoggedIn: false
        });
        if (client) {
          await client.resetStore();
        }
        // history.push("/");
      }}
    />
  );
});

export const LogoutButtonWithRouter = withRouter(LogoutButton);
