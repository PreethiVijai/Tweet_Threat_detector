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
    /*console.log(this.refs["simpleForm"].getFormValues());
       let obj = this.refs["simpleForm"].getFormValues();
       fetch("http://localhost:3000/insert", {
         method: "post",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify(obj)
       });
       this.setState({success:'True'});
       this.setState({message:'Successful'});*/
       /*const sql1 = 'CREATE TABLE Threatdb (username varchar(20) not null, firstName varchar(20) not null,lastName varchar(20) not null,newPassword varchar(20) not null,success varchar(20) not null,message varchar(20) not null )';
       const sql = 'INSERT INTO Threatdb(username,firstName,lastName,newPassword,success,message) VALUES(username,firstName,lastName,newPassword,success,message)';
       connection.query(sql1);
       connection.query(sql);
       connection.end();*/
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
        <label>Username</label>
        <input type="text" className="form-control" placeholder="Username" name="username" required onChange={() => this.handleChange} />
    </div>
    <div  className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" name="newPassword" required onChange={() => this.handleChange} />
    </div>
    <div  className="form-group">
        <label>First Name</label>
        <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={() => this.handleChange} />
    </div>
    <div  className="form-group">
        <label>Last Name</label>
        <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={() => this.handleChange} />
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
</form>
      </div>
    );
  }
}


/*const mysql = require('mysql');
const config = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'priyanka',
   database : 'ThreatDetectorDB',
   port: 3306
  });

const connection = mysql.createConnection(config);*/

export default RegistrationComponents;
