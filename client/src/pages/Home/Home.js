import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import Counter from "../../components/Counter";
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
      userOpenMurals: [],
      userCompletedMurals: []
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
    this.loadCompletedMurals();
    this.loadOpenMuralsByUser();
  };

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

  //API request to load Completed murals for background carousel
  getCompletedMuralsByUser = () => {
    API.findCompletedMuralsByUser(this.props.profile.sub)
      .then(res => {
        console.log(res.data);
        this.setState({
          userCompletedMurals: res.data
        })
      })
      .catch(err => console.log(err));
  };



  render() {

    return (
      <div>

        {/* TESTING STUFF:
        <pre>{JSON.stringify(profile, null, 2)}</pre> */}

        {/* //NOTIFICATIONS */}
        
        <h1>User Homepage</h1>
          <br />
          <br />
          <h3>Create a new Game</h3>

          <Link to={`/game/`}> <p>Create Game</p>
          </Link>
          
        <Counter seenCounter={this.state.userCompletedMurals} />



        <Container>
          
        <h3>Completed Murals By User:</h3>
        <List>
          {this.state.userCompletedMurals.map(game => (
            <ListItem key={game._id}>
              Title: {game.title}
              Created By : {game.playerName1} <Image src={game.playerPhoto1} alt={game.playerName1} avatar />

              Completed By : {game.playerName2}<Image src={game.playerPhoto2} alt={game.playerName2} avatar />
              <img src={game.pImg1} />
              <img src={game.pImg2} />
              {/* Method for displaying something different to user if they have not seen this mural */}
              {game.p1seen ? null : <h3> NEW MURAL </h3>}
            </ListItem>
          ))}
        </List>


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
          <h3>My Open Murals- These need to be turned into sharable links/modals</h3>

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
