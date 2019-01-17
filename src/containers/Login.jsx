import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { fetchLogin } from '../Fetches';
import LoginForm from '../components/LoginForm';
import RegistrationErrors from '../components/RegistrationErrors';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showErrors: false,
      requestError: '',
      emptyFields: {
        email: true,
        password: true,
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

    // if fields are filled, submit request
    if (this.checkFieldsAreFilled()) {
      this.login({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };

  login = (payload) => {
    fetchLogin(payload).then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        this.props.setUser(data.user);
        this.props.history.push('/roster');
      } else {
        this.setState({ showErrors: true, requestError: data.error.message });
      }
    });
  };

  checkFieldsAreFilled = () => {
    const emptyFields = Object.values(this.state.emptyFields);
    if (emptyFields.includes(true)) {
      this.setState({
        showErrors: true,
      });
      return false;
    }
    return true;
  };

  render() {
    // if user is logged in, redirect to roster page
    if (localStorage.getItem('token')) {
      return <Redirect to="/roster" />;
    }
    return (
      <div className="login-background">
        <Grid textAlign="center" verticalAlign="middle" id="login-form">
          <Grid.Column style={{ maxWidth: 450 }}>
            {this.state.showErrors ? (
              <RegistrationErrors
                emptyFields={this.state.emptyFields}
                requestError={this.state.requestError}
              />
            ) : null}

            <LoginForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
