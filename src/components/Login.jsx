import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import request from 'request';
import RegistrationErrors from './RegistrationErrors';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      showErrors: false,
      emptyFields: {
        email: true,
        password: true
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    if (event.target.value !== ""){
      this.setState({
        emptyFields: {...this.state.emptyFields, [event.target.name]: false}
      })
    } else {
      this.setState({
        emptyFields: {...this.state.emptyFields, [event.target.name]: true}
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      showErrors: false
    })
    //check that all fields are filled
    if (this.checkFieldsAreFilled()){
      //then submit form
      this.login();
    }
  }

  login = () => {
    let body = {
      "email" : this.state.email,
      "password" : this.state.password
    }

    let options = {
      url: 'https://players-api.developer.alchemy.codes/api/login',
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      form: body
    }

    request(options, function(errors, response, body){
        let res = JSON.parse(body)
        let token = res.token

        console.log(res)
        console.log(res.error)

        // store jwt in localStorage
        localStorage.setItem('token', token)

        // TO DO: put following 2 lines inside conditional for if (res.success)
        if (res.success){
          this.props.setUser(res.user)

          this.props.history.push('/roster')
        }
    }.bind(this))
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

  render(){
    if (localStorage.getItem('token')){
      return <Redirect to='/roster'/>
    }
    else {
      return(
        <div>
          <h3>Login!</h3>

          {this.state.showErrors ? <RegistrationErrors errors={this.state.emptyFields}/> : null}

          <form onSubmit={this.handleSubmit}>
            <label>Email: </label>
            <input type="text" name="email" placeholder="Email" id="email" onChange={this.handleChange}/>

            <label>Password: </label>
            <input type="password" name="password" placeholder="Password" id="password" onChange={this.handleChange}/>

            <input type="submit" id="login"/>
          </form>
        </div>
      )
  }
}
}

export default Login;
