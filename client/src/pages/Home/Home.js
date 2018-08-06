import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import { Container, Header, Icon, Grid, Message } from "semantic-ui-react";

class Home extends Component {
  state = {
    //Storage for Open games that were created by user (do not implement until user profiles are finalized)
    ///userGames=[]

    // //Storage for Open games that were created by anyone (these are pulled from the server and are non-private, recent games)
    openMurals: []

    // //Storage for the murals pulled from the server
    // murals=[]
  };

  componentDidMount() {
    // this.loadOpenGames();
    API.findOpenMurals()
      .then(res => {
        this.setState({
          openMurals: res.data
        })
        console.log(this.state)
      })
      .catch(err => console.log(err));

  };


  // //API request to get load open world games
  // loadOpenGames = () => {
  //   API.findOpenMurals()
  //     .then(res =>
  //       this.setState({ openMurals: res.data })
  //     )
  //     .catch(err => console.log(err));
  // };

  //API request to get load games that were started by the user and are still open
  loadUserGames = () => {

  };


  render() {
    return (
      <div>
        <Container>
          <h1>User Homepage</h1>

        </Container>
      </div>
    );
  }
}

export default Home;
