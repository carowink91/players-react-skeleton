import React, { Component, Fragment } from 'react';
import request from 'request';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Segment, Card, Button } from 'semantic-ui-react';

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
            width={2}
            id="nav-column"
            textAlign="center"
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            <div id="navbar">
              <div className="navlink top">stats</div>
              <div className="navlink top">Pop roster</div>
              <div className="navlink middle" onClick={this.handleClick}>
                add a new Pop
              </div>
              <div className="navlink middle">wager a Pop</div>
              <div className="navlink bottom" onClick={this.props.logout}>
                logout
              </div>
            </div>
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
                      <Card key={player.id} style={{ opacity: 0.9 }}>
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
                            extra
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

// if (!localStorage.getItem('token')) {
//   return <Redirect to="/" />;
// }
