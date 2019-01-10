import React, { Component } from 'react';

class RegistrationErrors extends Component{
  constructor(props){
    super(props);
    this.state={
      emptyFields: this.renderErrors()
    }
  }


  renderErrors = () => {
   let emptyFields = [];
   for (const key in this.props.errors){
     if (this.props.errors[key] === true){
       emptyFields.push(key)
     }
   }
   return emptyFields
  }

  render(){
    console.log(this.state.emptyFields)
    return(
      <div>
        <h3>Errors:</h3>
        <ul>
          {this.state.emptyFields.map((field, index) => <li key={index}>{field} cannot be empty.</li>)}
        </ul>

      </div>
    )
  }
}

export default RegistrationErrors;
