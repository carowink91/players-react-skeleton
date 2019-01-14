import React, { Component } from 'react';
import { Segment, Form, Radio } from 'semantic-ui-react';
import request from 'request';
import Rules from './Rules';
import {fetchGetPlayers } from '../Fetches'
import RadioButtons from './RadioButtons';

class WagerInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
      wager: '1',
      bingoPieces: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetchGetPlayers(token, (errors, response, body) => {
          const { players } = JSON.parse(body);
      this.setState({
        players,
      });
    })
  }

  wagerOptions = [
    { text: 'One Grandpa', value: 'one' },
    { text: 'Two Grandpas', value: 'two' },
    { text: 'Three Grandpas', value: 'three' },
  ];

  setWager = event =>
    this.setState({ wager: event.currentTarget.children[0].value });

  resetGame = () => this.setState({ bingoPieces: '' });

  drawBingo = () => {
    if (this.state.bingoPieces) {
      return;
    }
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


  getInstructions = () => {
    const pieces = this.state.bingoPieces;
    switch (pieces) {
      case '':
        return "Click 'Draw' to draw 2 bingo pieces!";
      case ' I-27 and O-74':
        return 'BINGO! Check the roster to see your winnings!';
      case ' I-30 and O-64':
        return 'BINGO! Check the roster to see your winnings!';
      default:
        return 'Sorry, no Bingo!';
    }
  };

  render() {
    return (
      <div id="wager-column">
        <Rules />
        <Segment style={{ background: 'rgb(203, 100, 96)' }}>
          <RadioButtons
            setWager={this.setWager}
            currentWager={this.state.wager}
          />

          <button id="draw-button" onClick={this.drawBingo}>
            Draw
          </button>

          <button id="reset-button" onClick={this.resetGame}>
            Click to Reset Game
          </button>

          <div id="bingo-piece">
            YOU DREW: <br />
            <div id="bingo-piece-detail">{this.state.bingoPieces}</div>
          </div>

          <div id="instructions">
            INSTRUCTIONS: <br />
            <div id="instructions-detail">{this.getInstructions()}</div>
          </div>
        </Segment>
      </div>
    );
  }
}

export default WagerInstructions;
