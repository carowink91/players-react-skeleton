import React, { Component } from 'react';
import { Radio } from 'semantic-ui-react';

class RadioButtons extends Component {
  render() {
    return (
      <div>
        <Radio
          label="One Grandpa"
          value="1"
          checked={this.props.currentWager === '1'}
          onChange={this.props.setWager}
        />
        <br />
        <br />
        <Radio
          label="Two Grandpas"
          value="2"
          checked={this.props.currentWager === '2'}
          onClick={this.props.setWager}
        />
        <br />
        <br />
        <Radio
          label="Three Grandpas"
          value="3"
          checked={this.props.currentWager === '3'}
          onChange={this.props.setWager}
        />
      </div>
    );
  }
}

export default RadioButtons;
