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
      murals: []
      ///userGames=[]
    };
  }


  componentWillMount() {
    this.checkAndUpdateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAndUpdateState(nextProps);
  }

  checkAndUpdateState(props) {
    this.setState({ profile: props.profile, loggedIn: props.loggedIn });

  }


  componentDidMount() {
    this.loadOpenWorldGames();
  };


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


  render() {
    const { profile } = this.props;

    return (
      <div>

        {/* TESTING STUFF:
        <pre>{JSON.stringify(profile, null, 2)}</pre> */}

        <h1>Home Component Data Flow Test: {profile.given_name}</h1>
        <Container>
          <h1>User Homepage</h1>
          <br />
          <br />
          <h3>Create a new Game</h3>

          <Link to={`/game/`}> <p>Create Game</p>
          </Link>

          <h3>Open World Games</h3>

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


        </Container>
      </div>
    );
  }
}

export default Home;
