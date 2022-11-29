import React, { Component } from "react";

import "./App.css";

import API from "./axiosApi";

import Wardrobe from "./components/Wardrobe";
import WornToday from "./components/GarmentWear";
import Login from "./components/Login";
import UserHeader from "./components/Header";
import LoginHeader from "./components/Header";
import DateSelector from "./components/DateSelector";
import Graph from "./components/Graph"

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
      page: "home",
    };
    this.refreshList = this.refreshList.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleWear = this.handleWear.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  handleNav(newMode) {
    return (event) => {
      switch(newMode) {
        case "home":
        case "graphs":
          this.setState({page: newMode});
          break;
        default:
          this.setState({page: "home"})
      }
    };
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

  dashboard() {
    return (
      <div className="stack-container">
        <div>
          <DateSelector
          date={this.state.daySelected}
          onClick={this.handleDateClick}
          onChange={this.handleDatePick}
          />
        </div>
        <div>
          <WornToday
          garmentWearList={this.state.garmentWearList}
          daySelected={this.state.daySelected}
          onChange={this.refreshList}
          />
        </div>
        <div>
          <Wardrobe
          garmentList={this.state.garmentList}
          onWear={this.handleWear}
          onChange={this.refreshList}
          />
        </div>
      </div>
    )
  }

  graphs() {
    return (
      <Graph/>
    )
  }

  render() {
    let content = []
    switch(this.state.page) {      
      case "home":
        content = this.dashboard()
        break;
      case "graphs":
        content = this.graphs()
        break;
      default:
        console.log("I couldn't find a page called " + this.state.page)
        content = []

    }
    if (this.state.authenticated) {
      return (
        <div>
          <UserHeader userName={this.state.userName} onNav={this.handleNav}/>
          <div className="wrapper pad-16">
            {content}
          </div>
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
