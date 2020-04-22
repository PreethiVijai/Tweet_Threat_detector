import React, { Component } from 'react';
import { register } from './UserFunctions'






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
this.onChange = this.onChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
}


onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }


renderSuggestion = (suggestion) => {
    return <span>{suggestion.name}</span>;
  };

handleChange(event)
{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value)

    this.setState({ [name]: value });

    return true;
}

handleSubmit(event)
{
  /*code to persist data into database*/
    event.preventDefault();

       this.setState({success:'True'});
       this.setState({message:'Successful'});
       const newUser = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      newPassword: this.state.newPassword,
      success: this.state.success,
      message: this.state.message
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })



}

render() {
  	return (

      <div>
      <RegistrationForm/>
    <form  ref="simpleForm" onSubmit={() => this.handleSubmit}>
    <div  className="form-group">

      <font color={'#A9A9A9'}>

        <label>Username</label>
        <input type="text" className="form-control" placeholder="Username" name="username" required onChange={() => this.handleChange} />
      </font>
    </div>
    <div  className="form-group">

      <font color={'#A9A9A9'}>

        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" name="newPassword" required onChange={() => this.handleChange} />
      </font>
    </div>
    <div  className="form-group">

      <font color={'#A9A9A9'}>

        <label>First Name</label>
        <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={() => this.handleChange} />
      </font>
    </div>
    <div  className="form-group">

      <font color={'#A9A9A9'}>

        <label>Last Name</label>
        <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={() => this.handleChange} />
      </font>
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
</form>
      </div>
    );
  }
}



export default RegistrationComponents;

