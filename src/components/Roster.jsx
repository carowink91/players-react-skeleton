import React, { Component, Fragment } from 'react';
import request from 'request';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';

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

    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Grid>
          <Grid.Column
            width={3}
            id="nav-column"
            textAlign="center"
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            <div id="navbar">
              <div className="navlink top">add new Pop</div>
              <div className="navlink middle">wager Pop</div>
              <div className="navlink bottom">logout</div>
            </div>
          </Grid.Column>

          <Grid.Column width={13} textAlign="center" id="roster-background">
            <Header size="huge">My Roster</Header>

            {!this.state.players
              ? null
              : this.state.players.map(player => (
                <Fragment>
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
                </Fragment>
                ))}

            <button onClick={this.handleClick}>add new player</button>
            <button onClick={this.props.logout}>Logout</button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Roster;

// if (!localStorage.getItem('token')) {
//   return <Redirect to="/" />;
// }
