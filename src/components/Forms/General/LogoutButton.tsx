import { RouteComponentProps, withRouter } from "react-router-dom";

import { Button } from "semantic-ui-react";
import React from "react";
import { gql } from "apollo-boost";
import { setAccessToken } from "../../../auth/Auth";
import { useMutation } from "@apollo/react-hooks";

interface Props extends RouteComponentProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserId: (userId: string) => void;
}

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

const LogoutButton: React.FC<Props> = React.memo(
  ({ history, setIsLoggedIn, setUserId }) => {
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
          setIsLoggedIn(false);
          setUserId("");
          if (client) {
            await client.resetStore();
          }
          // history.push("/");
        }}
      />
    );
  }
);

export const LogoutButtonWithRouter = withRouter(LogoutButton);
