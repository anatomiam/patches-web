import React from "react";
import Builder from "./components/Pages/Builder";
import Patcher from "./components/Pages/Patcher";
import Landing from "./components/Pages/Landing";
import { reducer, initialState } from "./reducer.js";
import { StateProvider } from "./StateProvider";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";

const PEDAL_QUERY = gql`
  query {
    pedals {
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
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/builder">Builder</Link>
            </li>
            <li>
              <Link to="/patcher">Patcher</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Landing} />
          <Route
            path="/builder"
            render={() => <Builder pedals={data.pedals} />}
          />
          <Route
            path="/patcher"
            render={() => <Patcher pedals={data.pedals} />}
          />
        </div>
      </Router>
    </StateProvider>
  );
};

export default App;
