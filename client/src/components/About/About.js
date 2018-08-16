import React from "react";
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
  Image,
  Item
} from "semantic-ui-react";
const styles = {
  color: "#555"
};
class Contact extends React.Component {
  render() {
    return (
      <div>
        <Container text>
        <br/>
          <Item.Group>
            <Item>
              <Item.Image>
                <Icon name="paint brush" size="huge" />
              </Item.Image>

              <Item.Content>
                <Item.Header style={styles} as="a">
                  <h1>How to Play</h1>
                </Item.Header>

                <Item.Description style={styles}>
                  <h2>
                    {" "}
                    Mural Mates is a game based on the surrealist concept of "Exquisite
                    Corpse", a practice in collaborative creativity.
                  </h2>
                  <h3>
                    {" "}
                    In order to play, you can create a new game and draw out the
                    "head" of the corpse. Alternatively, you can join an
                    incomplete mural and complete the body based on the sliver
                    of a hint given.
                  </h3>

                  <h3>
                    Once the second player has finished drawing the body you can
                    see the combined "Mural" made up of the two separate images.
                  </h3>

                  <h3>
                    {" "}
                    Don't worry too much about trying to draw the perfect image.
                    the fun in the game is seeing what you and a friend or a
                    stranger can create together.
                  </h3>
                </Item.Description>
              </Item.Content>
            </Item>
            <Item>
              <Item.Image>
                <Icon name="paint brush" size="huge" />
              </Item.Image>

              <Item.Content>
                <Item.Header style={styles} as="a">
                  <h1>More Resources:</h1>
                </Item.Header>

                <Item.Description style={styles}>
                  <h3>
                    {" "}
                    You can find more information on Exquisite Corpses{" "}
                    <a href="https://en.wikipedia.org/wiki/Exquisite_corpse">here</a>.
                  </h3>
                  <h3>
                    {" "}
                    You can take a look at some amazing corpses{" "}
                    <a href="http://www.jabcstudio.com/collaborations/exquisite-corpse/">here</a>.
                  </h3>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          <br/>
        </Container>
      </div>
    );
  }
}

export default Contact;
