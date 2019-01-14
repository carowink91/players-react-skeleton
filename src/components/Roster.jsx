import React, { Component, Fragment } from 'react';
import request from 'request';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Segment, Card, Button } from 'semantic-ui-react';
import Navbar from './Navbar';
import { fetchGetPlayers, fetchDeletePlayer } from '../Fetches';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
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
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Grid>
          <Grid.Column
            width={2}
            id="nav-column"
            textAlign="center"
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            <Navbar logout={this.props.logout} />
          </Grid.Column>

          <Grid.Column
            width={14}
            textAlign="center"
            id="roster-background"
            style={{ paddingTop: '15vh' }}
          >
            <div id="roster">
              <h1 style={{ fontSize: '35px' }}>Pop Roster</h1>
              <Card.Group
                itemsPerRow={3}
                style={{ marginLeft: '5vw', marginRight: '5vw' }}
              >
                {!this.state.players
                  ? null
                  : this.state.players.map(player => (
                    <Fragment>
                      <Card
                        key={player.id}
                        style={{
                            opacity: 0.9,
                            width: '15.5vw',
                            marginLeft: '5vw',
                            marginRight: '5vw',
                          }}
                      >
                        <Card.Content style={{ background: 'grey' }}>
                          <Card.Header
                            style={{
                                color: 'lightblue',
                                fontSize: '1.7em',
                                fontFamily: 'Satisfy',
                              }}
                          >
                            {player.last_name}, {player.first_name}
                          </Card.Header>
                          <Card.Meta
                            style={{
                                color: 'white',
                                fontSize: '.9em',
                                fontFamily: 'Merienda',
                              }}
                          >
                              rating: {player.rating}
                          </Card.Meta>
                          <Card.Header
                            style={{
                                color: 'black',
                                fontSize: '1.1em',
                                fontFamily: 'Merienda',
                                padding: '.5em',
                              }}
                          >
                              handedness: {player.handedness}
                          </Card.Header>
                        </Card.Content>
                        <Button
                          basic
                          color="red"
                          style={{ fontFamily: 'Merienda' }}
                          className="delete"
                          onClick={this.deletePlayer}
                          data-id={player.id}
                          key={player.id + 10}
                        >
                            delete player
                        </Button>
                      </Card>
                    </Fragment>
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
