import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { List, ListItem } from "../List";
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
import API from "../../utils/API";
import "./CompletedMurals.css";
const styles = {
  mural: {
    border: "10px solid #333"
  }
};
export default class CompletedMurals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedMurals: []
    };
  }
  componentDidMount() {
    this.loadCompletedMurals();
  }
  loadCompletedMurals = () => {
    // this.loadOpenGames();
    API.getMurals()
      .then(res => {
        this.setState({
          completedMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h3>
          My Open Murals
        </h3>

        <List>
          {this.state.userOpenMurals.map(game => (
            <ListItem key={game._id}>
              <Link to={"/game/" + game._id}>
                <strong>
                  Img: <Image src={game.pImg1} />
                  Title : {game.title}
                </strong>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
