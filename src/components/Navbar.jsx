import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Really wanted a vertical Navbar for this project,
// which can be finicky with some preset navbars
// so I chose to make one from scratch
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="navbar">
        <div className="navlink top">
          <a  href="/roster">roster</a>
        </div>

        <div className="navlink middle">
          <a onClick={() => this.props.setNav('roster')} href="/player/new">add a new pop</a>
        </div>

        <div className="navlink middle">
          <a href="/wager">wager a pop</a>
        </div>

        <div className="navlink bottom" onClick={this.props.logout}>
          <a href="/">logout</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
