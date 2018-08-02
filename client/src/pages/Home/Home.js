import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import { FormBtn, Input } from "../../components/Form";

import { Container, Header, Icon, Grid, Message } from "semantic-ui-react";

class Home extends Component {
  state = {
    title:"",
    image:""
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }
  handleMuralSubmit=event=> {
    event.preventDefault();
    // if (this.state.title && this.state.image) {
    //   API.saveMural({
    //     title: this.state.title,
    //     image: this.state.image
    //   })
  
    // }
  }
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
      </div>
    );
  }
}

export default Home;
