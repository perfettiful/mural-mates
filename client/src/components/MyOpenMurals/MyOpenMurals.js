import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { List, ListItem } from "../List";
import {
  Card,
  Image,
  Container, 
  Segment,
  Divider
} from "semantic-ui-react";
import API from "../../utils/API";
import "./MyOpenMurals.css";
const styles = {
    padding:"5px"
  
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
    if(this.props.profile){
    API.findOpenMuralsByUser(this.props.profile.sub)
      .then(res => {
        this.setState({
          userOpenMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };}
  
  render() {
    return (
      <div>
       <Container text textAlign="center"><Segment raised> <h1> MY OPEN MURALS </h1></Segment></Container>
<Divider/>
        <Card.Group centered>
          {this.state.userOpenMurals.map(game => (
            <Card key={game._id} style={styles}>
              <Link to={"/game/" + game._id}>
                <Card.Header> Title : {game.title}
                </Card.Header>
                <Divider horizontal />
                
                <Card.Content><strong>
                  Img: <Image src={game.pImg1} />
                 
                </strong></Card.Content>
              </Link>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}
