import React, { Component } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartGame from "./pages/StartGame";
import Home from "./pages/Home";
import ContinueGame from "./pages/ContinueGame";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// App.js
import Auth from './Auth/Auth.js';

const auth = new Auth();

class App extends Component {

  componentWillMount() {

    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        console.log(profile);
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {

    // if (!auth.isAuthenticated()){

    //   auth.login();
    // } 
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { profile } = this.state;

    const isAuthenticated = auth.isAuthenticated;

    return (
      <div>
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre>
        <h3>{profile.nickname}</h3>
        <h1>{profile.id}</h1>
        <img src={profile.picture} alt="profile" /> */}

        
        <Navbar.Header>
          <Navbar fluid>
            <Navbar.Brand>
              <a href="/home">Mural Mates</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                  </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </Button>
              )
            }
          </Navbar>
        </Navbar.Header>
        <Switch>
          {/* User Homepage that diplays open games, user profile, etc.   */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />

          {/* Route for when user creates a game */}
          <Route exact path="/game" component={StartGame} />

          {/* Route for when user joins a game */}
          <Route exact path="/game/:id" component={ContinueGame} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}


export default App;
