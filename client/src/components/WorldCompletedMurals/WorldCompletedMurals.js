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
import "./WorldCompletedMurals.css";
import FirebaseRetrieve from "../FirebaseRetrieve";

const styles = {
  mural: {
    border: "10px solid #333"
  }
};
export default class WorldCompletedMurals extends Component {


  constructor(props) {
    super(props);
    this.state = {
      completedGameIds: [],
      worldCompletedGames: []
    };
  }
  componentDidMount() {
  }

  componentWillMount() {
    this.checkAndUpdateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAndUpdateState(nextProps);
  }

  checkAndUpdateState(props) {
    this.setState({ profile: props.profile, loggedIn: props.loggedIn });
  }



  //API request to load Completed murals for background carousel
  getCompletedWorldMurals = (list) => {
    let searchArr = list.map


    API.getCompletedWorldMurals(games)
      .then(res => {
        this.setState({
          worldCompletedMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  //Firebase Callback Function- The idea here is to get the list of completed games from the child component, and then 
  //do a mongoose query using that list of id's, and then render images from those returned games on the page.  
  getGamesFromFirebase = (games) => {
    this.setState({ completedGameIds: games })
    console.log("mygames", games);
  };


  render() {
    return (
      <div>
        <h3>
          World Completed Murals
        </h3>
    
        <FirebaseRetrieve
          callback={this.getGamesFromFirebase}
          //Tells Firebase to pull from completedGames folder in database
          location="completedGames"
        />

      </div>
    );
  }
}
