import React, { Component } from 'react';
import { Segment, Form, Radio } from 'semantic-ui-react';
import request from 'request';
import Rules from '../components/Rules';
import {
  fetchGetPlayers,
  fetchPostNewPlayer,
  fetchDeletePlayer,
} from '../Fetches';
import RadioButtons from '../components/RadioButtons';

class WagerInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
      wager: '1',
      bingoPieces: '',
      gameState: 'draw',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetchGetPlayers(token, (errors, response, body) => {
      const { players } = JSON.parse(body);
      this.setState({
        players,
      });
    });
  }

  wagerOptions = [
    { text: 'One Grandpa', value: 'one' },
    { text: 'Two Grandpas', value: 'two' },
    { text: 'Three Grandpas', value: 'three' },
  ];

  setWager = (event) => {
    const wager = event.currentTarget.children[0].value;
    if (wager > this.state.players.length) {
      this.setState({ wager, gameState: 'shortage' });
    } else {
      this.setState({ wager, gameState: 'draw' });
    }
  };

  renderButton = () => {
    switch (this.state.gameState) {
      case 'draw':
        return 'Draw';
      case 'reset':
        return 'Reset Game';
      case 'shortage':
        return 'Not enough Grandpas';
      default:
    }
  };

  handleClick = () => {
    if (this.state.wager > this.state.players.length) {
      return this.setState({ gameState: 'shortage' });
    }
    if (this.state.gameState === 'shortage') {
      return;
    }
    if (this.state.gameState === 'reset') {
      this.setState({ bingoPieces: '', gameState: 'draw' });
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
    this.setState({ bingoPieces: pieces, gameState: 'reset' }, () => {
      this.gainOrLoseGrandpas();
    });
  };

  gainOrLoseGrandpas = () => {
    if (
      this.state.bingoPieces === ' I-27 and O-74' ||
      this.state.bingoPieces === ' I-30 and O-64'
    ) {
      switch (this.state.wager) {
        case '1':
          this.gainGrandpas();
          break;
        case '2':
          this.gainGrandpas();
          this.gainGrandpas();
          break;
        case '3':
          this.gainGrandpas();
          this.gainGrandpas();
          this.gainGrandpas();
      }
    } else {
      switch (this.state.wager) {
        case '1':
          this.setState({ players: [...this.state.players.slice(1)] });
          this.loseGrandpas(this.state.players[0].id);
          break;
        case '2':
          this.setState({ players: [...this.state.players.slice(2)] });
          this.loseGrandpas(this.state.players[0].id);
          this.loseGrandpas(this.state.players[1].id);
          break;
        case '3':
          this.setState({ players: [...this.state.players.slice(3)] });
          this.loseGrandpas(this.state.players[0].id);
          this.loseGrandpas(this.state.players[1].id);
          this.loseGrandpas(this.state.players[2].id);
      }
    }
  };

  loseGrandpas = (id) => {
    const token = localStorage.getItem('token');

    fetchDeletePlayer(token, id, (errors, response, body) => {
      const res = JSON.parse(body);
      console.log(res);
    });
  };

  gainGrandpas = () => {
    const randomNum = (Math.floor(Math.random() * 9999999) + 1).toString();
    const body = {
      first_name: randomNum,
      last_name: 'Bonus Grandpa',
      rating: '9999',
      handedness: 'left',
    };
    fetchPostNewPlayer(body, (errors, response, body) => {
      const res = JSON.parse(body);
      console.log(res);
    });
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
        <Segment raised style={{ background: 'rgb(203, 100, 96)' }}>
          <RadioButtons
            setWager={this.setWager}
            currentWager={this.state.wager}
          />

          <button id="draw-button" onClick={this.handleClick}>
            {this.renderButton()}
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
