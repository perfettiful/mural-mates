import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Card, Image, Container, Segment } from "semantic-ui-react";
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
      worldCompletedMurals: []
    };
  }
  componentDidMount() {}

  componentWillMount() {
    this.checkAndUpdateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAndUpdateState(nextProps);
  }

  checkAndUpdateState(props) {
    this.setState({ profile: props.profile, loggedIn: props.loggedIn });
  }

  // //API request to load Completed murals for background carousel
  getAllCompletedGames = list => {
    let searchArr = [];

    //Turn object containing ids and values into just an array of values for searching mongoose
    list.forEach(function(element, index) {
      searchArr.push(element.id);
    });

    let searchObj = {};

    searchObj.data = searchArr;
    API.getAllCompletedGames(searchObj)
      .then(res => {
        this.setState({
          worldCompletedMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  //Firebase Callback Function- The idea here is to get the list of completed games from the child component, and then
  //do a mongoose query using that list of id's, and then render images from those returned games on the page.
  getGamesFromFirebase = games => {
    this.setState({ completedGameIds: games });
    this.getAllCompletedGames(this.state.completedGameIds);
    //API Function Call
  };

  render() {
    return (
      //I've added the below html just for testing purposes- we need this to render the completed pairs of images in a way
      //that shows multiple on a page, etc.
      <div>
        <Container text textAlign="center"><Segment raised> <h1> WORLD COMPLETED MURALS </h1></Segment></Container>
        <h1>{this.state.WorldCompletedMurals}</h1>
        <FirebaseRetrieve
          callback={this.getGamesFromFirebase}
          //Tells Firebase to pull from completedGames folder in database
          location="completedGames"
        />

        <Card.Group centered>
          {this.state.worldCompletedMurals.map(game => (
            <Link to={"/game/" + game._id}>
              <Card key={game._id}>
                <Container><strong>
                  Img1: <Image src={game.pImg1} />
                  Img2 : <Image src={game.pImg2} />
                </strong>
                </Container>
              </Card>{" "}
            </Link>
          ))}
        </Card.Group>
      </div>
    );
  }
}
