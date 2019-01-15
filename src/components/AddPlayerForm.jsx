import React, { Component } from 'react';
import { Form, Segment, Dropdown } from 'semantic-ui-react';

class AddPlayerForm extends Component {
  render() {
    const handednessOptions = [
      {
        text: 'left',
        value: 'left',
      },
      {
        text: 'right',
        value: 'right',
      },
    ];

    return (
      <Form style={{ maxWidth: 450 }}>
        <Segment
          raised
          id="new-player-form-body"
          style={{ backgroundColor: 'rgb(200, 169, 146)' }}
        >
          <h1 style={{ fontSize: '35px', fontFamily: 'Merienda', color: 'rgb(117, 135, 147)' }}>Add A New Grandpa</h1>
          <Form.Field>
            <label htmlFor="firstName">
              First Name:
              <Form.Input
                type="text"
                name="firstName"
                id="firstName"
                onChange={this.props.handleChange}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="lastName">
              Last Name:
              <Form.Input
                type="text"
                name="lastName"
                id="lastName"
                onChange={this.props.handleChange}
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
                onChange={this.props.handleChange}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="handedness">
              Handedness:
              <Dropdown
                onChange={this.props.handleChange}
                name="handedness"
                id="handedness"
                placeholder="Select handedness"
                selection
                options={handednessOptions}
              />
            </label>
          </Form.Field>

          <button id="cancel-button" onClick={this.props.cancel}>
            Cancel
          </button>
          <button
            id="create-new-player-button"
            onClick={this.props.handleSubmit}
          >
            Submit
          </button>
        </Segment>
      </Form>
    );
  }
}

export default AddPlayerForm;
