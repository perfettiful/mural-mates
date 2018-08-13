import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import Check from "../../components/Check";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import { Container, Header, Icon, Grid, Message } from "semantic-ui-react";

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      title: "",
      pImg1: "",
      gameId: "",
      private: true,
      successfulSubmission:false
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
      .toDataURL("image/jpeg", .9);

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
          successfulSubmission:true
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

  render() {

    // User Profile Object
    const { profile } = this.props;

    return (



      <div>
        {this.state.successfulSubmission ? <button><Link to={`/game/${this.state.id}`}>
          {" "}
          <h3> Image Submission Sucessful!  Click here to send to a friend! </h3>
        </Link></button> : <h1></h1>}

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

          <DrawApp />
          <FormBtn onClick={this.handleMuralSubmit}>Submit Drawing</FormBtn>
        </Container>


      </div>
    );
  }
}

export default StartGame;
