import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import {
  Container,
  Image,
  Header,
  Icon,
  Grid,
  Message
} from "semantic-ui-react";
import StitchPic from "../../components/StitchPic";

class ContinueGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      title: "",
      pImg1: "",
      pImg2: "",
      gameId: "",
      private: false
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
        console.log(this.state);
      })
      .catch(err => console.log(err));
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
        pImg2: canvasDownload,
        playerId2: this.props.profile.sub,
        playerName2: this.props.profile.given_name,
        playerPhoto2: this.props.profile.picture,
      }

      //Take the returned data and as a demonstration of pulling info from mongo and rendering it, add this res.data stuff to the current state
    ).then(res =>
      this.setState({
        pImg1: res.data.pImg1,
        pImg2: res.data.pImg2,
        title: res.data.title,
        id: res.data._id,
        private: res.data.private
      })
    )
      //Mongo Error handling
      .catch(err => console.log(err));
    console.log(this.state);
  };

  render() {

    // User Profile Object
    const { profile } = this.props;

    return (
      <div>

        {/* Pull info about creator of the mural */}
        <h1><Image src={this.state.playerPhoto1} alt={this.state.playerName1} avatar />{this.state.playerName1} Sent you a Mural!</h1>
        <br />

        {/* Original Title of Mural */}
        <h1><i>{this.state.title}</i></h1>
        <Container>
          <Image src={this.state.pImg1} />
          <DrawApp />
          <FormBtn onClick={this.handleMuralSubmit}>
            Submit Final Drawing
          </FormBtn>
        </Container>
        {/* Display returned data from mongo submission- this is what user 1 and 2 will see */}
        <Image src={this.state.pImg1} />
        <Image src={this.state.pImg2} />

        {/* The URL link we will need to display- obviously this will need to get cleaned up */}
        <button>
          <Link to={`/game/mural/${this.state.gameId}`}><span>Final Mural Link</span></Link>
        </button>

        {/* Render the sent image from user A on the page- this is the image pulled from the mongo object */}

      </div>
    );
  }
}

export default ContinueGame;
