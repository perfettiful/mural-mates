import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import { Container, Header, Icon, Grid, Message } from "semantic-ui-react";

class Home extends Component {
  state = {
    title: "",
    image: ""
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }
  handleMuralSubmit = event => {
    event.preventDefault();
<<<<<<< HEAD
    this.downloadCanvas("canvas");
    console.log(this.state.title, this.state.image);
    if (this.state.title && this.state.image) {
      API.saveMural({
        title: this.state.title,
        image: this.state.image
      })

    }
  };
=======
    // if (this.state.title && this.state.image) {
    //   API.saveMural({
    //     title: this.state.title,
    //     image: this.state.image
    //   })
  
    // }
  }

  
>>>>>>> ce7db3171299663c4383097e9dee4652bf7e69cf
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

<<<<<<< HEAD
  downloadCanvas = canvasId => {
    var jpeg = document.getElementById(canvasId).toDataURL("image/jpeg", 1.0);
    this.setState({
      image: jpeg
    });
  };
=======

>>>>>>> ce7db3171299663c4383097e9dee4652bf7e69cf
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
          <DrawApp/>
          <FormBtn onClick={this.handleMuralSubmit}>Submit Drawing</FormBtn>
          <img src={this.state.image} />
        </Container>
      </div>
    );
  }
}

export default Home;
