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
import "./Carousel.css";
const styles = {
  mural: {
    border: '10px solid #333',
  }
}
export default class AutoPlay extends Component {
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
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <div>
        <Slider {...settings}>
          {this.state.completedMurals.map(game => (
            <Grid>
              <Grid.Row>
                <Grid.Column key={game._id} styles={styles.murals}>
                  <Image src={game.pImg1} />
                  <Image src={game.pImg2} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ))}
        </Slider>
      </div>
    );
  }
}
