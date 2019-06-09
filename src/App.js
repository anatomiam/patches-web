import React from "react";
import Builder from "./components/Pages/Builder";
import { reducer, initialState } from "./reducer.js";
import { StateProvider } from "./StateProvider";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import "./index.css";

const PEDAL_QUERY = gql`
  query {
    pedals @client {
      id
      name
      width
      height
      knobs {
        id
        type
        description
        cx
        cy
        r
        angle
        width
      }
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(PEDAL_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Builder pedal={data.pedals[0]} />
    </StateProvider>
  );
};

export default App;
