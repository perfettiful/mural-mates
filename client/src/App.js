import React, { Component } from "react";
import { Image, Menu, Button } from "semantic-ui-react";

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

    return (
      <div>
        {/* User Profile Object! */}
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        <Menu size="large">
          <Menu.Item header>
            <a href="/home">Mural Mates</a>
          </Menu.Item>
          <Menu.Item
            name="home"
            className="btn-margin"
            onClick={this.goTo.bind(this, "home")}
            href="/home"
          >
            Home
          </Menu.Item>
          {!isAuthenticated() && (
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
              name="logOut"
              className="btn-margin"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </Menu.Item>
          )}
          <Menu.Menu position="right">
            <Menu.Item>
              {this.state.loggedIn ? (
                <h3>Welcome Back, {this.state.profile.given_name}</h3>
              ) : (
                <h4>Your Name Could be Here!</h4>
              )}
            </Menu.Item>
            <Menu.Item>
            {this.state.loggedIn ? (
              <Image src={this.state.profile.picture} alt="profile" avatar />
            ) : (
              <h4>Your Image Could be Here!</h4>
            )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default App;
