import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import Builder from "./components/Pages/Builder/Builder";
import Patcher from "./components/Pages/Patcher/Patcher";
import Landing from "./components/Pages/General/Landing";
import Login from "./components/Pages/General/Login";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./index.css";
import { Menu, Segment } from "semantic-ui-react";
import { setAccessToken, isAuthenticated } from "./auth/Auth";
import { setCurrentPage, setIsLoggedIn } from "./state/Actions/Actions";
import { connect } from "react-redux";

const App = props => {
  const { currentPage } = props.sharedState;
  const { setCurrentPage, setIsLoggedIn } = props;

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

  useEffect(() => {
    setCurrentPage(window.location.pathname.replace("/", ""));
    if (isAuthenticated()) {
      setIsLoggedIn(true);
    }
  }, [setCurrentPage, setIsLoggedIn]);

  // if (pedalsLoading) return "Loading Pedals...";
  // if (pedalsError) return `Loading Pedals Error! ${pedalsError}`;
  // if (presetsLoading) return "Loading Presets...";
  // if (presetsError) return `Loading Presets Error! ${presetsError}`;

  return (
    <Router>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={currentPage === "home"}
            onClick={() => {
              setCurrentPage("home");
            }}
          />
          <Menu.Item
            as={Link}
            to="/builder"
            name="builder"
            active={currentPage === "builder"}
            onClick={() => {
              setCurrentPage("builder");
            }}
          />
          <Menu.Item
            as={Link}
            to="/patcher"
            name="patcher"
            active={currentPage === "patcher"}
            onClick={() => {
              setCurrentPage("patcher");
            }}
          />
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={currentPage === "login"}
            onClick={() => {
              setCurrentPage("login");
            }}
          />
        </Menu>
      </Segment>

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/builder" render={() => <Builder />} />
        <Route path="/patcher" render={() => <Patcher />} />
        <Route path="/login" render={() => <Login />} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    sharedState: state.sharedState
  };
};

App.propTypes = {
  sharedState: PropTypes.object,
  setCurrentPage: PropTypes.func,
  setIsLoggedIn: PropTypes.func
};

const mapDispatchToProps = { setCurrentPage, setIsLoggedIn };

export default connect(mapStateToProps, mapDispatchToProps)(App);
