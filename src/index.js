import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { pedals } from "./data";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { resolvers, typeDefs } from "./resolvers";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

client.resetStore();
// cache.writeData({ data: pedals });
// client.onResetStore(() => cache.writeData({ data: pedals }));

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
