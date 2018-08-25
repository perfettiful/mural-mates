import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { List, ListItem } from "../List";
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
  Card
} from "semantic-ui-react";
import API from "../../utils/API";
import "./CompletedMurals.css";
import FinalMural from "../../pages/FinalMural";

export default class CompletedMurals extends Component {
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
  componentDidMount() {
    this.getCompletedMuralsByUser();
  }
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
  componentWillMount() {
    this.checkAndUpdateState(this.props);
    this.getCompletedMuralsByUser();
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
      this.getCompletedMuralsByUser();
    }
  }

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
    return (
      <div>
        <Container text textAlign="center"><Segment raised> <h1> MY COMPLETED MURALS </h1></Segment></Container>
        <br/>
        {/* <List> */}
<Divider/>

        <Card.Group centered>
          {" "}
          {this.state.userCompletedMurals.map(game => (
            <Card key={game._id}>
              <Card.Content>
                <FinalMural
                 
                  match={{ params: { id: game._id } }}
                />
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}
