import React, { Component } from 'react';

class Register extends Component {



  render(){
    return(
      <div>Register!
        <form id="register"
              onSubmit={this.submitRegistration}>

          <label>First Name: </label>
          <input type="text" id="firstName" placeholder="First Name"></input>

          <label>Last Name: </label>
          <input type="text" id="lastName" placeholder="Last Name"></input>

          <label>Email: </label>
          <input type="text" id="email" placeholder="Email"></input>

          <label>Password: </label>
          <input type="text" id="password" placeholder="Password"></input>

          <label>Confirm Password: </label>
          <input type="text" id="confirmPassword" placeholder=""></input>

          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default Register
