import axios from 'axios'


export const register = newUser => {
    axios.defaults.baseURL = 'accesser:8000/';
    console.log('Register Attempted');
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      location: newUser.location,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  axios.defaults.baseURL = 'accesser:8080/';
  console.log('Login Attempted');
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

export const tweets = user => {
    axios.defaults.baseURL = 'accesser:8080/';
  return axios
    .post('users/tweets', )
    .then(response => {
      /*localStorage.setItem('usertoken', response.data)*/
      console.log("usr")
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

export const getProfile = user => {
    axios.defaults.baseURL = 'accesser:8080/';
  return axios
    .get('users/profile', {
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
