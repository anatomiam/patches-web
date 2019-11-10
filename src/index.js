import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { setAccessToken } from "./auth/Auth";
import * as serviceWorker from "./serviceWorker";
import { resolvers, typeDefs } from "./state/Resolvers";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, isAuthenticated } from "./auth/Auth";

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    // returning false means the token needs to be refreshed
    // returning true means do nothing and continue
    return isAuthenticated();
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  }
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ""
    }
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  console.log(networkError);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([tokenRefreshLink, authLink, errorLink, httpLink]),
  cache,
  typeDefs,
  resolvers
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
