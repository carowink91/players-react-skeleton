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
    // this.props.history.push('/roster');
    // }, 300);

    request(options, (errors, response, respBody) => {
      const res = JSON.parse(respBody);
      const { token } = res;
      console.log(res);
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
    const values = Object.values(this.state.emptyFields);

    if (values.includes(true)) {
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
        <Grid textAlign="center" verticalAlign="middle" id="login">
          <Grid.Column style={{ maxWidth: 450 }}>
            {this.state.showErrors ? (
              <RegistrationErrors errors={this.state.emptyFields} />
            ) : null}

            <Form size="large">
              <Segment raised>
                <Form.Field>
                  <label htmlFor="email">
                    Email:
                    <Form.Input
                      fluid
                      type="text"
                      name="email"
                      placeholder="Email"
                      id="email"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <Form.Field>
                  <label htmlFor="password">
                    Password:
                    <Form.Input
                      fluid
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <Button id="login" color="teal" onClick={this.handleSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
