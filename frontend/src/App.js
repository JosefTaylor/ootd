import React, { Component } from "react";

import axios from 'axios';

import './App.css'

import Wardrobe from "./components/Wardrobe";
import WornToday from "./components/GarmentWear";
import Login from "./components/Login";
import UserHeader from "./components/Header";
import LoginHeader from "./components/Header";
import DateSelector from "./components/DateSelector";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      garmentList: [],
      garmentWearList: [],
      authenticated: true,
      user: {url:"http://localhost:8000/users/1/"},
      daySelected: new Date()
    };
    this.handleClick = this.handleClick.bind(this)
    this.refreshList = this.refreshList.bind(this)
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

  handleClick(n) {
    return (event) => {
      let newDay = new Date(this.state.daySelected)
      newDay.setDate(this.state.daySelected.getDate() + n)
      this.setState({daySelected: newDay})
    }
  }

  componentDidMount() {
    this.refreshList();
    // if (this.state.garmentList.length > 0) {
    //  this.setState({ authenticated: true })
    // } else {
    //   this.setState({ authenticated: false })
    // }
  }

  render() {
    if (this.state.authenticated) {
     return (
      // <GarmentEdit user={this.state.user}/>
        <div>
          <UserHeader/>
          <h2>
          <DateSelector 
          date={this.state.daySelected.toDateString()} 
          onClick={this.handleClick}
          />  
          </h2>
          <WornToday 
          garmentWearList={this.state.garmentWearList}
          daySelected={this.state.daySelected}
          />
          <Wardrobe 
          garmentList={this.state.garmentList}
          daySelected={this.state.daySelected}
          onChange={this.refreshList}
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