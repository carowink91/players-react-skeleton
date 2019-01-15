import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { fetchPostNewUser } from '../Fetches';
import RegistrationErrors from '../components/RegistrationErrors';
import RegistrationForm from '../components/RegistrationForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showErrors: false,
      passwordError: '',
      requestError: '',
      emptyFields: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true,
      },
    };
  }

  handleChange = (event) => {
    if (event.target.value !== '') {
      this.setState(
        {
          requestError: '',
          [event.target.name]: event.target.value,
          emptyFields: { ...this.state.emptyFields, [event.target.name]: false },
        },
        () => this.checkPasswordMatch(),
      );
    } else {
      this.setState({
        requestError: '',
        [event.target.name]: event.target.value,
        emptyFields: { ...this.state.emptyFields, [event.target.name]: true },
      });
    }
  };

  submitRegistration = (event) => {
    event.preventDefault();
    this.setState({ showErrors: false });
    // this.props.history.push('/roster');

    // check all fields are filled and passwords match
    if (this.checkPasswordMatch() && this.checkFieldsAreFilled()) {
      const body = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirmPassword,
      };
      this.register(body);
    }
  };

  register = (payload) => {
    fetchPostNewUser(payload, (errors, response, body) => {
      const res = JSON.parse(body);
      // if successful, store jwt in localStorage
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.props.setUser(res.user);
      } else {
        this.setState({
          showErrors: true,
          requestError: 'Email already in use.',
        });
      }
    });
  };

  checkFieldsAreFilled = () => {
    const values = Object.values(this.state.emptyFields);
    if (values.includes(true) || this.state.passwordError !== '') {
      this.setState({
        showErrors: true,
      });
      return false;
    }
    return true;
  };

  checkPasswordMatch = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordError: 'Passwords must match.',
        showErrors: true,
      });
      return false;
    }
    this.setState({ passwordError: '' });
    return true;
  };

  passUser = user => this.props.setUser(user);

  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/roster" />;
    }
    return (
      <div className="register-background">
        <Grid textAlign="center" verticalAlign="middle" id="register-form">
          <Grid.Column style={{ maxWidth: 450 }}>
            <header id="register-header">Make an Account</header>
            {this.state.showErrors ? (
              <RegistrationErrors
                emptyFields={this.state.emptyFields}
                passwordError={this.state.passwordError}
                requestError={this.state.requestError}
              />
            ) : null}

            <RegistrationForm
              handleChange={this.handleChange}
              submitRegistration={this.submitRegistration}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Register;
