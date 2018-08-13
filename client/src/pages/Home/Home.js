import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import LandingPage from "../../pages/LandingPage";
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
      willCreate: false,
      willJoin: false
    };
  }

  componentWillMount() {
    this.checkAndUpdateState(this.props);
    console.log("will mount");
    this.loadOpenMuralsByUser();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAndUpdateState(nextProps);
    console.log("will reeive props");
  }

  checkAndUpdateState(props) {
    console.log("check update props");
    this.setState({ profile: props.profile, loggedIn: props.loggedIn });
  }

  componentDidMount() {
    console.log("comp did mount");
    this.loadOpenWorldGames();
    this.loadCompletedMurals();
    this.loadOpenMuralsByUser();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.profile.sub !== prevProps.profile.sub) {
      this.loadOpenMuralsByUser();
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

  handleWillCreate = () => {
    this.setState({ willCreate: true });
  };

  render() {
    const { profile } = this.props;
    const willJoin = this.state.willJoin;

    return (
      <div>
        {/* TESTING STUFF:
        <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        <style type="text/css">{`
      body > div,
      body > div > div,
      body > div > div > div.landing-page {
        height: 100%;
      }
    `}</style>

        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
          className="landing-page"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" color="teal" textAlign="center">
              <Image src="../../favicon.ico" /> Welcome to Mural Mates
            </Header>
            <Form size="large">
              <Segment stacked>
                <Button color="primary" fluid size="large" to={`/game/`}>
                  Create New Mural
                </Button>
                <Divider horizontal>Or</Divider>
                <Button color="secondary" fluid size="large" onClick="">
                  Join Open Murals
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>


        {/* Ternary operator */}
        <Container>
          <h1>User Homepage</h1>
          <br />
          {/* <br />
          <h3>Create a new Game</h3>

          <h3>Join a Mural!</h3> */}
          if(willJoin){
          <List>
            {this.state.openMurals.map(game => (
              <ListItem key={game._id}>
                <Link to={"/game/" + game._id}>
                  <strong>
                    Img: <img src={game.pImg1} />
                    <br />
                    Title : {game.title}
                    <br />
                    Created By: {game.playerName1}
                    <Image
                      src={game.playerPhoto1}
                      alt={game.playerName1}
                      avatar
                    />
                  </strong>
                </Link>
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
                    Img: <img src={game.pImg1} />
                    Title : {game.title}
                  </strong>
                </Link>
              </ListItem>
            ))}
          </List>
          }else{null}

          {/* These murals will actually need to be turned into a setTimer carousel background image -ZK */}
          <h3>Completed Murals</h3>
          <List>
            {this.state.completedMurals.map(game => (
              <ListItem key={game._id}>
                <Grid verticalAlign="middle" columns={1} centered>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src={game.pImg1} />
                      <Image src={game.pImg2} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    );
  }
}

export default Home;
