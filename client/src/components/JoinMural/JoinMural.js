import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Image, Button, Card, Divider } from "semantic-ui-react";
import Home from "../../pages/Home";
import ImageSlicer from "../ImageSlicer";
import { List, ListItem } from "../List";
import API from "../../utils/API";

const styles = {
  test: {
    width: "300px",
    height: "100px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 75%"
  }
};
const cardStyle = {
   padding: "15px"
};

class JoinMural extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMurals: []
    };
  }

  componentDidMount() {
    this.loadOpenWorldGames();
  }
  loadOpenWorldGames = props => {
    // this.loadOpenGames();
    API.findOpenMurals()
      .then(res => {
        this.setState({
          openMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="joinMural">
        <Container>
          <Card.Group>
            {this.state.openMurals.map(game => (
              <Card fluid key={game._id} style="" style={cardStyle}>
                <Link to={"/game/" + game._id}>
                  {" "}
                  <Card.Header>Mural Hint : {game.title}</Card.Header>
                  <br/>
                  <Card.Content>
                    <ImageSlicer image={game.pImg1} />
                    <Divider />
                    <Card.Description>
                      Created By: 
                    </Card.Description>{game.playerName1}<Image
                    floated="right"
                      size="mini"
                      src={game.playerPhoto1}
                      alt={game.playerName1}
                    />
                  </Card.Content>
                </Link>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}
export default JoinMural;
