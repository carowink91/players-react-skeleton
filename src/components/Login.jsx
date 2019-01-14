import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fetchLogin from '../Fetches';
import LoginForm from './LoginForm';
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
      loginError: ''
    };
  }

  handleChange = (event) => {
    if (event.target.value !== '') {
      this.setState({
        [event.target.name]: event.target.value,
        emptyFields: { ...this.state.emptyFields, [event.target.name]: false },
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        emptyFields: { ...this.state.emptyFields, [event.target.name]: true },
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ showErrors: false });
    // if fields are filled, submit request
    if (this.checkFieldsAreFilled()) {
      this.login({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };

  login = (payload) => {
    fetchLogin(payload, (errors, response, body) => {
      const res = JSON.parse(body);
      console.log(res);
      // if successful, store jwt in localStorage
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.props.setUser(res.user);
      } else {
        console.log(res.error.message)
        this.setState({showErrors: true, loginError: res.error.message})
      }
    });
  };

  checkFieldsAreFilled = () => {
    const emptyFields = Object.values(this.state.emptyFields);

    if (emptyFields.includes(true)) {
      this.setState({
        showErrors: true,
      });
      return false;
    }
    return true;
  };

  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/roster" />;
    }
    return (
      <div className="login-background">
        <Grid textAlign="center" verticalAlign="middle" id="login-form">
          <Grid.Column style={{ maxWidth: 450 }}>
            {this.state.showErrors ? (
              <RegistrationErrors emptyFields={this.state.emptyFields} loginError={this.state.loginError}/>
            ) : null}

            <LoginForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
