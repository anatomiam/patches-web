import React, { useState } from "react";
import Builder from "./components/Pages/Builder";
import Patcher from "./components/Pages/Patcher";
import Landing from "./components/Pages/Landing";
import { reducer, initialState } from "./reducer.js";
import { StateProvider } from "./StateProvider";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import { Menu, Segment } from "semantic-ui-react";

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
  const [activeTab, setActiveTab] = useState("");
  const { data, loading, error } = useQuery(PEDAL_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            />
            <Menu.Item
              as={Link}
              to="/builder"
              name="builder"
              active={activeTab === "builder"}
              onClick={() => setActiveTab("builder")}
            />
            <Menu.Item
              as={Link}
              to="/patcher"
              name="patcher"
              active={activeTab === "patcher"}
              onClick={() => setActiveTab("patcher")}
            />
          </Menu>
        </Segment>

        <Route exact path="/" component={Landing} />
        <Route
          path="/builder"
          render={() => <Builder pedals={data.pedals} />}
        />
        <Route
          path="/patcher"
          render={() => <Patcher pedals={data.pedals} />}
        />
      </Router>
    </StateProvider>
  );
};

export default App;
