import React, {Component,Fragment} from 'react'
import { tweets } from './UserFunctions'
import USAmap from "./heatmap";


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
      tweets().then(res => {
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
          })
          console.log(this.state.tweet_type)
          console.log(this.state.tweet_location)
          console.log(this.state.tweet_heat_map)


    console.log("tweets.js")


}
handleSearchInputChanges= (e)=> {
  e.preventDefault()
  this.setState( {location: e.target.value })

}
callSearchFunction= (e)=>{
  e.preventDefault()
  console.log(this.state.location)




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
      <div id="heatmap" style={divStyle}>
                HEATMAP
                <USAmap tweet_location={this.state.tweet_location}></USAmap>
              console.log(this.state.tweet_location)
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

const divStyle = {
  /*border: '5px solid lightpink',*/
  border: "5px solid #45a29e",
  borderRadius: "20px",
  padding: "5px",
};


export default Tweets
