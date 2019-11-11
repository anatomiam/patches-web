import React, { useEffect, useState } from "react";
import Builder from "./components/Pages/Builder/Builder";
import Patcher from "./components/Pages/Patcher/Patcher";
import Landing from "./components/Pages/General/Landing";
import Login from "./components/Pages/General/Login";
import { reducer, initialState } from "./state/Reducer";
import { StateProvider } from "./state/StateProvider";
import { Provider } from "react-redux";
import store from "./state/store/store";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import { Menu, Segment } from "semantic-ui-react";
import { setAccessToken, isAuthenticated } from "./auth/Auth";

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
        id
        knob {
          id
        }
        position
        notes
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
        position
        steps
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

  // this might not be necessary now that apollo links are set up
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async res => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
    });
  }, []);

  if (pedalsLoading) return "Loading Pedals...";
  if (pedalsError) return `Loading Pedals Error! ${pedalsError}`;
  if (presetsLoading) return "Loading Presets...";
  if (presetsError) return `Loading Presets Error! ${presetsError}`;

  const initialStateWithAuth = {
    ...initialState,
    localState: {
      ...initialState.localState,
      isLoggedIn: isAuthenticated()
    }
  };

  return (
    <StateProvider initialState={initialStateWithAuth} reducer={reducer}>
    <Provider store={store}>
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
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={activeTab === "login"}
              onClick={() => setActiveTab("login")}
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
        <Route path="/login" render={() => <Login />} />
      </Router>
    </Provider>
    </StateProvider>
  );
};

export default App;
