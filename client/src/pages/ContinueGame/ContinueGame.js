import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import { Container, Header, Icon, Grid, Message } from "semantic-ui-react";
import StitchPic from "../../components/StitchPic";



class ContinueGame extends Component {
  state = {

    //Player 1 State/Submission Data
    title: "",
    pImg1: "",

    pImg2: "",
    gameId: "",
    private:false
   };

  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getMural(this.props.match.params.id)
      .then(res =>{ this.setState({ 
        pImg1: res.data.pImg1, title: res.data.title, gameId: res.data.uniqueid }) 
        console.log(this.state)})
      .catch(err => console.log(err));
     
  }


  handleMuralSubmit = event => {
    event.preventDefault();

    //Get current canvas
    let canvasDownload = document.getElementById("canvas").toDataURL("image/jpeg", .3);

    //Save canvas to state
    this.setState({
      pImg2: canvasDownload
    });

    //Send All user 1 info to mongo
    API.editMural({
      pImg2: canvasDownload

      //Take the returned data and as a demonstration of pulling info from mongo and rendering it, add this res.data stuff to the current state
    }).then(res =>
      this.setState({ pImg2:res.data.pImg1, title:res.data.title, gameId:res.data._id })
    
    )
    //Mongo Error handling
      .catch(err => console.log((err))
      )  
      console.log(this.state.gameId);

  };

  //Title input form handling
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  //gameUrl=()=>("localhost:3000/game/"+this.state.gameId)

  render() {
    return (
      <div>
        <Container>
        <StitchPic />
          <DrawApp />
          <FormBtn onClick={this.handleMuralSubmit}>Submit Drawing</FormBtn>
        </Container>
      
        <img src={this.state.pImg1} />


        {/* Display returned data from mongo submission- this is what user 1 and 2 will see */}

        {/* The URL link we will need to display- obviously this will need to get cleaned up */}
       <button><a href={'localhost:3000/game/'+this.state.gameId}>Game Url</a></button>

        {/* Render the sent image from user A on the page- this is the image pulled from the mongo object */}
        <p>IMG B Image and  Title Loaded: {this.state.title}</p>
        <img src={this.state.pImg2} />
<p>mongodblink.com/{this.state.gameId}</p>


      </div>
    );
  }
}

export default ContinueGame;
