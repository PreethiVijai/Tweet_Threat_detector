import axios from 'axios'

export const register = newUser => {
  return axios
    .post('/users/register', {
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      newPassword: newUser.newPassword,
      success: newUser.success,
      message: newUser.message
    })
    .then(response => {
      console.log('Registered')
    })
}


export const login = user => {
  return axios
    .post('/users/login', {
      username: user.username,
      newPassword: user.newPassword
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return('"error"')
      /*return err*/
    })

}

export const getProfile = user => {
  return axios
    .get('/users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
