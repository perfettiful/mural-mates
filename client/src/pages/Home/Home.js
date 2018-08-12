import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
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


  componentWillMount () {
    this.checkAndUpdateState(this.props);
  }
  
  componentWillReceiveProps (nextProps) {
    this.checkAndUpdateState(nextProps);
  }
  
  checkAndUpdateState (props) {
    this.setState({ profile: props.profile });
  }


  componentDidMount() {
    console.log("DERP",this.props.profile.given_name);
    this.loadOpenWorldGames();
  };


  //API request to get load games that were started by the user and are still open
  loadOpenUserGames = () => {

  };

  //API request to get load open world games
  loadOpenWorldGames = () => {
    // this.loadOpenGames();
    API.findOpenMurals()
      .then(res => {
        this.setState({
          openMurals: res.data
        })
        console.log(this.state)
      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        
        {/* <h1>Home Component Data Flow Test: {this.state.profile.given_name}</h1> */}
        <Container>
          <h2>Welcome Back,</h2>
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
                  </strong>
                </Link>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    );
  }
}

export default Home;
