import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route exact path="/game/:id" component={Game} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
