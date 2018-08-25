import React, { Component } from "react";
import {
  Image,
  Menu,
  Dropdown,
  Icon,
  Message,
  Container
} from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
import MyOpenMurals from "../MyOpenMurals";
import Counter from "../Counter";
import API from "../../utils/API";
import "./MenuDropdown.css";
import history from "../../history";
import Auth from "../../Auth/Auth";

const auth = new Auth(history);

class MenuDropdown extends Component {
  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.populateProfile = this.populateProfile.bind(this);
    this.goTo = this.goTo.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      profile: {},
      loggedIn: false,
      willJoin: false,
      userCompletedMurals: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      auth.isAuthenticated() &&
      prevState.loggedIn == false &&
      this.state.loggedIn == false
    ) {
      this.populateProfile();
    }
  }
  componentDidMount() {
    if (auth.isAuthenticated()) {
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
          this.props.callbackFromParent(true);
        });
      } else {
        this.setState({ profile: userProfile });
        this.props.callbackFromParent(true);
      }
    }
  }
  getCompletedMuralsByUser = () => {
    API.findCompletedMuralsByUser(this.props.profile.sub)
      .then(res => {
        this.setState({
          userCompletedMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
    this.setState({ loggedIn: false });
    this.props.callbackFromParent(false);
  }

  render() {
    const isAuthenticated = auth.isAuthenticated;

    return (
      <div>
        <Dropdown
          pointing
          placeholder={
            this.state.loggedIn ? (
              <div>
                <Image
                  avatar
                  src={this.state.profile.picture}
                  size="tiny"
                  className="bioPic"
                  spaced
                />
                <Icon name="caret down" size="large" />
              </div>
            ) : (
              <Icon name="sidebar" size="large" />
            )
          }
        >
          <Dropdown.Menu>
            <Dropdown.Header
              icon="sidebar"
              size="medium"
              content={"Welcome Back " + this.state.profile.given_name}
            />
            <Link
              to="/about"
              className={
                window.location.pathname === "/about"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <Dropdown.Item>About</Dropdown.Item>
            </Link>{" "}
            <Link
              to="/contact"
              className={
                window.location.pathname === "/contact"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <Dropdown.Item>Contact</Dropdown.Item>
            </Link>
            <Link
              to="/myopenmurals"
              className={
                window.location.pathname === "/openmurals"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {" "}
              <Dropdown.Item>My Open Murals</Dropdown.Item>{" "}
            </Link>
            <Link
              to="/completedmurals"
              className={
                window.location.pathname === "/completedmurals"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {" "}
              <Dropdown.Item>Completed Murals</Dropdown.Item>
            </Link>
            <Dropdown.Item>
              {!isAuthenticated() && (
                <Menu.Item
                  name="logIn"
                  className="btn-margin"
                  onClick={this.login}
                >
                  Log In
                </Menu.Item>
              )}
            </Dropdown.Item>
            <Dropdown.Item>
              {isAuthenticated() && (
                <Link to="/">
                  {" "}
                  <Menu.Item
                    name="logOut"
                    className="btn-margin"
                    onClick={this.logout}
                  >
                    Log Out
                  </Menu.Item>
                </Link>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default MenuDropdown;
