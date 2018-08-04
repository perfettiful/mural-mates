import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";



class Game extends Component {
  state = {

    //Player 1 State/Submission Data
    title: "blah",
    pImg1: "",

    pImg2: "",
    gameId: ""
  };

  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getMural(this.props.match.params.id)
      .then(res => this.setState({ pImg1: res.data.pImg1, title: res.data.title, gameId: res.data._id }))
      .catch(err => console.log(err));
  }

  //Submit button press function
  handleMuralSubmit = event => {
    event.preventDefault();

    //Get current canvas
    let canvasDownload = document.getElementById("canvas").toDataURL("image/jpeg", .3);

    //Save canvas to state
    this.setState({
      imga: canvasDownload
    });

    //Send All user 1 info to mongo
    API.saveMural({
      title: this.state.title,
      imga: canvasDownload

      //Take the returned data and as a demonstration of pulling info from mongo and rendering it, add this res.data stuff to the current state
    }).then(res =>
      this.setState({ imgb: res.data.imga, imgbTitle: res.data.title, submitId: res.data._id })

    )
    //Mongo Error handling
      .catch(err => console.log((err))
      )
  };

  //Title input form handling
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      
      <div>
        <Container>
          <Input
            placeholder="Mural Title"
            value={this.state.title}
            name="title"
            onChange={this.handleInputChange}
          />
          <DrawApp />
          <FormBtn onClick={this.handleMuralSubmit}>Submit Drawing</FormBtn>
        </Container>
        <p>IMG A:</p>
        <img src={this.state.imga} />


        {/* Display returned data from mongo submission- this is what user 1 and 2 will see */}

        {/* The URL link we will need to display- obviously this will need to get cleaned up */}
        <p>mongodblink.com/{this.state.submitId}</p>

        {/* Render the sent image from user A on the page- this is the image pulled from the mongo object */}
        <p>IMG B Image and  Title Loaded: {this.state.imgbTitle}</p>
        <img src={this.state.imgb} />

      </div>
    );
  }
}

export default Game;
