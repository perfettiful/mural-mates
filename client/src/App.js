import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartGame from "./pages/StartGame";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        {/* User Homepage that diplays open games, user profile, etc.   */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home} />

        {/* Route for when user creates a game */}
        <Route exact path="/game" component={StartGame} />

        {/* Route for when user joins a game */}
        <Route exact path="/game/:id" component={Game} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
