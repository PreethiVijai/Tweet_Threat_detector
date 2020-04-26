import React, {Component,Fragment} from 'react'
import Heatmap from "react-simple-heatmap"
import { tweets } from './UserFunctions'


class Tweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet_arr :[],
      location: '',
      tweet_type:[],
      tweet_location:[],
      tweet_heat_map:[[],[]]
      }
    }
    componentDidMount() {

    console.log("tweets.js")


}
handleSearchInputChanges= (e)=> {
  e.preventDefault()
  this.setState( {location: e.target.value })

}
callSearchFunction= (e)=>{
  e.preventDefault()
  console.log(this.state.location)
  const tw_query_loc = {
    location : this.state.location
  }
  console.log(tw_query_loc)
  tweets(tw_query_loc ).then(res => {
    if (!res.error) {
      console.log("In tweet page")
      this.setState( {tweet_arr: res })}
      console.log(this.state.tweet_arr)
      const obj=this.state.tweet_arr
      console.log("preethi_test")
      console.log(obj)

      Object.keys(obj).map((index) => {
        this.state.tweet_type[index] = obj[index].type
        this.state.tweet_location[index] = obj[index].location
        this.state.tweet_heat_map[index] = [this.state.tweet_type[index], this.state.tweet_location[index]]
        /*tweet_heat_map[index][0]=tweet_type[index]
        tweet_heat_map[index][1]=tweet_location[index]*/
      })
      console.log(this.state.tweet_type)
      console.log(this.state.tweet_location)
      console.log(this.state.tweet_heat_map)

})

}





  render() {

    return ( <Fragment >

      <div className="Location Search">
        <form>
          <input
            style ={search_style}
            type="text"
            name="location"
            placeholder="Enter location of search"
            value={this.state.location}
            onChange={this.handleSearchInputChanges.bind(this)}

          />
        <input onClick={this.callSearchFunction.bind(this)} type="submit" value="SEARCH" />
        </form>
      </div>
    </Fragment>
    )
  }

}

const search_style={
margin: "10px",
padding: "10px",
width: "300px",
borderRadius: "20px"
};


const background = (rgb) => {
    return `rgb(${rgb.red * 100}%, ${rgb.green * 100}%, ${rgb.blue * 100}%)`;
}


export default Tweets
