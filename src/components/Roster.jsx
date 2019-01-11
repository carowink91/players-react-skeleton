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

  deletePlayer = (event) => {
    let token = localStorage.getItem('token');
    let playerID = event.target.dataset.id;

    let options = {
      url: `https://players-api.developer.alchemy.codes/api/players/${playerID}`,
      method: 'DELETE',
      headers: {'Authorization' : `Bearer ${token}`}
    }

    request(options, function(error, response, body){
      let res = JSON.parse(body)
      console.log(res)
      if (res.success){
        this.deletePlayerFromState(playerID)
      }
    }.bind(this))
  }

  deletePlayerFromState = (playerID) => {
    let playerIndex = this.state.players.findIndex(player => player.id === playerID)
      this.setState({
        players: [...this.state.players.slice(0, playerIndex), ...this.state.players.slice(playerIndex+1)]
      })


  }

  render(){
    if (!localStorage.getItem('token')){
      return <Redirect to='/'/>
    } else {
    return(
      <div>
        <h3>Your Roster</h3>

        {!this.state.players ? null : this.state.players.map((player, index) =>
          <div>
            <li key={index}>{player.last_name}, {player.first_name}: Rating - {player.rating} | Handedness - {player.handedness}</li>
            <button onClick={this.deletePlayer} data-id={player.id} key={index+10}>delete player</button>
          </div>
        )}

        <button onClick={this.handleClick}>add new player</button>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}
}

export default Roster;
