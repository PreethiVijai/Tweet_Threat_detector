import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      username: decoded.identity.username,
      firstName: decoded.identity.firstName,
      lastName: decoded.identity.lastName
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.firstName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.lastName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default UserProfile
