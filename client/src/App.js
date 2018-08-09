import React, { Component } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Image } from "semantic-ui-react";

import StartGame from "./pages/StartGame";
import Home from "./pages/Home";
import ContinueGame from "./pages/ContinueGame";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// App.js


class App extends Component {
  state = {
    profile : {},
    loggedIn:false
  };

  // componentWillMount() {
  //   console.log("Called component Will Mount");
  //   this.populateProfile();
  // }
  componentDidMount() {
    console.log("Called component Did Mount");
    this.populateProfile();
  }

 
  
  componentDidUpdate(prevProps,prevState ) {
    console.log("props",this.props);
    console.log("pprops",prevProps);
    console.log(this.state);
    console.log("prevstate",prevState);
  
  }


  populateProfile() {
    let authorized = this.props.auth.isAuthenticated();
    console.log(authorized);
    if (authorized) {
      this.setState({ profile: {}, loggedIn:true });
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          console.log(profile);
          this.setState({ profile });
        });
      } else {
        console.log("i'm in else statement");
        this.setState({ profile: userProfile });
      }
    }
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

    const isAuthenticated = this.props.auth.isAuthenticated;

    return (
      <div>

        {/* User Profile Object! */}
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}

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
        {this.state.loggedIn ? <h1>{this.state.profile.given_name}</h1>  : <h1>NOPE</h1>}
        {this.state.loggedIn ? <h1>{this.state.profile.picture}</h1>  : <h1>NOPE</h1>}

        <Switch>
          {/* User Homepage that diplays open games, user profile, etc.   */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />

          {/* Route for when user creates a game */}
          <Route exact path="/game" component={StartGame}  />

          {/* Route for when user joins a game */}
          <Route exact path="/game/:id" component={ContinueGame} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}


export default App;
