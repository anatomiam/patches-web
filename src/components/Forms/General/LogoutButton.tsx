import React from "react";
import { Button } from "semantic-ui-react";
import { setAccessToken } from "../../../auth/Auth";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

const LogoutButton: React.FC<Props> = React.memo(({ history }) => {
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
        console.log("logging out");
        await logout();
        setAccessToken("");
        console.log(localStorage);
        // await client.resetStore();
        // history.push("/");
      }}
    />
  );
});

export const LogoutButtonWithRouter = withRouter(LogoutButton);
