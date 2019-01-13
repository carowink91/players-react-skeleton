import React, { Component } from 'react';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import request from 'request';

class Wager extends Component {
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

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column
            width={2}
            id="nav-column"
            textAlign="center"
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            <Navbar logout={this.props.logout} />
          </Grid.Column>

          <Grid.Column width={11}>wager page</Grid.Column>
          <Grid.Column
            width={3}
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            wager column
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Wager;
