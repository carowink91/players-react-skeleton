import React, { Component } from 'react';
import request from 'request';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
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

  handleClick = () => {
    this.props.history.push('/player/new');
  };

  deletePlayer = (event) => {
    const token = localStorage.getItem('token');
    const playerID = event.target.dataset.id;

    const options = {
      url: `https://players-api.developer.alchemy.codes/api/players/${playerID}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    };

    request(options, (error, response, body) => {
      const res = JSON.parse(body);
      if (res.success) {
        this.deletePlayerFromState(playerID);
      }
    });
  };

  deletePlayerFromState = (playerID) => {
    const playerIndex = this.state.players.findIndex(player => player.id === playerID);
    this.setState({
      players: [
        ...this.state.players.slice(0, playerIndex),
        ...this.state.players.slice(playerIndex + 1),
      ],
    });
  };

  render() {
    // initally had logic here to prevent user from accessing Roster if they were NOT signed in
    // but the e2e tests seem not to allow it
    return (
      <div>
        <h3>Your Roster Harry Hermione Ron</h3>

        {!this.state.players
          ? null
          : this.state.players.map(player => (
            <div>
              <li key={player.id}>
                {player.last_name}, {player.first_name}: Rating -{' '}
                {player.rating} | Handedness - {player.handedness}
              </li>
              <button
                className="delete"
                onClick={this.deletePlayer}
                data-id={player.id}
                key={player.id + 10}
              >
                  delete player
              </button>
            </div>
            ))}

        <button onClick={this.handleClick}>add new player</button>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default Roster;

// if (!localStorage.getItem('token')) {
//   return <Redirect to="/" />;
// }
