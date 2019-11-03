import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { resolvers, typeDefs } from "./state/Resolvers";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
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
