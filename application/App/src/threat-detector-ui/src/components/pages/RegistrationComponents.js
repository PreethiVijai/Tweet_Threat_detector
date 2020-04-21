import React, { Component } from 'react';

//import {BrowserRouter as Router, Route} from 'react-router-dom';

import RegistrationForm from './RegistrationForm'
//constructor
class RegistrationComponents extends Component{
  constructor(props){
    super(props);

this.state =
{
    username: '',
    firstName: '',
    lastName: '',
    newPassword: '',
    success: null,
    message: ''
};
}
handleChange(event)
{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value)

    this.setState({ [name]: value });

    return true;
}

render() {
  	return (

      <div>
      <RegistrationForm/>
    <form formStyle onSubmit={this.handleSubmit}>
    <div formStyle className="form-group">
        <label>Username</label>
        <input type="text" className="form-control" placeholder="Username" name="username" required onChange={() => this.handleChange} />
    </div>
    <div formStyle className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" name="newPassword" required onChange={() => this.handleChange} />
    </div>
    <div formStyle className="form-group">
        <label>First Name</label>
        <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={() => this.handleChange} />
    </div>
    <div formStyle className="form-group">
        <label>Last Name</label>
        <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={() => this.handleChange} />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
    );
  }
}
const formStyle={
  display: 'block',
    fontSize: '11px',
    padding: '4px 2px',
    border: 'solid 1px #aacfe4',
    width: '70px',
    margin:'2px 0 20px 10px'
}


export default RegistrationComponents;
