import React, { Component , Fragment} from 'react'
import jwt_decode from 'jwt-decode'
import { tweets } from './UserFunctions'



class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
  }


  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.identity.first_name,
      last_name: decoded.identity.last_name,
      email: decoded.identity.email,
    })
  }


  callSearchFunction= (e)=>{
    e.preventDefault()
    this.props.history.push('/tweets')

      }

  



  render() {


    return (

      <Fragment>

      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <input onClick={this.callSearchFunction.bind(this)} type="submit" value="Detect Threats!!!" />




       </Fragment>


    )
  }
}

export default Profile
