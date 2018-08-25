import React, { Component } from "react";
import {
  Image,
  Menu,
  Dropdown,
  Icon,
  Message,
  Container
} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyOpenMurals from "../MyOpenMurals";
import Counter from "../Counter";
import API from "../../utils/API";
import "./MenuDropdown.css";

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
      userCompletedMurals: []
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
        <Dropdown
          pointing
          floating
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
            <Dropdown.Item>
              <Link
                to="/about"
                className={
                  window.location.pathname === "/about"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                About
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="/contact"
                className={
                  window.location.pathname === "/contact"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Contact
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link
                to="/myopenmurals"
                className={
                  window.location.pathname === "/openmurals"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                My Open Murals
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="/completedmurals"
                className={
                  window.location.pathname === "/completedmurals"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Completed Murals
              </Link>
            </Dropdown.Item>
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
                <Menu.Item
                  name="logOut"
                  className="btn-margin"
                  onClick={this.logout}
                >
                  Log Out
                </Menu.Item>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default MenuDropdown;
