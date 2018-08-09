import React, { Component } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { Image } from "semantic-ui-react";
import Auth from '../..Auth';

// App.js


class NavBar extends Component {
  state = {
    profile: {},
    loggedIn: false
  };


  componentDidMount() {
    console.log("Called component Did Mount");
    this.populateProfile();
  }

  populateProfile() {
    let authorized = this.props.auth.isAuthenticated();
    console.log(authorized);
    if (authorized) {
      this.setState({ profile: {}, loggedIn: true });
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
            {this.state.loggedIn ? <h2>Welcome Back, {this.state.profile.given_name}</h2> : <h1>Your Name Could be Here!</h1>}
            {this.state.loggedIn ? <Image src={this.state.profile.picture} alt="profile" avatar /> : <h1>Your Image Could be Here!</h1>}

          </Navbar>
        </Navbar.Header>


      </div>
    );
  }
}


export default NavBar;
