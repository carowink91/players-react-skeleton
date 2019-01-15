import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// making Navbar from scratch because
// vertical navbars from Semantic can be finicky
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="navbar">
        <div className="navlink top">
          <a href="/roster">Roster</a>
        </div>

        <div className="navlink middle">
          <a onClick={() => this.props.setNav('roster')} href="/player/new">
            Add a Grandpa
          </a>
        </div>

        <div className="navlink middle">
          <a href="/wager">Wager a Grandpa</a>
        </div>

        <div className="navlink bottom" onClick={this.props.logout}>
          <a href="/">logout</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
