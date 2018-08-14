import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import Counter from "../../components/Counter";
import JoinMural from "../../components/JoinMural";
import Carousel from "../../components/Carousel";
import "./Home.css";
import API from "../../utils/API";
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      openMurals: [],
      //Storage for the murals pulled from the server
      completedMurals: [],
      userOpenMurals: [],
      userCompletedMurals: [],
      willJoin: false
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
    this.loadOpenWorldGames();
    // this.loadCompletedMurals();
    this.loadOpenMuralsByUser();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.profile.sub !== prevProps.profile.sub) {
      this.loadOpenMuralsByUser();
      this.getCompletedMuralsByUser();
    }
  }

  //API request to get load open world games
  loadOpenWorldGames = () => {
    // this.loadOpenGames();
    API.findOpenMurals()
      .then(res => {
        this.setState({
          openMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  //API request to load Completed murals for background carousel
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
  //API request to load Completed murals for background carousel
  loadOpenMuralsByUser = () => {
    API.findOpenMuralsByUser(this.props.profile.sub)
      .then(res => {
        this.setState({
          userOpenMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };
  handleWillJoin = () => {
    this.setState({ willJoin: true });
  };

  //API request to load Completed murals for background carousel
  getCompletedMuralsByUser = () => {
    API.findCompletedMuralsByUser(this.props.profile.sub)
      .then(res => {
        console.log(res.data);
        this.setState({
          userCompletedMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const willJoin = this.state.willJoin;
    let openMurals;
    if (willJoin) {
      return <JoinMural />;
    }
    return (
      <div className="home">
        {/* TESTING STUFF:
        <pre>{JSON.stringify(profile, null, 2)}</pre> */}

        {/* //NOTIFICATIONS */}

        <Grid
          id="mural-selection"
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment stacked>
              <Header as="h1" color="grey" textAlign="center">
                <Image>
                  <i className="fas fa-skull" />{" "}
                </Image>
                Welcome to Mural Mates
              </Header>
              <Segment stacked>
                <Button className="inverted" color="black" fluid size="large">
                  <Link to={`/game/`}>Create New Mural</Link>
                </Button>
                <Divider horizontal>Or</Divider>
                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleWillJoin}
                >
                  Join Open Murals
                </Button>
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid>
        {/* <Button color="olive" fluid size="large">
          <Link to={`/game/`}>Create New Mural</Link>
        </Button> */}
        {/* <h1>User Homepage</h1>
        <br />
        <br />
        <h3>Create a new Game</h3>

        <Counter seenCounter={this.state.userCompletedMurals} />
      
          <h3>Completed Murals By User:</h3>

          <List>
            {this.state.userCompletedMurals.map(game => (
              <ListItem key={game._id}>
                Title: {game.title}
                Created By : {game.playerName1}{" "}
                <Image src={game.playerPhoto1} alt={game.playerName1} avatar />
                Completed By : {game.playerName2}
                <Image src={game.playerPhoto2} alt={game.playerName2} avatar />
                 <Grid verticalAlign="middle" columns={3} centered>
                <Grid.Row>
                  <Grid.Column>
                    <Image src={game.pImg1} />
                    <Image src={game.pImg2} />
                  </Grid.Column>s
                </Grid.Row>
              </Grid>  */}
        {/* Method for displaying something different to user if they have not seen this mural */}
        {/* {game.p1seen ? null : <h3> NEW MURAL </h3>}
              </ListItem>
            ))}
          </List>
      
          <h3>
            My Open Murals- These need to be turned into sharable links/modals
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
      
        <br /> */}
        {/* These murals will actually need to be turned into a setTimer carousel background image -ZK */}

        {/* <h3>Completed Murals</h3>
          <List>
            {this.state.completedMurals.map(game => (
              <ListItem key={game._id} className="murals">
                <Grid verticalAlign="middle" columns={3} centered>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src={game.pImg1} />
                      <Image src={game.pImg2} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </ListItem>
            ))}
          </List> */}
      </div>
    );
  }
}

export default Home;
