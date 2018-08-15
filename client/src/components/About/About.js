import React from 'react'
import {
  Segment,
  Button,
  Divider,
  Container,
  Header,
  Icon,
  Grid,
  Message,
  Form,
  Image
} from "semantic-ui-react";
 
class Contact extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }
 
  draw() {
    // Draw whatever
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
 
  render () {
    return (
      <div>
    <Button />
    Contact Stuff goes here.
      </div>
    );
  }
}


export default Contact;