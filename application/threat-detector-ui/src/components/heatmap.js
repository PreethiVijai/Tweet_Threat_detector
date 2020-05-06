import React, { Component } from 'react';
import { tweets } from './UserFunctions'
import USAMap from "react-usa-map";

class App extends Component {
  /* mandatory */

  constructor(props) {
      super(props);
  this.state = {
  tweet_location_abbr : [],
  results :{},
  tweet_arr :[],
  location: '',
  tweet_type:[],
  tweet_data:[],
  tweet_location : []
}
}

  mapHandler = (event) => {
    /*alert(event.target.dataset.name);*/
    const obj=this.state.tweet_arr
    Object.keys(obj).map((index) => {
      if(this.state.tweet_location_abbr[index]==event.target.dataset.name){
        alert(this.state.tweet_data[index])
      }
    })
  };
  mapStates=(event)=>{
    const us_state_abbrev = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District of Columbia': 'DC',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands':'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
}
var i = 0
if(this.state.tweet_location.length>0){

for(i = 0; i < this.state.tweet_location.length; i++){
  if(us_state_abbrev[this.state.tweet_location[i]]){
    this.state.tweet_location_abbr[i]=us_state_abbrev[this.state.tweet_location[i]]
  }
  else{
    this.state.tweet_location_abbr[i]=this.state.tweet_location[i]
  }
}
}
}


  /* optional customization of filling per state and calling custom callbacks per state */
   componentDidMount() {
     tweets().then(res => {
       if (!res.error) {
         this.setState( {tweet_arr: res })}
         const obj=this.state.tweet_arr
         console.log(obj)
         Object.keys(obj).map((index) => {
           this.state.tweet_type[index] = obj[index].type
           this.state.tweet_location[index] = obj[index].location
           this.state.tweet_data[index]=obj[index].tweets

           this.mapStates()
           console.log("inside mount")
           console.log(this.state.tweet_location_abbr)
         })

         })
}
  statesCustomConfig = () => {
    const fill_color = "#CC0000"
    console.log("inside statesCustomConfig")

    if (this.state.tweet_location_abbr.length > 0) {
        var i;

        for (i = 0; i < this.state.tweet_location_abbr.length; i++) {
          this.state.results[this.state.tweet_location_abbr[i]] = { fill: fill_color };
        }
      }

      console.log(this.state.results)

      return this.state.results
  };

  render() {
    return (
      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
      </div>
    );
  }
}

export default App;
