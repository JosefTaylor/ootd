import React, { Component } from "react";

import API from "./axiosApi";

import Login from "./pages/Login";
import Graph from "./pages/Graph"
import Dashboard from "./pages/Dashboard";
import Loading from "./pages/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garmentList: [],
      garmentWearList: [],
      userUrl: "",
      userName: "",
      daySelected: new Date(),
      page: "loading",
    };
    this.refreshList = this.refreshList.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  handleNav(newMode) {
    return (event) => {
      switch(newMode) {
        case "home":
        case "graphs":
        case "selfie":
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
          page: "home",
          userUrl: response.data[0].user,
          userName: response.data[0].username,
          garmentList: response.data[0].garments,
          garmentWearList: response.data[0].garment_wears,
        });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx    
          console.log('The request was made and the server responded with a status code that falls out of the range of 2xx')               
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('The request was made but no response was received', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        this.setState({page:"login"})
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    let content = []
    switch(this.state.page) {      
      case "home":
        content = <Dashboard 
          garmentList={this.state.garmentList} 
          garmentWearList={this.state.garmentWearList} 
          refreshList={this.refreshList} 
          userName={this.state.userName}
          onNav={this.handleNav}
          />
        break;
      case "graphs":
        content = <Graph
          garmentList={this.state.garmentList} 
          garmentWearList={this.state.garmentWearList} 
          refreshList={this.refreshList} 
          userName={this.state.userName}
          onNav={this.handleNav}
        />
        break;
      case "login":
        content = <Login/>
        break;
      case "loading":
        content = <Loading/>
        this.refreshList()
    }

    return (
      <div className="global-stack">
        <Header userName={this.state.userName} onNav={this.handleNav}/>
        <div className="field">{content}</div>
        <Footer/>
      </div>
    )
  }
}

export default App;
