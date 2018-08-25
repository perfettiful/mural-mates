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
  GridColumn,
  Card
} from "semantic-ui-react";
const styles = {

};
class Contact extends React.Component {
  render() {
    return (
      <div>
        <br />
      <Container>
       <h2>This project was created by: </h2>
          <Grid container style={styles}centered >
              
             
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {" "}
                      <Image avatar src="../Images/Ben.jpg" />
                      Ben Rademacher
                    </Card.Header>
                    <Card.Description />
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="linkedin" href="https://www.linkedin.com/in/benjamin-rademacher-408414156/">
                      <Icon name="linkedin" /> LinkedIn
                    </Button>
                    <Button color="grey" href="https://github.com/Brademacher">
                      <Icon name="github" /> GitHub
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {" "}
                      <Image avatar src={"../Images/Kalsang.jpeg"} />
                      Kalsang Bhutia
                    </Card.Header>
                    
                    <Card.Description />
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="linkedin" href="https://www.linkedin.com/in/kalbhutia/">
                      <Icon name="linkedin" /> LinkedIn
                    </Button>
                    <Button color="grey" href="https://github.com/hurlyburly">
                      <Icon name="github" /> GitHub
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
             
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {" "}
                      <Image avatar src="../Images/Nate.jpeg" />
                   Nate Perfetti
                    </Card.Header>
                    
                    <Card.Description />
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="linkedin" href="https://www.linkedin.com/in/nathanperfetti/">
                      <Icon name="linkedin" /> LinkedIn
                    </Button>
                    <Button color="grey" href="https://github.com/perfettiful">
                      <Icon name="github" /> GitHub
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {" "}
                      <Image avatar src="../Images/Zac.jpeg" />
                      Zac Keilholz
                    </Card.Header>
                 
                    <Card.Description />
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="linkedin" href="https://www.linkedin.com/in/zac-keilholz/">
                      <Icon name="linkedin" /> LinkedIn
                    </Button>
                    <Button color="grey" href="https://github.com/ZacKeilholz">
                      <Icon name="github" /> GitHub
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
           
          </Grid>
     </Container>
      </div>
    );
  }
}

export default Contact;
