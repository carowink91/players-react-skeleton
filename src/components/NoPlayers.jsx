import React from 'react';

const NoPlayers = () => (
  <div className="no-players">
    <div
      id="no-players-header"
      style={{ fontFamily: 'Merienda', color: 'rgb(243, 223, 185)' }}
    >
      No Grandpas Yet!
    </div>
    <div id="no-players-sub" style={{ color: 'rgb(243, 223, 185)' }}>
      Visit
      <a href="/player/new"> Add A Grandpa </a>
      to start building your roster!
    </div>
  </div>
);

export default NoPlayers;
