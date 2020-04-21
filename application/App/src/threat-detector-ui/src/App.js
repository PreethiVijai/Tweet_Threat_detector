import React, { Component } from 'react';
import Header from './components/layout/Header';
import RegistrationComponents from './components/pages/RegistrationComponents'


import './App.css';

class App extends Component{
  state={
    twitter_feed: [

    ]
  }

render(){
  return(
    <div className="App">
      <div className="container">
        <Header/>
        <body/>
        <RegistrationComponents rf ={this.RegistrationComponents}/>
      </div>
    </div>
  );
}
}


export default App;
