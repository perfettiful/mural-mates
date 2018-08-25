import React, { Component } from "react";
import { Link } from "react-router-dom";
import JoinMural from "../../components/JoinMural";
import GameButtons from "../../components/GameButtons";
import "./Home.css";
import API from "../../utils/API";
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
  Tab
} from "semantic-ui-react";

class Home extends React.Component {
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
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const willJoin = this.state.willJoin;
    let openMurals;

    return (
      <div>
       <GameButtons auth={this.props.auth} callbackFromParent={this.props.callbackFromParent}/>
        
      </div>
    );
  }
}

export default Home;


