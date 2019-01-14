import React, { Component } from 'react';

class RegistrationErrors extends Component {
  constructor(props) {
    super(props);
  }

getEmptyFields = () => {
  let empties = [];

  for (const key in this.props.emptyFields){
    if (this.props.emptyFields[key] === true){
      empties.push(key)
    }
  }
  return empties
}

  render() {
    return (
      <div id="errors">
        <h3>Errors:</h3>
        <div>
        {this.getEmptyFields().map((field) => <div key={field.length}>{field} cannot be empty.</div>)}
        {this.props.loginError}
        {this.props.passwordError}
        </div>
      </div>
    );
  }
}

export default RegistrationErrors;
