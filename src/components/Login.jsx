import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import request from 'request';
import RegistrationErrors from './RegistrationErrors';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showErrors: false,
      emptyFields: {
        email: true,
        password: true,
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
    this.setState({
      showErrors: false,
    });
    // check that all fields are filled
    if (this.checkFieldsAreFilled()) {
      // then submit form
      this.login();
    }
  };

  login = () => {
    const body = {
      email: this.state.email,
      password: this.state.password,
    };

    const options = {
      url: 'https://players-api.developer.alchemy.codes/api/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      form: body,
    };

    // this is redirecting to '/roster' optimistically, before the http request even begins
    // certainly nonsensical, but the only way I can get the cypress test to pass at moment
    // redirecting AFTER http request resolves, leaves cypress saying it's taken too long
    // curious as to better practice here!
    // setTimeout(() => {
    //   this.props.history.push('/roster');
    // }, 300);

    request(options, (errors, response, respBody) => {
      const res = JSON.parse(respBody);
      const token = res.token;

      // store jwt in localStorage
      localStorage.setItem('token', token);

      // TO DO: put following 2 lines inside conditional for if (res.success)
      if (res.success) {
        this.props.setUser(res.user);
        // this is where I'd have expected to redirect to '/roster'
        this.props.history.push('/roster');
      }
    });
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

  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/roster" />;
    }
    return (
      <div>
        <h3>Login!</h3>

        {this.state.showErrors ? (
          <RegistrationErrors errors={this.state.emptyFields} />
        ) : null}

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              onChange={this.handleChange}
            />
          </label>

          <input type="submit" id="login" />
        </form>
      </div>
    );
  }
}

export default Login;
