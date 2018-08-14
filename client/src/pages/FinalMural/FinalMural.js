import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import { Container, Image, Header, Icon, Grid, Message } from "semantic-ui-react";
import StitchPic from "../../components/StitchPic";
import styles from "./FinalMural.css";

class FinalMural extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      title: "",
      pImg1: "",
      pImg2: ""
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

  componentDidMount() {
    //Get Mural Info
    API.getMural(this.props.match.params.id)
      .then(res => {
        console.log("FINAL RESPONSE",res);
        this.setState({
          title: res.data.title,
          pImg1: res.data.pImg1,
          playerName1: res.data.playerName1,
          playerPhoto1: res.data.playerPhoto1,
          pImg2: res.data.pImg2,
          playerPhoto2: res.data.playerPhoto2,
          playerName2: res.data.playerName2,
          gameId: res.data.uniqueid
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div >
        
        <h1>{this.state.title}:
        By:<Image src={this.state.playerPhoto1} alt={this.state.playerName1} avatar />{this.state.playerName1} 
        <br/>
        and: <Image src={this.state.playerPhoto2} alt={this.state.playerName2} avatar /> {this.state.playerName2}</h1>
        <Container className="finalMural">
    
        <Grid verticalAlign='middle' columns={1} centered>
        <Grid.Row>
          <Grid.Column>
            <Image src={this.state.pImg1} />
            <Image src={this.state.pImg2} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
        </Container>
      </div>

    );
  }
}

export default FinalMural;
