
import React, {Component,Fragment} from 'react'
import { tweets } from './UserFunctions'
import USAmap from "./heatmap";
import {Bar} from 'react-chartjs-2';



class Tweets extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      tweet_arr :[],
      tweet_type:[],
      tweet_location:[],
      tweet_data:[],
      tweet_date:[],
      tweet_day:[],

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
  
        })


      })

    }



    render() {

      return ( <Fragment >
        <div id="heatmap" style={divStyle}>
          HEATMAP
          <USAmap tweet_location={this.state.tweet_location}></USAmap>
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
