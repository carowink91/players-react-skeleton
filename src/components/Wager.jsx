import React, { Component } from 'react';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';
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
  constructor(props) {
    super(props);
    this.state = {
      players: null,
      wager: '1',
      bingoPieces: '',
    };
  }

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers = () => {
    const token = localStorage.getItem('token');

    const options = {
      url: 'https://players-api.developer.alchemy.codes/api/players',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    };

    request(options, (error, response, body) => {
      const { players } = JSON.parse(body);
      this.setState({
        players,
      });
    });
  };

  wagerOptions = [
    { text: 'One Grandpa', value: 'one' },
    { text: 'Two Grandpas', value: 'two' },
    { text: 'Three Grandpas', value: 'three' },
  ];

  handleChange = (event) => {
    this.setState({
      wager: event.currentTarget.children[0].value,
    });
  };

  drawBingo = () => {
    const bingoPieces = [
      ' I-27 and O-74',
      ' I-30 and O-64',
      ' I-30 and I-27',
      ' O-74 and N-41',
    ];
    const randomIndex = Math.floor(Math.random() * 4);
    const pieces = bingoPieces[randomIndex];
    this.setState({ bingoPieces: pieces });
  };

  resetGame = () => {
    this.setState({ bingoPieces: '' });
  };

  getInstructions = () => {
    const pieces = this.state.bingoPieces;

    if (pieces === '') {
      return "Click 'Draw' to draw 2 bingo pieces!";
    } else if (pieces === ' I-27 and O-74' || pieces == ' I-30 and O-64') {
      return 'BINGO!';
    }
    return 'Sorry, no Bingo!';
  };

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
            style={{ height: '110vh' }}
          >
            <div id="rules">
              Rules of The Game: Your bingo card is almost full. Victory is as
              close as two spaces away. But to play, you must place a bet!
              Select the "Wager" drop down to choose a number of granpas from
              your collection that you're willing to bet on the game. Click
              "Draw" to get your two bingo pieces. If no bingo, then you'll lose
              the number of grandpas you wagered. But if you get a bingo, that
              many Bonus Grandpas will be added to your roster! Good luck!
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{
              background: 'rgb(56, 65, 93)',
              height: '110vh',
              paddingLeft: '1em',
              paddingRight: '1em',
            }}
          >
            <div id="wager-column">
              <Segment style={{ background: 'rgb(203, 100, 96)' }}>
                <Form>
                  <Form.Field>
                    <Radio
                      label="One Grandpa"
                      name="One Grandpa"
                      value="1"
                      checked={this.state.wager === '1'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Radio
                      label="Two Grandpas"
                      name="Two Grandpas"
                      value="2"
                      checked={this.state.wager === '2'}
                      onClick={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Radio
                      label="Three Grandpas"
                      name="Three Grandpas"
                      value="3"
                      checked={this.state.wager === '3'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
                <button id="draw-button" onClick={this.drawBingo}>
                  Draw
                </button>
                <button id="reset-button" onClick={this.resetGame}>
                  Click to Reset Game
                </button>
                <div id="bingo-piece" style={{ textAlign: 'center' }}>
                  YOU DREW: <br />
                  {this.state.bingoPieces}
                </div>
                <br />
                <div style={{ textAlign: 'center' }}>
                  INSTRUCTIONS: <br />
                  {this.getInstructions()}
                </div>
              </Segment>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Wager;

// https://pixfeeds.com/images/11/358594/640-26187499-bingo-cards.jpg
