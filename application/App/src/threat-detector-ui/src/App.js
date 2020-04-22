import React, { Component } from 'react';
import Header from './components/layout/Header';
import RegistrationComponents from './components/pages/RegistrationComponents'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/pages/Landing'
import Navbar from './components/pages/Navbar'
import UserProfile from './components/pages/UserProfile'
import Login from './components/pages/Login'

import './App.css';

class App extends Component{
  state={
    twitter_feed: [

    ]
  }

render(){
  return(
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Header/>
       <Route exact path="/register" component={RegistrationComponents} />
         <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={UserProfile} />
        <body/>
        <RegistrationComponents rf ={this.RegistrationComponents}/>
      </div>
    </div>
    </Router>
  );
}
}


export default App;
