import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

const LoginForm = props => (
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
            onChange={props.handleChange}
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
            onChange={props.handleChange}
          />
        </label>
      </Form.Field>

      <button id="login" onClick={props.handleSubmit}>
        Login
      </button>
    </Segment>
  </Form>
);

export default LoginForm;
