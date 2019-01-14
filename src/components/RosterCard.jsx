import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

class RosterCard extends Component {
  render() {
    return (
      <Card
        style={{
          opacity: 0.9,
          width: '15.5vw',
          marginLeft: '5vw',
          marginRight: '5vw',
        }}
      >
        <Card.Content style={{ background: 'grey' }}>
          <Card.Header
            style={{
              color: 'lightblue',
              fontSize: '3.2vmin',
              fontFamily: 'Satisfy',
            }}
          >
            {this.props.player.last_name}, {this.props.player.first_name}
          </Card.Header>
          <Card.Meta
            style={{
              color: 'white',
              fontSize: '1.9vmin',
              fontFamily: 'Merienda',
            }}
          >
            rating: {this.props.player.rating}
          </Card.Meta>
          <Card.Header
            style={{
              color: 'black',
              fontSize: '2.2vmin',
              fontFamily: 'Merienda',
              padding: '.5em',
            }}
          >
            handedness: {this.props.player.handedness}
          </Card.Header>
        </Card.Content>
        <Button
          basic
          color="red"
          style={{ fontFamily: 'Merienda' }}
          className="delete"
          onClick={this.props.deletePlayer}
          data-id={this.props.player.id}
          key={this.props.player.id + 10}
        >
          delete player
        </Button>
      </Card>
    );
  }
}

export default RosterCard;
