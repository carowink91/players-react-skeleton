import React, { Component } from 'react';
import request from 'request';
import { Redirect } from 'react-router-dom';

class NewPlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      rating: '',
      handedness: 'left',
      showErrors: false,
      emptyFields: {
        firstName: true,
        lastName: true,
        rating: true,
        handedness: false,
      },
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.value !== '') {
      this.setState({
        emptyFields: { ...this.state.emptyFields, [event.target.name]: false },
      });
    } else {
      this.setState({
        emptyFields: { ...this.state.emptyFields, [event.target.name]: true },
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ showErrors: false });
    // check that fields are filled
    if (this.checkFieldsAreFilled()) {
      // then submit form
      this.postNewPlayer();
    }
  };

  checkFieldsAreFilled = () => {
    for (const key in this.state.emptyFields) {
      if (this.state.emptyFields[key] === true) {
        this.setState({
          showErrors: true,
        });
        return false;
      }
    }
    return true;
  };

  postNewPlayer = () => {
    const token = localStorage.getItem('token');

    const body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      rating: this.state.rating,
      handedness: this.state.handedness,
    };

    const options = {
      url: 'https://players-api.developer.alchemy.codes/api/players',
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      form: body,
    };

    request(options, (errors, response, respBody) => {
      const res = JSON.parse(respBody);

      if (res.success) {
        this.props.history.push('/roster');
      }
    });
  };

  cancel = () => {
    this.props.history.push('/roster');
  };

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h3>New Player Form</h3>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="rating">
            Rating:
            <input
              type="text"
              name="rating"
              id="rating"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="handedness">
            Handedness:
            <select
              onChange={this.handleChange}
              name="handedness"
              id="handedness"
            >
              <option name="left" value="left">
                Left
              </option>
              <option name="right" value="right">
                Right
              </option>
            </select>
          </label>
          <input type="submit" id="create" />
        </form>

        <button onClick={this.cancel}>Cancel</button>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default NewPlayerForm;
