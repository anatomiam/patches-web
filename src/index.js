import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
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
});

const data = {
  pedals: [
    {
      __typename: "Pedal",
      id: "laksdjflkjasdf",
      name: "Default Template",
      width: 400,
      height: 300,
      knobs: [
        {
          __typename: "Knob",
          id: "123123"
        }
      ],
      selectedComponent: {
        __typename: "SelectedComponent",
        id: "123123"
      }
    }
  ]
};

cache.writeData({ data });

client.onResetStore(() => cache.writeData({ data }));

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
