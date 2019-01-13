import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="navbar">
        <div className="navlink top">stats</div>
        <div className="navlink top">
          <a href="/roster">pop roster</a>
        </div>
        <div>
          <a href="/player/new">add a new pop</a>
        </div>
        <div className="navlink middle">wager a pop</div>
        <div className="navlink bottom" onClick={this.props.logout}>
          logout
        </div>
      </div>
    );
  }
}

export default Navbar;
