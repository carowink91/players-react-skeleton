import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="navbar">
        <div className="navlink top">
          <a href="/roster">roster</a>
        </div>

        <div className="navlink middle">
          <a href="/player/new">add a new pop</a>
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
