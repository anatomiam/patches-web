import "./index.css";

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import React, { useEffect } from "react";
import { getTokenInfo, isAuthenticated, setAccessToken } from "./auth/Auth";
import {
  setCurrentPage,
  setIsLoggedIn,
  setUserId
} from "./state/Actions/Actions";

import Builder from "./components/Pages/Builder/Builder";
import Landing from "./components/Pages/General/Landing";
import Login from "./components/Pages/General/Login";
import Patcher from "./components/Pages/Patcher/Patcher";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const App = props => {
  const { currentPage } = props.sharedState;
  const { setCurrentPage, setIsLoggedIn, setUserId } = props;

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
      const { userId } = getTokenInfo();
      setUserId(userId);
    }
  }, [setCurrentPage, setIsLoggedIn, setUserId]);

  return (
    <Router>
      {/* <Segment inverted>
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
      </Segment> */}

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
  setIsLoggedIn: PropTypes.func,
  setUserId: PropTypes.func
};

const mapDispatchToProps = { setCurrentPage, setIsLoggedIn, setUserId };

export default connect(mapStateToProps, mapDispatchToProps)(App);
