import React, {Component,Fragment} from 'react'
import { tweets } from './UserFunctions'
import USAmap from "./heatmap";
import {Bar} from 'react-chartjs-2';


class Tweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet_arr :[],
      location: '',
      tweet_type:[],
      tweet_location:[],
      tweet_data:[],
      chart_state:{}
      }
    }

    componentDidMount() {
      tweets().then(res => {
        if (!res.error) {
          console.log("In tweet page")
          this.setState( {tweet_arr: res })}
          console.log(this.state.tweet_arr)
          const obj=this.state.tweet_arr


          Object.keys(obj).map((index) => {
            this.state.tweet_type[index] = obj[index].type
            this.state.tweet_location[index] = obj[index].location
            this.state.tweet_data[index]=obj[index].tweets
            /*tweet_heat_map[index][0]=tweet_type[index]
            tweet_heat_map[index][1]=tweet_location[index]*/
          })
          this.state.chart_state = {
          labels: this.state.tweet_location,
          datasets: [
          {
            label: 'Tweet_Type',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: this.state.tweet_type
          }
          ]
          }
          console.log("chart state")
          console.log(this.chart_state)

          })




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
      <div id="heatmap" style={divStyle}>
                HEATMAP
                <USAmap tweet_location={this.state.tweet_location}></USAmap>
              </div>

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
              <div>

              <Bar
          data={this.state.tweet_type}
          options={{
            title:{
              display:true,
              text:'Tweet type vs location',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
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
