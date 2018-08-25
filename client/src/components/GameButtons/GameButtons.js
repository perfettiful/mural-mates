import React from "react";
import {
  Segment,
  Button,
  Divider,
  Header,
  Grid,
  Image,
  Modal
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./GameButtons.css";
import JoinMural from "../../components/JoinMural";
const styles = {
  color: "#555"
};
class GameButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      loggedIn: false,
      willJoin: false
    };
  }
componentDidMount(){
  this.setState({loggedIn:this.state.willJoin, willJoin:this.state.loggedIn});
}
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.auth.isAuthenticated() &&
      prevState.loggedIn == false &&
      this.state.loggedIn == false
    ) {
      this.populateProfile();
    }
  }
  handleWillJoin = () => {
    this.setState({ willJoin: true });
  };
  populateProfile() {
    let authorized = this.props.auth.isAuthenticated();
    if (authorized) {
      this.setState({ profile: {}, loggedIn: true });
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
          this.props.callbackFromParent(true);
        });
      } else {
        this.setState({ profile: userProfile });
        this.props.callbackFromParent(true);
      }
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
    this.setState({ loggedIn: false });
    this.props.callbackFromParent(false);
  }
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const willJoin = this.state.willJoin;
    let openMurals;
    return (
      <div>
        <Grid
          id="mural-selection"
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Row>
            {!isAuthenticated() ? (
              <Grid.Column style={{ maxWidth: 450 }}>
                <Segment stacked>
                  <Header as="h1" color="grey" textAlign="center">
                    <Image>
                      <i className="fas fa-skull" />{" "}
                    </Image>
                    Welcome to Mural Mates
                  </Header>
                  <Segment stacked>
                    <Button
                      className="inverted"
                      color="black"
                      fluid
                      size="large"
                      name="logIn"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                    </Button>
                  </Segment>
                </Segment>
              </Grid.Column>
            ) : (
              <Grid.Column style={{ maxWidth: 450 }}>
                <Segment stacked>
                  <Modal trigger={<Button fluid size="large">How To Play</Button>} closeIcon>
                    <Header icon="paint brush" content="How To Play" />
                    <Modal.Content style={styles}>
                    <h3>
                    {" "}
                    Mural Mates is a game based on the surrealist concept of "Exquisite
                    Corpse", a practice in collaborative creativity.
                  </h3>
                  <p>
                    {" "}
                    In order to play, you can create a new game and draw out the
                    "head" of the corpse. Alternatively, you can join an
                    incomplete mural and complete the body based on the sliver
                    of a hint given.
                  </p>

                  <p>
                    Once the second player has finished drawing the body you can
                    see the combined "Mural" made up of the two separate images.
                  </p>

                  <p>
                    {" "}
                    Don't worry too much about trying to draw the perfect image.
                    The fun in the game is seeing what you and a friend or a
                    stranger can create together.
                  </p>
                    </Modal.Content>
                  </Modal>
                  <Divider horizontal />
                  <Link to={`/game/`}>
                    <Button color="black" fluid size="large">
                      Create New Mural
                    </Button>
                  </Link>
                  <Divider horizontal>Or</Divider>
                  <Button
                    color="blue"
                    fluid
                    size="large"
                    onClick={this.handleWillJoin}
                  >
                    Join Open Murals
                  </Button>
                  
                </Segment>
              </Grid.Column>
            )}
          </Grid.Row>
          {(isAuthenticated && willJoin) ?(<JoinMural/>):null}
        </Grid>
      </div>
    );
  }
}

export default GameButtons;
