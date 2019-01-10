import React, { Component } from 'react';
import RegistrationErrors from './RegistrationErrors';
import { fetchPostNewUser } from '../Fetches';
import axios from 'axios';
import request from 'request';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      emptyFields: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true
      },
      showErrors: false,
      user: null
    }
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (event.target.value !== ""){
      this.setState({
        emptyFields: {...this.state.emptyFields, [event.target.name]: false}
      })
    }
  }

  submitRegistration = (event) => {
    event.preventDefault();
    this.setState({
      showErrors: false
    })
    // check all fields are filled and passwords match
    if (this.checkFieldsAreFilled() && this.checkPasswordMatch()){
      console.log("all good")
      console.log(this.state.password + " " + this.state.confirmPassword)
      let body = {
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "email": this.state.email,
        "password": this.state.password,
        "confirm_password": this.state.confirmPassword
      }

      let headers = {
        'Content-Type':'application/json'
      }

      // Configure the request
      let options = {
          url: `https://players-api.developer.alchemy.codes/api/user`,
          method: 'POST',
          headers: headers,
          form: body
      }
      // Start the request
      let currentUser = 'none';

      request(options, function (error, response, respBody) {

          if (!error) {
            // Print out the response body
            console.log(JSON.parse(respBody))

            let token = JSON.parse(respBody).token
            console.log(token)

            if (token){
              localStorage.setItem('token', token)
            }

            let user = JSON.parse(respBody).user
            console.log(user)

            this.props.setUser({user: user})
          }
      }.bind(this))
    }
  }

  passUser = (user) => {
    debugger
    this.props.setUser(user)
  }

  checkFieldsAreFilled = () => {
    for (const key in this.state.emptyFields){
      if (this.state.emptyFields[key] === true){
        this.setState({
          showErrors: true
        })
        return false
      }
    }
    return true
  }

  checkPasswordMatch = () => {
    if (this.state.password !== this.state.confirmPassword){
      return alert("Passwords must match.");
    } else {
      return true
    }
  }


  render(){
    console.log(this.props)
    if (localStorage.getItem('token')){
      return <Redirect to='/roster'/>
    }
    else {
      return(
        <div>Register!
        {this.state.showErrors ? <RegistrationErrors errors={this.state.emptyFields}/> : null}

        <form id="register"
        onSubmit={this.submitRegistration}>

        <label>First Name: </label>
        <input type="text" id="firstName" name="firstName" placeholder="First Name" onChange={this.handleChange}></input>

        <label>Last Name: </label>
        <input type="text" id="lastName" name="lastName" placeholder="Last Name" onChange={this.handleChange}></input>

        <label>Email: </label>
        <input type="text" id="email" name="email" placeholder="Email" onChange={this.handleChange}></input>

        <label>Password: </label>
        <input type="text" id="password" name="password" placeholder="Password" onChange={this.handleChange}></input>

        <label>Confirm Password: </label>
        <input type="text" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange}></input>

        <input type="submit"/>
        </form>
        </div>
      )
    }
  }
}

export default Register
