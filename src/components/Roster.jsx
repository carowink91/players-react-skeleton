import React, { Component } from 'react';
import request from 'request';
import { Redirect } from 'react-router-dom';

class Roster extends Component {
  constructor(props){
    super(props);
    this.state={
      players: null
    }
  }

  componentDidMount(){
    this.fetchPlayers()
  }

  fetchPlayers = () => {
    let token = localStorage.getItem('token');

    let options = {
      url: `https://players-api.developer.alchemy.codes/api/players`,
      method: 'GET',
      headers: {'Authorization' : `Bearer ${token}`}
    }

    request(options, function(error, response, body){

        console.log(JSON.parse(body))
        let players = JSON.parse(body).players
        console.log(players[0])
        this.setState({
          players: players
        })

    }.bind(this))
  }

  handleClick = () => {
    this.props.history.push('/player/new')
  }


  render(){
    if (!localStorage.getItem('token')){
      return <Redirect to='/'/>
    } else {
    return(
      <div>
        <h3>Your Roster</h3>

        {!this.state.players ? null : this.state.players.map((player, index) =>
          <li key={index}>{player.last_name}, {player.first_name}: Rating - {player.rating} | Handedness - {player.handedness}</li>
        )}

        <button onClick={this.handleClick}>add new player</button>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}
}

export default Roster;
