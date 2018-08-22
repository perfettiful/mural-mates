import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import Check from "../../components/Check";
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
  Button,
  Input,
  GridColumn,
  GridRow
} from "semantic-ui-react";
import { getCiphers } from "crypto";

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      title: "",
      pImg1: "",
      gameId: "",
      private: false,
      successfulSubmission: false,
      touched: { title: false }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMuralSubmit = this.handleMuralSubmit.bind(this);
  }
  validateSubmission(title) {
    //This function validates if the title field is empty
    return {
      title: this.state.title.length === 0
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
    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }
    const { email, password } = this.state;
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
    document.querySelector("#shareLink").select();
    // Copy to the clipboard
    document.execCommand("copy");
  }; //End handleCopyToClipboard()

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  canBeSubmitted() {
    const errors = this.validateSubmission(this.state.title);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }
  render() {
    // User Profile Object
    const { profile } = this.props;
    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    //Handles controlled input validation in title input for murals
    const errors = this.validateSubmission(this.state.title);
    //set const equal to errors that may exist
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      <div className="start">
        <Container>
          <Grid columns={1} centered>
            <Grid.Row>
              <Grid.Column>
                <Input
                  fluid
                  // autoFocus
                  label={{ icon: "asterisk" }}
                  labelPosition="left corner"
                  className={shouldMarkError("title") ? "error" : ""}
                  onBlur={this.handleBlur("title")}
                  type="text"
                  placeholder="Enter Hint To Save Mural"
                  value={this.state.title}
                  name="title"
                  onChange={this.handleInputChange}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <br />
                <Check
                  className="toggleCheck"
                  onChange={this.handleCheckbox}
                  label=" Make my mural private"
                  toggle
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <br />
                <DrawApp fluid />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <br />
                {this.state.successfulSubmission ? (
                  <Message>
                    {`Submission Sucessful! Send the link below to a friend to complete the game!`}
                    <br />
                    <Input
                      fluid
                      type="text"
                      className="visible-input"
                      id="shareLink"
                      value={`${window.location.href}/${this.state.id}`}
                      action={
                        <Button
                          onClick={this.handleCopyToClipboard}
                          onPress={this.handleCopyToClipboard}
                          color="blue"
                          labelPosition="right"
                          icon="copy"
                          content="COPY"
                        />
                      }
                    />

                    <Link to={`/game/${this.state.id}`}>
                      {" "}
                      <h3 />{" "}
                    </Link>
                  </Message>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            {!this.state.successfulSubmission?(
            <Grid.Row>
              <Grid.Column>
                <br />
                <Button
                  fluid
                  animated
                  // If errors exist button will be disabled, if errors do not exist button will be enabled
                  disabled={isDisabled}
                  color="blue"
                  onClick={this.handleMuralSubmit}
                  onPress={this.handleMuralSubmit}
                >
                  <Button.Content visible>Save Mural</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>{" "}
              </Grid.Column>
            </Grid.Row>):null
  }
           
          </Grid>
        </Container>
      </div>
    );
  }
}

export default StartGame;
