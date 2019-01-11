import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Roster from './Roster';
import request from 'request';

class App extends Component {
  constructor(){
    super()
    this.state={
      user: null
    }
  }

  setUser = (user) => {
    console.log('in setUser')
    this.setState({
      user: user
    })
  }

  


  render(){
    return(
      <Router>
        <Switch>

          <Route exact path='/' component={Home}/>

          <Route exact path='/login' render={(props) =>
                <Login {...props}
                  setUser={this.setUser}/>}/>

          <Route exact path='/register' render={(props) =>
                <Register {...props}
                  setUser={this.setUser}/>}/>

          <Route exact path='/roster' render={(props) =>
                <Roster {...props}
                  user={this.state.user}/>}/>

        </Switch>
      </Router>
    )
  }
}

export default App;
