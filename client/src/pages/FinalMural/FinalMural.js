import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import { Container,Image, Header, Icon, Grid, Message } from "semantic-ui-react";
import StitchPic from "../../components/StitchPic";



class FinalMural extends Component {
  state = {

    //Player 1 State/Submission Data
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
          pImg1: res.data.pImg1,pImg2:res.data.pImg2,title: res.data.title, gameId: res.data.uniqueid
        })
        console.log(this.state)
      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div>
        <Container>
        <Image src={this.state.pImg1}/>
        <Image src={this.state.pImg2}/>
       
        </Container>
      </div>
      
    );
  }
}

export default FinalMural;
