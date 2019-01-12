import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import request from 'request';
import RegistrationErrors from './RegistrationErrors';
import {
  Form,
  Button,
  Segment,
  Header,
  Grid,
  Image,
  Message,
} from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      emptyFields: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true,
      },
      showErrors: false,
      showPasswordAlert: false,
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

  submitRegistration = (event) => {
    event.preventDefault();
    this.setState({
      showErrors: false,
      showPasswordAlert: false,
    });

    // tests pass if i redirect to '/roster' optimistically
    // this.props.history.push('/roster');

    // check all fields are filled and passwords match
    if (this.checkFieldsAreFilled() && this.checkPasswordMatch()) {
      const body = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirmPassword,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      // Configure the request
      const options = {
        url: 'https://players-api.developer.alchemy.codes/api/user',
        method: 'POST',
        headers,
        form: body,
      };
      // Start the request
      request(options, (error, response, respBody) => {
        if (!error) {
          // Print out the response body
          const { token } = JSON.parse(respBody);
          console.log(respBody);
          if (token) {
            localStorage.setItem('token', token);
            const { user } = JSON.parse(respBody);

            this.props.setUser({ user });
            this.props.history.push('/roster');
          }
        }
      });
    }
  };

  passUser = (user) => {
    this.props.setUser(user);
  };

  checkFieldsAreFilled = () => {
    const values = Object.values(this.state.emptyFields);
    if (values.includes(true)) {
      this.setState({
        showErrors: true,
      });
      return false;
    }
    return true;
  };

  checkPasswordMatch = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ showPasswordAlert: true });
    }
    return true;
  };

  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/roster" />;
    }
    return (
      <div className="register-background">
        <Grid textAlign="center" verticalAlign="middle" id="register-form">
          <Grid.Column style={{ maxWidth: 450 }}>
            <header id="register-header">Make an Account</header>
            {this.state.showErrors ? (
              <RegistrationErrors errors={this.state.emptyFields} />
            ) : null}

            {this.state.showPasswordAlert ? (
              <div>Passwords must match.</div>
            ) : null}

            <Form size="large">
              <Segment raised id="register-form-body">
                <Form.Field>
                  <label htmlFor="firstName" id="firstName-label">
                    First Name:
                    <Form.Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <Form.Field>
                  <label htmlFor="lastName" id="lastName-label">
                    Last Name:
                    <Form.Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <Form.Field>
                  <label htmlFor="email" id="email-label">
                    Email:
                    <Form.Input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <Form.Field>
                  <label htmlFor="password" id="password-label">
                    Password:
                    <Form.Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <Form.Field>
                  <label htmlFor="confirmPassword" id="confirmPassword-label">
                    Confirm Password:
                    <Form.Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <button id="register-button" onClick={this.submitRegistration}>
                  Register
                </button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Register;
