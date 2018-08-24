import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import ImageSlicer from "../../components/ImageSlicer";
import API from "../../utils/API";
import Firebase from '../../Firebase'; // <--- add this line


import {
  Container,
  Image,
  Header,
  Icon,
  Grid,
  Message,
  Button
} from "semantic-ui-react";
import "./ContinueGame.css";

class ContinueGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      title: "",
      pImg1: "",
      pImg2: "",
      gameId: "",
      private: false,
      successfulSubmission: false
    };
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

  // When this component mounts, grab the book with the _id of this.props.match.params.id
  componentDidMount() {

    API.getMural(this.props.match.params.id)
      .then(res => {
        this.setState({
          pImg1: res.data.pImg1,
          playerName1: res.data.playerName1,
          playerPhoto1: res.data.playerPhoto1,
          pImg2: res.data.pImg2,
          title: res.data.title,
          gameId: this.props.match.params.id
        });
      })
      .catch(err => console.log(err));
  }

  submitToFirebase() {
    //props.location tells which folder to put item in (i.e. completedGames.....)
    let location = Firebase.database().ref("completedGames");
    //props.data
    const item = {
      id:this.props.match.params.id,
    }
    location.push(item);
  }

  handleMuralSubmit = event => {
    event.preventDefault();

    //Get current canvas
    let canvasDownload = document
      .getElementById("canvas")
      .toDataURL("image/jpeg", 0.9);

    //Save canvas to state
    this.setState({
      pImg2: canvasDownload
    });

    //Send All user 1 info to mongo
    API.editMural(
      this.state.gameId,
      {
        p1seen: false,
        pImg2: canvasDownload,
        playerId2: this.props.profile.sub,
        playerName2: this.props.profile.given_name,
        playerPhoto2: this.props.profile.picture
      }

      //Take the returned data and as a demonstration of pulling info from mongo and rendering it, add this res.data stuff to the current state
    )
      .then(res => {
        this.setState({
          successfulSubmission: true
        });
        this.submitToFirebase();
      })

      //Mongo Error handling
      // .catch(err => console.log(err));
  };

  render() {
    // User Profile Object
    const { profile } = this.props;

    return (
      <div className="continue">
        {/* Pull info about creator of the mural */}
        <Container>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={16}>
                <br />
                <h1>
                  <Image
                    src={this.state.playerPhoto1}
                    alt={this.state.playerName1}
                    avatar
                  />
                  {this.state.playerName1} Sent you a Mural!
                </h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <h1>
                  <i>{this.state.title}</i>
                </h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                Image Hint:
                <ImageSlicer image={this.state.pImg1} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <DrawApp />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                {this.state.successfulSubmission ? (
                  <div>
                    <Message>
                      <p>Submission Sucessful!</p>
                      <br />
                      <Link color="red" to={`/game/mural/${this.state.gameId}`}>
                        See Final Mural
                      </Link>
                      {/* <Button
                        color="blue"
                        labelPosition="right"
                        icon="right arrow"
                        content="See the full mural"
                        action={
                          
                        } */}
                      {/* />{" "} */}
                    </Message>
                  </div>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Button animated color="blue" onClick={this.handleMuralSubmit}>
                  <Button.Content visible>Save Mural</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* Original Title of Mural */}
        </Container>
      </div>
    );
  }
}

export default ContinueGame;
