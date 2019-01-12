import React, { Component } from 'react';

class RegistrationErrors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyFields: this.renderErrors(),
    };
  }

  renderErrors = () => {
    const emptyFields = [];
    const values = Object.values(this.props.errors);
    const keys = Object.keys(this.props.errors);

    // note to self: below, tests prohibit "i++" unary operator
    for (let i = 0; i < values.length; i + 1) {
      if (values[i] === true) {
        emptyFields.push(keys[i]);
      }
    }
    return emptyFields;
  };

  render() {
    return (
      <div>
        <h3>Errors:</h3>
        <ul>
          {this.state.emptyFields.map(field => (
            <li key={field.length}>{field} cannot be empty.</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RegistrationErrors;
