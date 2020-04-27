
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
      tweet_date:[],
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
          this.state.tweet_date[index]=obj[index].date
          /*tweet_heat_map[index][0]=tweet_type[index]
          tweet_heat_map[index][1]=tweet_location[index]*/
        })

        console.log("date")
        console.log(this.state.tweet_date)

   })

      /*  var i
        if(this.state.tweet_date.length > 0){
          for(i=0; i<this.state.tweet_date.length;i++){
            this.state.tweet_day[i]=parseInt(this.state.tweet_date[i].substring(8,10))
          }

        }
        console.log("date")
        console.log(this.state.tweet_day)*/

        this.state.chart_state = {
          labels: this.state.tweet_location,
          datasets: [
            {
              label: 'Tweet_Type',
              backgroundColor: 'red',
              borderColor: 'red',
              borderWidth: 2,
              data: this.state.tweet_type
            }
          ]
        }
        console.log("chart state")
        console.log(this.state.chart_state)






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
            <input style = {buttonStyle} onClick={this.callSearchFunction.bind(this)} type="submit" value="SEARCH" />
          </form>
        </div>
        <div>

          <Bar
            data={this.state.chart_state}
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
