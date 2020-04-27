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
      <input style = {buttonStyle} onClick={this.callSearchFunction.bind(this)} type="submit" value="Detect Threats!!!" />




       </Fragment>


    )
  }
}

const buttonStyle={
  display: 'inline-block',
  zoom:' 1',
  padding: '6px 20px',
  margin:'10px',
  cursor: 'pointer',
  border: '1px solid #bbb',
  overflow: 'visible',
  font: 'bold 13px arial, helvetica, sans-serif',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  color: '#555',
  width:'700px',

  backgroundColor: '#ddd',
  backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)))',
  backgroundImage: '-webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0))',
  backgroundImage: '-moz-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0))',
  backgroundImage: '-ms-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0))',
  backgroundImage: '-o-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0))',
  backgroundImage: 'linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0))',


  transition: 'background-color .2s ease-out',
  backgroundClip: 'padding-box', /* Fix bleeding */

  borderRadius: '3px',

  boxShadow: '0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset',
  textShadow: '0 1px 0 rgba(255,255,255, .9)',

  userSelect: 'none'
}

export default Profile
