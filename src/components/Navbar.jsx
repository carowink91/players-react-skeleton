import React from 'react';

// making Navbar from scratch because
// vertical navbars from Semantic can be finicky
const Navbar = props => (
  <div id="navbar">
    <div className="navlink top">
      <a href="/roster">Roster</a>
    </div>

    <div className="navlink middle">
      <a onClick={() => props.setNav('roster')} href="/player/new">
        Add a Grandpa
      </a>
    </div>

    <div className="navlink middle">
      <a href="/wager">Wager a Grandpa</a>
    </div>

    <div className="navlink bottom">
      <a onClick={() => props.logout()} href="/">logout</a>
    </div>
  </div>
);

export default Navbar;
