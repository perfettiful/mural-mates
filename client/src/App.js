import React, { Component } from "react";
import {
  Segment,
  Button,
  Divider,
  Container,
  Header,
  Icon,
  Grid,
  Message,
  Form,
  Image,
  Menu,
  Tab,
  Panes
} from "semantic-ui-react";
import MenuDropdown from "./components/MenuDropdown";
import MyOpenMurals from "./components/MyOpenMurals";
import CompletedMurals from "./components/CompletedMurals";
import About from "./components/About";
import Contact from "./components/Contact";
import StartGame from "./pages/StartGame";
import FinalMural from "./pages/FinalMural";
// import LandingPage from "./pages/LandingPage";
import ContinueGame from "./pages/ContinueGame";
import Auth from "./Auth/Auth";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import JoinMural from "./components/JoinMural";
import Home from "./pages/Home";

// App.js

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      loggedIn: false,
      willJoin: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.auth.isAuthenticated() &&
      prevState.loggedIn == false &&
      this.state.loggedIn == false
    ) {
      this.populateProfile();
    }
  }

  populateProfile() {
    let authorized = this.props.auth.isAuthenticated();
    if (authorized) {
      this.setState({ profile: {}, loggedIn: true });
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
          this.props.callbackFromParent(true);
        });
      } else {
        this.setState({ profile: userProfile });
        this.props.callbackFromParent(true);
      }
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
    this.setState({ loggedIn: false });
    this.props.callbackFromParent(false);
  }
  handleWillJoin = () => {
    this.setState({ willJoin: true });
  };

  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const willJoin = this.state.willJoin;
    let openMurals;

    return (
      <Router>
        <div>
          <Menu size="large">
            <Menu.Item header>
              <a href="/">
                <h2>
                  Mural <i className="fas fa-skull fa-x" /> Mates
                </h2>
              </a>
            </Menu.Item>
            {isAuthenticated() ? (
              <Menu.Menu position="right">
                <MenuDropdown
                  auth={this.props.auth}
                  callbackFromParent={this.props.callbackFromParent}
                />
              </Menu.Menu>
            ) : null}
          </Menu>
          <Switch>
            <Route
              exact
              path="/game"
              render={props => {
                const auth = new Auth(props.history);
                return (
                  <StartGame
                    auth={auth}
                    {...props}
                    profile={this.state.profile}
                    loggedIn={this.state.loggedIn}
                  />
                );
              }}
            />
            {/* Route for when user joins a game */}
            <Route
              exact
              path="/game/:id"
              render={props => {
                const auth = new Auth(props.history);
                return (
                  <ContinueGame
                    auth={auth}
                    {...props}
                    profile={this.state.profile}
                    loggedIn={this.state.loggedIn}
                  />
                );
              }}
            />
            <Route
              path="/game/mural/:id"
              render={props => {
                const auth = new Auth(props.history);
                return (
                  <FinalMural
                    auth={auth}
                    {...props}
                    profile={this.state.profile}
                    loggedIn={this.state.loggedIn}
                  />
                );
              }}
            />
            <Route
              exact
              path="/openmurals"
              render={props => {
                const auth = new Auth(props.history);
                return (
                  <JoinMural
                    auth={auth}
                    {...props}
                    profile={this.state.profile}
                    loggedIn={this.state.loggedIn}
                  />
                );
              }}
            />
            <Route
              exact
              path="/myopenmurals"
              render={props => {
                const auth = new Auth(props.history);
                return (
                  <MyOpenMurals
                    auth={auth}
                    {...props}
                    profile={this.state.profile}
                    loggedIn={this.state.loggedIn}
                  />
                );
              }}
            />
            <Route
              exact
              path="/completedmurals"
              render={props => {
                const auth = new Auth(props.history);
                return (
                  <CompletedMurals
                    auth={auth}
                    {...props}
                    profile={this.state.profile}
                    loggedIn={this.state.loggedIn}
                  />
                );
              }}
            />{" "}
            <Route exact path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
