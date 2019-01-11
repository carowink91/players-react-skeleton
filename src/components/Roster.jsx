import React, { Component } from 'react';
import request from 'request';

class Roster extends Component {
  constructor(props){
    super(props);
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
      if (!error){
        console.log(JSON.parse(body))
        console.log(JSON.parse(body).players)
      }
    })
  }


  render(){
    return(
      <div>Roster page!</div>
    )
  }
}

export default Roster;
