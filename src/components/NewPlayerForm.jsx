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
      emptyFields: {
        firstName: true,
        lastName: true,
        rating: true,
        handedness: false,
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
    this.setState({ showErrors: false });

    // this.props.history.push('/roster');

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

    // initally had logic here to prevent user from accessing Roster if they were NOT signed in
    // but the e2e tests seem not to allow it

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
              {this.state.showErrors ? (
                <RegistrationErrors errors={this.state.emptyFields} />
              ) : null}
              <Grid.Column width={4}>
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

// if (!localStorage.getItem('token')) {
//   return <Redirect to="/" />;
// }

// <option name="left" value="left">
//   Left
// </option>
// <option name="right" value="right">
//   Right
// </option>

// ////////////

// <div>
//   <Grid textAlign="center" verticalAlign="middle">
//     <Grid.Column
//       width={2}
//       id="nav-column"
//       textAlign="center"
//       style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
//     >
//       <Navbar logout={this.props.logout} />
//     </Grid.Column>
//
//     <Grid.Column
//       width={14}
//       textAlign="center"
//       id="roster-background"
//       style={{ paddingTop: '15vh' }}
//     >
//       {this.state.showErrors ? (
//         <RegistrationErrors errors={this.state.emptyFields} />
//       ) : null}
//
//       <Form style={{ maxWidth: 450 }} onSubmit={this.handleSubmit}>
//         <Segment raise id="new-player-form-body">
//           <h1 style={{ fontSize: '35px' }}>add a new pop</h1>
//           <Form.Field>
//             <label htmlFor="firstName">
//               First Name:
//               <Form.Input
//                 type="text"
//                 name="firstName"
//                 id="firstName"
//                 onChange={this.handleChange}
//               />
//             </label>
//           </Form.Field>
//
//           <Form.Field>
//             <label htmlFor="lastName">
//               Last Name:
//               <Form.Input
//                 type="text"
//                 name="lastName"
//                 id="lastName"
//                 onChange={this.handleChange}
//               />
//             </label>
//           </Form.Field>
//
//           <Form.Field>
//             <label htmlFor="rating">
//               Rating:
//               <Form.Input
//                 type="text"
//                 name="rating"
//                 id="rating"
//                 onChange={this.handleChange}
//               />
//             </label>
//           </Form.Field>
//
//           <Form.Field>
//             <label htmlFor="handedness">
//               Handedness:
//               <Dropdown
//                 onChange={this.handleChange}
//                 name="handedness"
//                 id="handedness"
//                 placeholder="Select handedness"
//                 selection
//                 options={handednessOptions}
//               />
//             </label>
//           </Form.Field>
//
//           <input type="submit" id="create" />
//           <button onClick={this.cancel}>Cancel</button>
//         </Segment>
//       </Form>
//     </Grid.Column>
//   </Grid>
// </div>
// );
// }
// }
