import React, { Component } from 'react';

class RegistrationErrors extends Component {
  constructor(props) {
    super(props);
  }

  getEmptyFields = () => {
    const empties = [];
    const keys = Object.keys(this.props.emptyFields);
    const values = Object.values(this.props.emptyFields);
    values.forEach((value, index) => {
      if (value === true) {
        empties.push(keys[index]);
      }
    });
    return empties;
  };

  render() {
    return (
      <div id="errors">
        <h3>Errors:</h3>
        <div>
          {this.getEmptyFields().map(field => (
            <div key={field.length}>{field} cannot be empty.</div>
          ))}
          {this.props.requestError}
          {this.props.passwordError}
        </div>
      </div>
    );
  }
}

export default RegistrationErrors;
