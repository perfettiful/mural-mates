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
import "./MyOpenMurals.css";
const styles = {
  mural: {
    border: "10px solid #333"
  }
};
export default class MyOpenMurals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOpenMurals: []
    };
  }
  componentWillMount() {
    this.checkAndUpdateState(this.props);
    this.loadOpenMuralsByUser();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAndUpdateState(nextProps);
  }

  checkAndUpdateState(props) {
    this.setState({ profile: props.profile, loggedIn: props.loggedIn });
  }
  componentDidMount() {
    this.loadOpenMuralsByUser();
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.profile.sub !== prevProps.profile.sub) {
      this.loadOpenMuralsByUser();

    }
  }

  loadOpenMuralsByUser = () => {
    API.findOpenMuralsByUser(this.props.profile.sub)
      .then(res => {
        this.setState({
          userOpenMurals: res.data
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
