import React, { Component } from "react";

import axios from 'axios';

import Wardrobe from "./components/Wardrobe";
import WornToday from "./components/GarmentWear";
import Login from "./components/Login";
import UserHeader from "./components/Header";
import LoginHeader from "./components/Header";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      garmentList: [],
      garmentWearList: [],
      authenticated: true,
    };
  }

  setupUser() {
  }

  refreshList() {
    axios   //Axios to send and receive HTTP requests
    .get("http://localhost:8000/garments/", {withCredentials: true})
    .then(response => {this.setState({ garmentList: response.data })})
    .catch(err => console.log(err));
    axios   //Axios to send and receive HTTP requests
    .get("http://localhost:8000/garmentwears/", {withCredentials: true})
    .then(response => {this.setState({ garmentWearList: response.data })})
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.refreshList();
    if (this.state.garmentList.length > 0) {
     this.setState({ authenticated: true })
    } else {
      this.setState({ authenticated: false })
    }
  }

  render() {
    if (this.state.authenticated) {
     return (
       <div>
      <UserHeader/>
      <WornToday 
         garmentWearList={this.state.garmentWearList}
         />
       <Wardrobe 
         garmentList={this.state.garmentList}
         />
       </div>
       );
    } else {
    return (
      <div>
      <LoginHeader/>
      <Login/>
      </div>    
    );
  }
  }
}

export default App;