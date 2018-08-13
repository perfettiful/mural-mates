import React, { Component } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { Image } from "semantic-ui-react";

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

    if (this.props.auth.isAuthenticated() && prevState.loggedIn ==
      false && this.state.loggedIn == false) {
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
    this.setState({loggedIn:false});
    this.props.callbackFromParent(false);
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
              href="/home"
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
              
            }You
            {this.state.loggedIn ? <h2>Welcome Back, {this.state.profile.given_name}</h2> : <h4>Your Name Could be Here!</h4>}
            {this.state.loggedIn ? <Image src={this.state.profile.picture} alt="profile" avatar /> : <h4>Your Image Could be Here!</h4>}

          </Navbar>
        </Navbar.Header>


      </div>
    );
  }
}


export default App;
