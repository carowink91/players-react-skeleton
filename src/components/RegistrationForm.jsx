import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

const RegistrationForm = props => (
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
            onChange={props.handleChange}
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
            onChange={props.handleChange}
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
            onChange={props.handleChange}
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
            onChange={props.handleChange}
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
            onChange={props.handleChange}
          />
        </label>
      </Form.Field>

      <button id="register" onClick={props.submitRegistration}>
        Register
      </button>
    </Segment>
  </Form>
);

export default RegistrationForm;
