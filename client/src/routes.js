// src/routes.js
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import App from "./App";
// import Home from './Home/Home';
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";
import StartGame from "./pages/StartGame";
import Home from "./pages/Home";
import FinalMural from "./pages/FinalMural";
// import LandingPage from "./pages/LandingPage";
import ContinueGame from "./pages/ContinueGame";
import MyOpenMurals from "./components/MyOpenMurals";
import CompletedMurals from "./components/CompletedMurals";
import About from "./components/About";
import Contact from "./components/Contact";
import JoinMural from "./components/JoinMural";

const handleAuthentication = (auth, nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const auth = new Auth();

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      loggedIn: false
    };
  }

  componentDidMount() {
    this.populateProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      auth.isAuthenticated() &&
      prevState.loggedIn === false &&
      this.state.loggedIn === false
    ) {
      this.populateProfile();
    }
  }

  populateProfile() {
    let authorized = auth.isAuthenticated();
    if (authorized) {
      this.setState({ profile: {}, loggedIn: true });
      const { userProfile, getProfile } = auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }
    } else {
      this.setState({ profile: {}, loggedIn: false });
    }
  }

  //Callback function to force update from App.js when profile is loaded/logged out from the nav bar.  This is slightly janky.
  myCallback = boolean => {
    if (boolean === true) {
      this.forceUpdate();
    } else {
      this.setState({ profile: {}, loggedIn: false });
    }
  };

  render() {
    return (
      <Router history={history} component={App}>
        <div>
          {/* Toggling exact here causes profile info to auto update after callback */}
          <Route
            path="/"
            render={props => {
              const auth = new Auth(props.history);
              return (
                <App
                  auth={auth}
                  {...props}
                  profile={this.state.profile}
                  loggedIn={this.state.loggedIn}
                  callbackFromParent={this.myCallback}
                />
              );
            }}
          />
          <Route
            exact
            path="/callback"
            render={props => {
              const auth = new Auth(props.history);
              handleAuthentication(auth, props);
              return <Callback {...props} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default Routes;
