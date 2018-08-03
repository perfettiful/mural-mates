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
    let canvasDownload = this.downloadCanvas("canvas");
    if (this.state.title && canvasDownload) {
      API.saveMural({
        title: this.state.title,
        imga: canvasDownload
      })
    }
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  downloadCanvas = canvasId => {
    var jpeg = document.getElementById(canvasId).toDataURL("image/jpeg", 1.0);
    // this.setState({
    //   image: jpeg
    // });
    return jpeg;
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
          <DrawApp/>
          <FormBtn onClick={this.handleMuralSubmit}>Submit Drawing</FormBtn>
          <img src={this.state.image} />
        </Container>
      </div>
    );
  }
}

export default Home;
