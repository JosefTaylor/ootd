import React, { Component } from "react";

import "./App.css";
import API from "./axiosApi";

import Wardrobe from "./components/Wardrobe";
import WornToday from "./components/GarmentWear";
import Login from "./components/Login";
import UserHeader from "./components/Header";
import LoginHeader from "./components/Header";
import DateSelector from "./components/DateSelector";
//import Stack from "./components/Stack";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garmentList: [],
      garmentWearList: [],
      authenticated: true,
      userUrl: "",
      userName: "",
      daySelected: new Date(),
    };
    this.refreshList = this.refreshList.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleWear = this.handleWear.bind(this);
  }

  refreshList() {
    API.get("/dashboard/") //Axios to send and receive HTTP requests
      .then((response) => {
        this.setState({
          userUrl: response.data[0].user,
          userName: response.data[0].username,
          garmentList: response.data[0].garments,
          garmentWearList: response.data[0].garment_wears,
        });
      })
      .catch((err) => console.log(err));
  }

  handleDateClick(n) {
    return (event) => {
      let newDay = new Date(this.state.daySelected);
      newDay.setDate(this.state.daySelected.getDate() + n);
      this.setState({ daySelected: newDay });
    };
  }

  handleWear(event) {
    API.post("/garmentwears/", {
      //Axios to send and receive HTTP requests
      garment: event.target.attributes.value.value,
      scan_date: this.state.daySelected,
    })
      .then(this.refreshList())
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    if (this.state.authenticated) {
      return (
        <div>
          <UserHeader userName={this.state.userName} />
          <DateSelector
            date={this.state.daySelected}
            onClick={this.handleDateClick}
            onChange={this.handleDatePick}
          />
          <WornToday
            garmentWearList={this.state.garmentWearList}
            daySelected={this.state.daySelected}
            onChange={this.refreshList}
          />
          <Wardrobe
            garmentList={this.state.garmentList}
            onWear={this.handleWear}
            onChange={this.refreshList}
          />
        </div>
      );
    } else {
      return (
        <div>
          <LoginHeader />
          <Login />
        </div>
      );
    }
  }
}

export default App;
