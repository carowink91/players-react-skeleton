import React, { Component } from 'react';
import request from 'request';
import RegistrationErrors from './RegistrationErrors';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import {
  Grid,
  Dropdown,
  Form,
  Button,
  Segment,
  Header,
} from 'semantic-ui-react';

class NewPlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      rating: '',
      handedness: 'left',
      showErrors: false,
      requestError: '',
      emptyFields: {
        firstName: true,
        lastName: true,
        rating: true,
        handedness: false,
      },
    };
  }

  handleChange = (event) => {
    if (event.target.value !== '') {
      this.setState({
        requestError: '',
        [event.target.name]: event.target.value,
        emptyFields: { ...this.state.emptyFields, [event.target.name]: false },
      });
    } else {
      this.setState({
        requestError: '',
        [event.target.name]: event.target.value,
        emptyFields: { ...this.state.emptyFields, [event.target.name]: true },
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ showErrors: false });

    // check that fields are filled
    if (this.checkFieldsAreFilled()) {
      // then submit form
      this.postNewPlayer();
    }
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

  postNewPlayer = () => {
    const token = localStorage.getItem('token');

    const body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      rating: this.state.rating,
      handedness: this.state.handedness,
    };

    const options = {
      url: 'https://players-api.developer.alchemy.codes/api/players',
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      form: body,
    };

    request(options, (errors, response, respBody) => {
      const res = JSON.parse(respBody);
      console.log(res);
      if (res.success) {
        this.props.history.push('/roster');
      } else {
        this.setState({
          showErrors: true,
          requestError: res.error.message,
        });
      }
    });
  };

  cancel = () => {
    this.props.history.push('/roster');
  };

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

    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column
            width={2}
            id="nav-column"
            textAlign="center"
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            <Navbar logout={this.props.logout} />
          </Grid.Column>

          <Grid.Column width={14}>
            <Grid
              textAlign="center"
              id="roster-background"
              style={{ paddingTop: '15vh' }}
            >
              <Grid.Column width={4}>
                {this.state.showErrors ? (
                  <RegistrationErrors
                    emptyFields={this.state.emptyFields}
                    requestError={this.state.requestError}
                  />
                ) : null}
                <Form style={{ maxWidth: 450 }}>
                  <Segment
                    raise
                    id="new-player-form-body"
                    style={{ backgroundColor: 'rgb(200, 169, 146)' }}
                  >
                    <h1 style={{ fontSize: '35px' }}>add a new pop</h1>
                    <Form.Field>
                      <label htmlFor="firstName">
                        First Name:
                        <Form.Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          onChange={this.handleChange}
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
                          onChange={this.handleChange}
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
                          onChange={this.handleChange}
                        />
                      </label>
                    </Form.Field>

                    <Form.Field>
                      <label htmlFor="handedness">
                        Handedness:
                        <Dropdown
                          onChange={this.handleChange}
                          name="handedness"
                          id="handedness"
                          placeholder="Select handedness"
                          selection
                          options={handednessOptions}
                        />
                      </label>
                    </Form.Field>

                    <button id="cancel-button" onClick={this.cancel}>
                      Cancel
                    </button>
                    <button
                      id="create-new-player-button"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default NewPlayerForm;
