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
      passwordError: '',
      registrationError: '',
    };
  }

  handleChange = (event) => {
    if (event.target.value !== '') {
      this.setState(
        {
          [event.target.name]: event.target.value,
          emptyFields: { ...this.state.emptyFields, [event.target.name]: false },
        },
        () => this.checkPasswordMatch(),
      );
    } else {
      this.setState(
        {
          [event.target.name]: event.target.value,
          emptyFields: { ...this.state.emptyFields, [event.target.name]: true },
        },
        () => this.checkPasswordMatch(),
      );
    }
  };

  submitRegistration = (event) => {
    event.preventDefault();
    this.setState({
      showErrors: false,
    });

    // check all fields are filled and passwords match
    if (this.checkPasswordMatch() && this.checkFieldsAreFilled()) {
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
        const res = JSON.parse(respBody);
        console.log(res);
        // if successful, store jwt in localStorage
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.props.setUser(res.user);
        } else {
          console.log(res.error.message);
          this.setState({
            showErrors: true,
            loginError: 'Email already in use.',
          });
        }
      });
    }
  };

  checkFieldsAreFilled = () => {
    const values = Object.values(this.state.emptyFields);
    if (values.includes(true) || this.state.passwordError !== '') {
      this.setState({
        showErrors: true,
      });
      return false;
    }
    return true;
  };

  checkPasswordMatch = () => {
    if (this.state.password !== this.state.confirmPassword) {
      console.log(this.state.password);
      console.log(this.state.confirmPassword);
      console.log('no match');
      this.setState({
        passwordError: 'Passwords must match.',
        showErrors: true,
      });
      return false;
    }
    console.log(this.state.password);
    console.log(this.state.confirmPassword);
    console.log('yes match');
    this.setState({ passwordError: '' });
    return true;
  };

  passUser = (user) => {
    this.props.setUser(user);
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
              <RegistrationErrors
                emptyFields={this.state.emptyFields}
                passwordError={this.state.passwordError}
                loginError={this.state.loginError}
              />
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
