import React, { Component } from "react";
import USAMap from "react-usa-map";
class USAmap extends Component {
  tweet_location = [];
  results = {};
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  componentDidMount() {
    const stateName1 = "#66fcf1";
    this.tweet_location = this.props.tweet_location;
    this.results = {};

    console.log(this.tweet_location);
    if (this.tweet_location.length > 0) {
      var i;
      for (i = 0; i < this.tweet_location.length; i++) {
        this.results[this.tweet_location[i]] = { fill: stateName1 };
      }
    }
    console.log(this.results)
    return this.results;
  }

  render() {
    return (
      <div className="Usamap">
        <USAMap
          customize={this.componentDidMount()}
          onClick={this.mapHandler}
        />
      </div>
    );
  }
}
export default USAmap;
