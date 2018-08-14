import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";

import {Form,Image, Segment, Button, Divider, Container, Header, Icon, Grid, Message } from "semantic-ui-react";

const LandingPage = () => (
  <div className='landing-page'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    {/* https://coolors.co/3281a1-75b9c2-8bd7cf-a3e9da-dbddac */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.landing-page {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' color='teal' textAlign='center'>
          <Image src='../../favicon.ico' /> Welcome to Mural Mates
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Button color='primary' fluid size='large'>
              Create New Mural
            </Button>
            <Divider horizontal>Or</Divider>
            <Button color='secondary' fluid size='large'>
              Join Open Murals
            </Button>
          </Segment>
        </Form> 
      </Grid.Column>
    </Grid>
  </div>
)

export default LandingPage;