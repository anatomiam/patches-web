import "../../../index.css";

import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const USERS_QUERY = gql`
  query {
    users {
      id
    }
  }
`;

const Landing = () => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError
  } = useQuery(USERS_QUERY);

  if (usersLoading) return "Loading Users...";
  if (usersError) return `Loading Users Error! ${usersError}`;
  return usersData.users.map(user => {
    return <div key={Math.random()}>{user.id}</div>;
  });
};

export default Landing;
