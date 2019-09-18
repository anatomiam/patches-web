import React, { useState } from "react";
import Builder from "./components/Pages/Builder";
import Patcher from "./components/Pages/Patcher";
import Landing from "./components/Pages/Landing";
import { reducer, initialState } from "./state/reducer";
import { StateProvider } from "./state/StateProvider";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import { Menu, Segment } from "semantic-ui-react";

const PRESET_QUERY = gql`
  query PresetsByUser($userId: ID!) {
    presetsByUser(userId: $userId) {
      id
      description
      name
      pedal {
        id
      }
      patches {
        knob {
          id
        }
        angle
      }
    }
  }
`;

const PEDAL_QUERY = gql`
  query {
    pedals {
      id
      name
      width
      height
      color
      knobs {
        id
        type
        description
        color
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
  const {
    data: pedalsData,
    loading: pedalsLoading,
    error: pedalsError
  } = useQuery(PEDAL_QUERY);
  const {
    data: presetsData,
    loading: presetsLoading,
    error: presetsError
  } = useQuery(PRESET_QUERY, {
    variables: { userId: "cju66ydwl000y0738rs8jz7yv" }
  });

  if (pedalsLoading) return "Loading Pedals...";
  if (pedalsError) return `Loading Pedals Error! ${pedalsError}`;
  if (presetsLoading) return "Loading Presets...";
  if (presetsError) return `Loading Presets Error! ${presetsError}`;

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
          render={() => <Builder pedals={pedalsData.pedals} />}
        />
        <Route
          path="/patcher"
          render={() => (
            <Patcher
              pedals={pedalsData.pedals}
              presets={presetsData.presetsByUser}
            />
          )}
        />
      </Router>
    </StateProvider>
  );
};

export default App;
