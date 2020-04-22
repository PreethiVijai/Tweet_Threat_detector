import React, { Component } from 'react';

export class RegistrationForm extends Component{
  constructor(props){
    super(props);

  this.state={
    success:'',
    message:''
  };
  this.handleChange = this.handleChange.bind(this);
  this.handleArrayChange = this.handleArrayChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
      {
      }

      handleArrayChange(event)
      {
      }

      handleSubmit(event)
      {
      }

render(){
  return(
    <div>
    <h1>
      <font color={'#C0C0C0'}>
        User Registration
      </font>
    </h1>
    <p>
      <font color={'#A9A9A9'}>
        Please fill in all the required fields to create a new user account.
      </font>
    </p>
      {this.state.success === false &&
                 <p className="alert alert-danger" role="alert">
                     {this.state.message}
                 </p>}
                 {this.state.success === true &&
                 <p className="alert alert-success" role="alert">
                     User successfully registered
                 </p>}
                 {!this.state.success &&
                 <form onSubmit={this.handleSubmit}>
                 </form>}
    </div>

  );

}
}

export default RegistrationForm;
