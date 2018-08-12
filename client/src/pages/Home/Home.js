import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import { Image } from "semantic-ui-react";
import { Container, Header, Icon, Grid, Message } from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      openMurals: [],
      //Storage for the murals pulled from the server
      completedMurals: [],
      userOpenMurals: []
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
  };

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
        })
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
        })
      })
      .catch(err => console.log(err));
  };

  //API request to load Completed murals for background carousel
  loadOpenMuralsByUser = () => {
    API.findOpenMuralsByUser(this.props.profile.sub)
      .then(res => {
        this.setState({
          userOpenMurals: res.data
        })
      })
      .catch(err => console.log(err));
  };


  render() {
    const { profile } = this.props;

    return (
      <div>

        {/* TESTING STUFF:
        <pre>{JSON.stringify(profile, null, 2)}</pre> */}

        <Container>
          <h1>User Homepage</h1>
          <br />
          <br />
          <h3>Create a new Game</h3>

          <Link to={`/game/`}> <p>Create Game</p>
          </Link>

          <h3>Join a Mural!</h3>

          <List>
            {this.state.openMurals.map(game => (
              <ListItem key={game._id}>
                <Link to={"/game/" + game._id}>
                  <strong>
                    Img:   <img src={game.pImg1} />
                    Title : {game.title}
                    Created By : {game.playerName1}
                    <Image src={game.playerPhoto1} alt={game.playerName1} avatar />
                  </strong>
                </Link>
              </ListItem>
            ))}
          </List>

          <br />
          <h3>My Open Murals</h3>

          <List>
            {this.state.userOpenMurals.map(game => (
              <ListItem key={game._id}>
                <Link to={"/game/" + game._id}>
                  <strong>
                    Img:   <img src={game.pImg1} />
                    Title : {game.title}
                  </strong>
                </Link>
              </ListItem>
            ))}
          </List>

          <br />
          {/* These murals will actually need to be turned into a setTimer carousel background image -ZK */}
          <h3>Completed Murals</h3>
          <List>
            {this.state.completedMurals.map(game => (
              <ListItem key={game._id}>
                <img src={game.pImg1} />
                <img src={game.pImg2} />
              </ListItem>
            ))}
          </List>

        </Container>
      </div>
    );
  }
}

export default Home;
