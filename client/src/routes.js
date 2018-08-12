// src/routes.js
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
// import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import StartGame from "./pages/StartGame";
import Home from "./pages/Home";
import FinalMural from "./pages/FinalMural";
import ContinueGame from "./pages/ContinueGame";
import NoMatch from "./pages/NoMatch";

const handleAuthentication = (auth, nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const auth = new Auth();


class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      loggedIn: false,
      test: "blurp",
      id_token: localStorage.getItem('id_token')
    };
  }

  componentDidMount() {
    this.populateProfile();

  }

  componentDidUpdate(prevProps, prevState) {

    if (auth.isAuthenticated() && prevState.loggedIn ==
      false && this.state.loggedIn == false) {
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
        });
      } else {

        this.setState({ profile: userProfile });
      }
    }
  }

  //Test if Id Token is Present
  getIdToken() {
    if (localStorage.getItem('id_token') !== false && (!this.state.loggedIn)) {
      this.populateProfile();
    }
  }

  render() {

    return (


      <Router history={history} component={App} >
        <div>
        
          {/* Toggling exact here causes profile info to auto update after callback */}
          <Route path="/" render={(props) => {
            const auth = new Auth(props.history);
            return < App auth={auth} {...props} profile={this.state.profile} loggedIn={this.state.loggedIn} />
          }} />

          <Switch>
            {/* User Homepage that diplays open games, user profile, etc.   */}
            {/* <Route exact path="/home" component={Home} /> */}

            <Route exact path="/home" render={(props) => {
              const auth = new Auth(props.history);
              return < Home auth={auth} {...props} profile={this.state.profile} loggedIn={this.state.loggedIn}/>
            }} />

            
            <Route exact path="/" render={(props) => {
              const auth = new Auth(props.history);
              return < Home auth={auth} {...props} profile={this.state.profile} loggedIn={this.state.loggedIn}/>
            }} />

            <Route exact path="/game" render={(props) => {
              const auth = new Auth(props.history);
              return < StartGame auth={auth} {...props} profile={this.state.profile} loggedIn={this.state.loggedIn}/>
            }} />

            {/* Route for when user joins a game */}
            <Route exact path="/game/:id" render={(props) => {
              const auth = new Auth(props.history);
              return < ContinueGame auth={auth} {...props} profile={this.state.profile} loggedIn={this.state.loggedIn}/>
            }} />

             <Route exact path="/game/mural/:id" render={(props) => {
              const auth = new Auth(props.history);
              return < ContinueGame auth={auth} {...props} profile={this.state.profile} loggedIn={this.state.loggedIn}/>
            }} />

            <Route component={NoMatch} />
          </Switch>
          <Route exact path="/callback" render={(props) => {
            const auth = new Auth(props.history);
            handleAuthentication(auth, props);
            return <Callback {...props} />
          }} />
        </div>
      </Router>
    );
  }
}

export default Routes;
