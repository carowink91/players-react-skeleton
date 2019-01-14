import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';

class LoginForm extends Component {
  render() {
    return (
      <Form size="large">
        <Segment raised id="login-form-body">
          <Form.Field>
            <label htmlFor="email" id="email-label">
              Email:
              <Form.Input
                fluid
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                onChange={this.props.handleChange}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="password" id="password-label">
              Password:
              <Form.Input
                fluid
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={this.props.handleChange}
              />
            </label>
          </Form.Field>

          <button id="login-button" onClick={this.props.handleSubmit}>
            Login
          </button>
        </Segment>
      </Form>
    );
  }
}

export default LoginForm;
