import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Card } from 'semantic-ui-react';
import RosterCard from '../components/RosterCard';
import Navbar from '../components/Navbar';
import { fetchGetPlayers, fetchDeletePlayer } from '../Fetches';
import NoPlayers from '../components/NoPlayers';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
    };
  }

  componentDidMount() {
    // let token = document.cookie.split("=")[1]
    const token = localStorage.getItem('token');
    fetchGetPlayers(token, (errors, response, body) => {
      const { players } = JSON.parse(body);
      this.setState({
        players,
      });
    });
  }

  deletePlayer = (event) => {
    const token = localStorage.getItem('token');
    const playerID = event.target.dataset.id;

    fetchDeletePlayer(token, playerID, (errors, response, body) => {
      const res = JSON.parse(body);
      console.log(res);
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
    console.log('rendering roster');
    console.log(localStorage.getItem('token'));

    // if (!document.cookie) {
    //   return <Redirect to="/" />;
    // }
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
            <Navbar logout={this.props.logout} />
          </Grid.Column>

          <Grid.Column
            width={13}
            textAlign="center"
            id="roster-background"
            style={{ paddingTop: '15vh' }}
          >
            <div id="roster">
              <div id="roster-header">Grandpa Roster</div>
              {!this.state.players || this.state.players.length === 0 ? (
                <NoPlayers />
              ) : null}

              <Card.Group
                itemsPerRow={3}
                style={{
                  marginLeft: '5vw',
                  marginRight: '5vw',
                  overflow: 'auto',
                }}
              >
                {!this.state.players || this.state.players.length === 0
                  ? null
                  : this.state.players.map(player => (
                    <RosterCard
                      key={player.id.slice(-2)}
                      player={player}
                      deletePlayer={this.deletePlayer}
                    />
                    ))}
              </Card.Group>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Roster;
