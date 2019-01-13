import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Roster from './Roster';
import NewPlayerForm from './NewPlayerForm';
import Wager from './Wager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  setUser = (user) => {
    this.setState({
      user,
    });
  };

  redirectToNewPlayer = () => {
    this.props.history.push('/player/new');
  };

  logout = () => {
    localStorage.clear();
    this.props.history.push('/');
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route
            exact
            path="/login"
            render={props => <Login {...props} setUser={this.setUser} />}
          />

          <Route
            exact
            path="/register"
            render={props => <Register {...props} setUser={this.setUser} />}
          />

          <Route
            exact
            path="/roster"
            render={props => (
              <Roster {...props} user={this.state.user} logout={this.logout} />
            )}
          />

          <Route
            exact
            path="/wager"
            render={props => (
              <Wager {...props} user={this.state.user} logout={this.logout} />
            )}
          />

          <Route
            exact
            path="/player/new"
            render={props => (
              <NewPlayerForm
                {...props}
                addNewPlayer={this.addNewPlayer}
                logout={this.logout}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
