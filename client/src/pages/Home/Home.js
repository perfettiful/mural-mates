import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import Counter from "../../components/Counter";
import JoinMural from "../../components/JoinMural";
import Carousel from "../../components/Carousel";
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
      openMurals: [],
      //Storage for the murals pulled from the server
      completedMurals: [],
      userOpenMurals: [],
      userCompletedMurals: [],
      willJoin: false
    };
  }

  componentWillMount() {
    this.checkAndUpdateState(this.props);
    this.loadOpenMuralsByUser();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAndUpdateState(nextProps);
  }

  checkAndUpdateState(props) {
    this.setState({ profile: props.profile, loggedIn: props.loggedIn });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.profile.sub !== prevProps.profile.sub) {
      this.loadOpenMuralsByUser();
      this.getCompletedMuralsByUser();
    }
  }

  //API request to get load open world games
  loadOpenWorldGames = () => {
    // this.loadOpenGames();
    API.findOpenMurals()
      .then(res => {
        this.setState({
          openMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  //API request to load Completed murals for background carousel
  loadCompletedMurals = () => {
    // this.loadOpenGames();
    API.getMurals()
      .then(res => {
        this.setState({
          completedMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };
  //API request to load Completed murals for background carousel
  loadOpenMuralsByUser = () => {
    API.findOpenMuralsByUser(this.props.profile.sub)
      .then(res => {
        this.setState({
          userOpenMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };
  handleWillJoin = () => {
    this.setState({ willJoin: true });
  };

  //API request to load Completed murals for background carousel
  getCompletedMuralsByUser = () => {
    API.findCompletedMuralsByUser(this.props.profile.sub)
      .then(res => {
        this.setState({
          userCompletedMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const willJoin = this.state.willJoin;
    let openMurals;
    if (willJoin) {
      return <JoinMural />;
    }
    return (
      <div className="home">
      <Counter seenCounter={this.state.userCompletedMurals} />
      
       <hr/>
         <Grid
          id="mural-selection"
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
          
              <Segment stacked>
                <Button className="inverted" color="black" fluid size="large">
                  <Link to="/game">Create New Mural</Link>
                </Button>
                <Divider horizontal>Or</Divider>
                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleWillJoin}
                >
                  Join Open Murals
                </Button>
              </Segment>
         
          </Grid.Column>
        </Grid> 
      </div>
    );
  }
}

export default Home;

 
