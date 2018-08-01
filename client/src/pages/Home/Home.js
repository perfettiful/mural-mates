import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";

import {
  Container,
  Header,
  Icon,
  Grid,
  Message,
} from "semantic-ui-react";


class Home extends Component {
  state = {
    image: "",
    match: false,
    matchCount: 0,
    cards:[]
  };

  handleImageClick = event => {
//insert matching logic and click function here
  };


  render() {
    return (
      <div> 
        <Container fluid>
          <Grid.Row>
            <Grid.Column>
              <Message>
                <Header as="h1" color="teal" textAlign="left">
                  <Icon name="help" circular />Mural Mates
                </Header>
              </Message>
            </Grid.Column>
          </Grid.Row>
          </Container>
          <Container>
        <DrawApp/>
         </Container>
      </div>
    );
  }
}

export default Home;
