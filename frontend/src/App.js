import React, { Component } from "react";
import Wardrobe from "./components/Wardrobe";
import WornToday from "./components/GarmentWear";
import Login from "./components/Login";
import axios from 'axios';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      garmentList: [],
      garmentWearList: [] 
    };
  }

  refreshList() {
    axios   //Axios to send and receive HTTP requests
    .get("http://localhost:8000/garments/", {withCredentials: true}) //specify a user here?
    .then(response => {this.setState({ garmentList: response.data })})
    .catch(err => console.log(err));
    axios   //Axios to send and receive HTTP requests
    .get("http://localhost:8000/garmentwears/", {withCredentials: true}) //specify a user here?
    .then(response => {this.setState({ garmentWearList: response.data })})
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
      // if user is logged in:
     return (
       <div>
       <h1>User Home Page
       </h1>
       <WornToday 
         garmentWearList={this.state.garmentWearList}
         />
       <Wardrobe 
         garmentList={this.state.garmentList}
         />
       </div>
       );
    //  //else if user is logged out:
    // return (
    //   <div>
    //     <h1>OOTD Home Page</h1>
    //     <Login/>
    //   </div>       
    // );
  }
}

export default App;