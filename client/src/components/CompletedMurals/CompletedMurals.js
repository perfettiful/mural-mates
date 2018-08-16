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
  Image
} from "semantic-ui-react";
import API from "../../utils/API";
import "./CompletedMurals.css";
const styles = {
  mural: {
    border: "10px solid #333"
  }
};
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
    this.loadCompletedMurals();
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
    return (
      <div>
        <h3>
          My Open Murals
        </h3>
        <List>
            {this.state.userCompletedMurals.map(game => (
              <ListItem key={game._id}>
                Title: {game.title}
                Created By : {game.playerName1}{" "}
                <Image src={game.playerPhoto1} alt={game.playerName1} avatar />
                Completed By : {game.playerName2}
                <Image src={game.playerPhoto2} alt={game.playerName2} avatar />
                 <Grid verticalAlign="middle" columns={3} centered>
                <Grid.Row>
                  <Grid.Column>
                    <Image src={game.pImg1} />
                    <Image src={game.pImg2} />
                  </Grid.Column>s
                </Grid.Row>
              </Grid>  
        {/* Method for displaying something different to user if they have not seen this mural */}
        {game.p1seen ? null : <h3> NEW MURAL </h3>}
              </ListItem>  ))}
          </List>
      </div>
    );
  }
}
