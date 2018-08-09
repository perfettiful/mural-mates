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

class ContinueGame extends Component {
  state = {
    //Player 1 State/Submission Data
    gameId:"",
    title: "",
    pImg1: "",
    pImg2: ""
  };

  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getMural(this.props.match.params.id)
      .then(res => {
        this.setState({
          pImg1: res.data.pImg1,
          pImg2: res.data.pImg2,
          title: res.data.title,
          gameId:this.props.match.params.id
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
      {pImg2:canvasDownload}

      //Take the returned data and as a demonstration of pulling info from mongo and rendering it, add this res.data stuff to the current state
    )      .then(res =>
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
    return (
      <div>
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
