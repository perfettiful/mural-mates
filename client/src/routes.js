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

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>

        {/* Toggling exact here causes profile info to auto update after callback */}
        <Route exact path="/" render={(props) => {

          const auth = new Auth(props.history);
          return < App auth={auth} {...props} />
        }} />

        <Switch>
          {/* User Homepage that diplays open games, user profile, etc.   */}
          {/* <Route exact path="/home" component={Home} /> */}

          <Route exact path="/home" render={(props) => {

            const auth = new Auth(props.history);
            return < Home auth={auth} {...props} />
          }} />

          <Route exact path="/" component={Home} />

          {/* Route for when user creates a game */}
          <Route exact path="/game" component={StartGame} />

          {/* Route for when user joins a game */}
          <Route exact path="/game/:id" component={ContinueGame} />
          <Route exact path="/game/mural/:id" component={FinalMural} />
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