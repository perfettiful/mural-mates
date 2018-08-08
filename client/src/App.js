import React, {Component} from "react";
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartGame from "./pages/StartGame";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import AdminHomepage from './pages/AdminHomepage';
import CreateAccountPage from './pages/CreateAccountPage';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import UserList from './pages/UserList'
import NotFoundPage from './pages/NotFoundPage';
// App.js
import Auth from './Auth/Auth.js';

const auth = new Auth();

class App extends Component {
  componentDidMount(){
    // this is going to double check that the user is still actually logged in
    // if the app is reloaded. it's possible that we still have a user in sessionStorage
    // but the user's session cookie expired.
    axios.get('/api/auth')
      .then(res => {
        // if we get here, the user's session is still good. we'll update the user
        // to make sure we're using the most recent values just in case
        update(res.data);
    })
    .catch(err => {
      // if we get a 401 response, that means the user is no longer logged in
      if (err.response.status === 401) {
        update(null);
      }
    });
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
    const isAuthenticated = auth.isAuthenticated;
    const { user } = this.props;

    return (
      <div>
      <Navbar.Header>
        <Navbar fluid>
          user={user}
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
            <Route exact path="/admin" component={AdminHomepage} />
            <Route exact path="/admin/users" component={UserList} />
            <Route exact path="/" component={Home} />

            {/* Route for when user creates a game */}
            <Route exact path="/game" component={StartGame} />
            <Route exact path="/create" component={CreateAccountPage} />

            {/* Route for when user joins a game */}
            <Route exact path="/game/:id" component={Game} />
            <Route component={NoMatch} />
          </Switch>
      </div>
    );
  }
}


export default withUser(App);
