import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import RegistrationErrors from '../components/RegistrationErrors';
import { fetchPostNewPlayer } from '../Fetches';
import AddPlayerForm from '../components/AddPlayerForm';
import Navbar from '../components/Navbar';

class AddPlayer extends Component {
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
    // this.props.history.push('/roster');

    // check that fields are filled
    if (this.checkFieldsAreFilled()) {
      // then submit form
      const body = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        rating: this.state.rating,
        handedness: this.state.handedness,
      };
      this.postNewPlayer(body);
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

  postNewPlayer = (payload) => {
    fetchPostNewPlayer(payload, (errors, response, body) => {
      const res = JSON.parse(body);

      if (res.success) {
        this.props.history.push('/roster');
      } else {
        this.setState({
          showErrors: true,
        });
        this.setRequestError(res.error.message);
      }
    });
  };

  setRequestError(error) {
    if (error === 'Resource already exists.') {
      this.setState({
        requestError:
          'This first name / last name combo is alredy in use. Please try another name combination.',
      });
    } else if (error === 'Invalid value for rating') {
      this.setState({
        requestError: 'Rating must contain 1-4 digits only.',
      });
    }
  }

  cancel = () => this.props.history.push('/roster');

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column
            width={3}
            id="nav-column"
            textAlign="center"
            style={{ background: 'rgb(56, 65, 93)', height: '110vh' }}
          >
            <Navbar logout={this.props.logout} />
          </Grid.Column>

          <Grid.Column width={13}>
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

                <AddPlayerForm
                  cancel={this.cancel}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddPlayer;
