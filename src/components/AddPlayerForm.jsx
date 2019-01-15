import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

const AddPlayerForm = props => (
  <Form style={{ maxWidth: 450 }}>
    <Segment
      raised
      id="new-player-form-body"
      style={{ backgroundColor: 'rgb(200, 169, 146)' }}
    >
      <h1
        style={{
          fontSize: '4vmin',
          fontFamily: 'Merienda',
          color: 'rgb(117, 135, 147)',
        }}
      >
        Add A New Grandpa
      </h1>
      <Form.Field>
        <label htmlFor="firstName">
          First Name
          <Form.Input
            type="text"
            name="firstName"
            id="firstName"
            onChange={props.handleChange}
          />
        </label>
      </Form.Field>

      <Form.Field>
        <label htmlFor="lastName">
          Last Name
          <Form.Input
            type="text"
            name="lastName"
            id="lastName"
            onChange={props.handleChange}
          />
        </label>
      </Form.Field>

      <Form.Field>
        <label htmlFor="rating">
          Rating:
          <Form.Input
            type="text"
            name="rating"
            id="rating"
            placeholder="####"
            onChange={props.handleChange}
          />
        </label>
      </Form.Field>

      <Form.Field>
        <label htmlFor="handedness">
          Handedness:
          <select
            onChange={props.handleChange}
            name="handedness"
            id="handedness"
            placeholder="Select handedness"
          >
            <option text="Left" value="left">
              Left
            </option>
            <option text="Right" value="right">
              Right
            </option>
          </select>
        </label>
      </Form.Field>

      <button id="cancel-button" onClick={props.cancel}>
        Cancel
      </button>
      <button id="create" onClick={props.handleSubmit}>
        Submit
      </button>
    </Segment>
  </Form>
);

export default AddPlayerForm;
