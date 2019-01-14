import React, { Component } from 'react';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';
import WagerInstructions from './WagerInstructions';
import {
  Grid,
  Dropdown,
  Segment,
  Button,
  Radio,
  Form,
  Header,
} from 'semantic-ui-react';
import request from 'request';

class Wager extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Grid>
          <Grid.Column
            verticalAlign="middle"
            width={2}
            id="nav-column"
            textAlign="center"
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            <Navbar logout={this.props.logout} />
          </Grid.Column>

          <Grid.Column
            width={11}
            id="wager-background"
            textAlign="center"
            style={{ height: '110vh' }}
          />
          <Grid.Column
            width={3}
            style={{
              background: 'rgb(56, 65, 93)',
              height: '110vh',
              paddingLeft: '1em',
              paddingRight: '1em',
            }}
          >
            <WagerInstructions user={this.props.user} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Wager;

// https://pixfeeds.com/images/11/358594/640-26187499-bingo-cards.jpg
