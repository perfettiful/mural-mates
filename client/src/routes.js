// src/routes.js

import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
// import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const handleAuthentication = (auth, nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route exact path="/" render={(props) => {

          const auth = new Auth(props.history);
          return < App auth={auth} {...props} />
        }} />
        <Route exact path="/callback" render={(props) => {
          const auth = new Auth(props.history);
          handleAuthentication(auth, props);
          return <Callback {...props} />
        }} />
      </div>
    </Router>
  );
}