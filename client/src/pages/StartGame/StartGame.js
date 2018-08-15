import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import Check from "../../components/Check";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import "./StartGame.css";
import {
  Container,
  Segment,
  Image,
  Header,
  Icon,
  Grid,
  Message,
  Button
} from "semantic-ui-react";

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      title: "",
      pImg1: "",
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

  //Submit button press function
  handleMuralSubmit = event => {
    event.preventDefault();

    //Get current canvas
    let canvasDownload = document
      .getElementById("canvas")
      .toDataURL("image/jpeg", 0.9);

    //Save canvas to state
    this.setState({
      pImg1: canvasDownload
    });

    //Send All user 1 info to mongo
    API.createMural({
      title: this.state.title,
      pImg1: canvasDownload,
      playerId1: this.props.profile.sub,
      playerName1: this.props.profile.given_name,
      playerPhoto1: this.props.profile.picture,
      private: this.state.private
      //Take the returned data and as a demonstration of pulling info from mongo and rendering it, add this res.data stuff to the current state
    })
      .then(res =>
        this.setState({
          id: res.data._id,
          successfulSubmission: true
        })
      )
      //Mongo Error handling
      .catch(err => console.log(err));
  };

  //Title input form handling
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCheckbox = () => {
    if (this.state.private === false) {
      this.setState({ private: true });
    } else {
      this.setState({ private: false });
    }
  };

  handleCopyToClipboard = () => {

    
      document.querySelector(".visible-input").select();
      // Copy to the clipboard
      document.execCommand('copy');
    
  };//End handleCopyToClipboard()

  render() {
    // User Profile Object
    const { profile } = this.props;

    return (
      <div className="start">
   
        {this.state.successfulSubmission ? (
          
          <Message>{`Image Submission Sucessful! Send the link below to a friend to complete the game! Here's your Link: `}

          <br></br>
          
          <input type="text" className="visible-input" value={`${window.location.href}${this.state.id}`} />
          <button onClick={this.handleCopyToClipboard}>COPY</button>
        
              <Link to={`/game/${this.state.id}`}>
                {" "}
                <h3>
                
                </h3>
                {" "}
              </Link>
      
          </Message>
        ) : (
          null
          // <Message negative>
          //   Please make sure to add a title. 
          // </Message>

        )}

        <Container>
          <Input
            placeholder="Mural Title"
            value={this.state.title}
            name="title"
            onChange={this.handleInputChange}
          />
          <Check
            onChange={this.handleCheckbox}
            label=" Make my mural private"
            toggle
          />
          <Grid  columns={1} centered>
            <Grid.Row>
              <Grid.Column>
                <DrawApp />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Button color="teal" onClick={this.handleMuralSubmit}>
            Submit Drawing
          </Button>
        </Container>
      
      </div>
    );
  }
}

export default StartGame;
