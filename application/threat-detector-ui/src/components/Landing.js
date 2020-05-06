import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div style = {ribbonStyle} className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">WELCOME</h1>
          </div>
        </div>
      </div>
    )
  }
}

const ribbonStyle={

    backgroundColor: 'darkgray'

  }


export default Landing
