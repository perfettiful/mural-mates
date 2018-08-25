import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {
  Container,
  Image,
 Divider,
  CardHeader
} from "semantic-ui-react";
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
        this.setState({
          title: res.data.title,
          pImg1: res.data.pImg1,
          playerName1: res.data.playerName1,
          playerPhoto1: res.data.playerPhoto1,
          pImg2: res.data.pImg2,
          playerPhoto2: res.data.playerPhoto2,
          playerName2: res.data.playerName2,
          gameId: res.data.uniqueid
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="finalMural">
        <CardHeader>
          <h2>
            <u>{this.state.title} By:</u>
          </h2>
          <Image src={this.state.playerPhoto1} alt={this.state.playerName1} size="mini"/>
          {this.state.playerName1} and{" "}
          <Image src={this.state.playerPhoto2} alt={this.state.playerName2} size="mini"/>{" "}
          {this.state.playerName2}
          <Divider/>
        </CardHeader>

        <Container fluid className="mural">
          <Image className="topImage" src={this.state.pImg1} />
          <Image className="bottomImage" src={this.state.pImg2} />
        </Container>
      </div>
    );
  }
}

export default FinalMural;
