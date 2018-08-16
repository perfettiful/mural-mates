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
import Home from "./pages/Home";
import StartGame from "./pages/StartGame";
import FinalMural from "./pages/FinalMural";
// import LandingPage from "./pages/LandingPage";
import ContinueGame from "./pages/ContinueGame";
import Auth from "./Auth/Auth";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import JoinMural from "./components/JoinMural";

// App.js

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      loggedIn: false
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

  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    // const panes = [
    //   { menuItem: 'Create', render: () => <Tab.Pane attached={false}> <Button className="inverted" color="black" fluid size="large">
    //   <Link to={`/game/`}>Create New Mural</Link>
    // </Button></Tab.Pane> },
    //   { menuItem: 'Join Mural', render: () => <Tab.Pane attached={false}><JoinMural/></Tab.Pane> },
    //   { menuItem: 'Completed Murals', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    //   { menuItem: 'My Open Murals', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> }
    //  ]
    // const TabExampleBorderless = () => (
    //   <Tab menu={{ borderless: true, attached: false, tabular: false }} panes={panes} />
    //  )
    return (
      <div>
        <Router>
          <div>
            <Menu size="large">
              <Menu.Item header>
                <a href="/home">
                  <i className="fas fa-skull fa-2x" />
                </a>
              </Menu.Item>
              
              <Menu.Menu position="right">
                <MenuDropdown auth={this.props.auth} />
              </Menu.Menu>
            </Menu>
            <br />
            {!isAuthenticated() ? (
              <Grid
                id="mural-selection"
                textAlign="center"
                style={{ height: "100%" }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Segment stacked>
                    <Header as="h1" color="grey" textAlign="center">
                      <Image>
                        <i className="fas fa-skull" />{" "}
                      </Image>
                      Welcome to Mural Mates
                    </Header>
                    <Segment stacked>
                      <Button
                        className="inverted"
                        color="black"
                        fluid
                        size="large"
                        name="logIn"
                        className="btn-margin"
                        onClick={this.login.bind(this)}
                      >
                        Log In
                      </Button>
                    </Segment>
                  </Segment>
                </Grid.Column>
              </Grid>
            ) : null}
            <Switch>
            {/* User Homepage that diplays open games, user profile, etc.   */}
            {/* <Route exact path="/home" component={Home} /> */}

            <Route
              exact
              path="/home"
              render={props => {
                const auth = new Auth(props.history);

                return (
                  <Home
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
              path="/"
              render={props => {
                const auth = new Auth(props.history);
                return (
                  <Home
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

            </Switch>
            <Route exact path="/openmurals" component={MyOpenMurals} />
            <Route exact path="/completedmurals" component={CompletedMurals} />
            <Route exact path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </div>
        </Router>

        {/* User Profile Object! */}
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        {/* <Menu.Item>
            {" "}
            {this.state.loggedIn ? (
              <div>
                <h3>Welcome Back, {this.state.profile.given_name}</h3>
                <Image src={this.state.profile.picture} alt="profile" avatar />
              </div>
            ) : (
              <div>
                <h4 /> <h4 />
              </div>
            )}
          </Menu.Item> */}
        {/* <Menu.Item>
            <MenuTabs auth={this.props.auth} />
          </Menu.Item> */}
        {/* {!isAuthenticated() && (
            <Menu.Item
              name="logIn"
              className="btn-margin"
              onClick={this.login.bind(this)}
            >
              Log In
            </Menu.Item>
          )}
          {isAuthenticated() && (
            <Menu.Item
             position="right"
              name="logOut"
              className="btn-margin"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </Menu.Item>
          )} */}
        {/* </Menu> */}
      </div>
    );
  }
}

export default App;
