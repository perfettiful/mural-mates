import React, {Component} from "react";
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// App.js
import Auth from './Auth/Auth.js';

const auth = new Auth();

class App extends Component {
  componentDidMount(){
    
    // if (!auth.isAuthenticated()){
      
      //   auth.login();
      // } 
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
    
    return (
      <div>
      <Navbar.Header>
        <Navbar fluid>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
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
                 <Route exact path="/home" component={Home} />
                 <Route exact path="/" component={Home} />
                 <Route exact path="/books" component={Books} />
                 <Route exact path="/books/:id" component={Detail} />
                 <Route component={NoMatch} />
              </Switch> 
      </div>
    );
  }
}


export default App;
