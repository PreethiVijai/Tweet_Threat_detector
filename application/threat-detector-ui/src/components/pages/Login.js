import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      newPassword: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      username: this.state.username,
      newPassword: this.state.newPassword
    }

    login(user).then(res => {
      console.log(this.props.history);
      if (!res.error) {
        this.props.history.push('users/profile')
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Enter User Name"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Password</label>
                <input
                  type="newPassword"
                  className="form-control"
                  name="newPassword"
                  placeholder="newPassword"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
