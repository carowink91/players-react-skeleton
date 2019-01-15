import React from 'react';
import { Radio } from 'semantic-ui-react';

const RadioButtons = props => (
  <div>
    <Radio
      label="One Grandpa"
      value="1"
      checked={props.currentWager === '1'}
      onChange={props.setWager}
    />
    <br />
    <br />
    <Radio
      label="Two Grandpas"
      value="2"
      checked={props.currentWager === '2'}
      onClick={props.setWager}
    />
    <br />
    <br />
    <Radio
      label="Three Grandpas"
      value="3"
      checked={props.currentWager === '3'}
      onChange={props.setWager}
    />
  </div>
);

export default RadioButtons;
