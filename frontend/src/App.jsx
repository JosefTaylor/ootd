import React, { Component } from "react";

import API from "./axiosApi.jsx";
import Login from "./pages/Login.jsx";
import Graph from "./pages/Graph.jsx"
import Dashboard from "./pages/Dashboard.jsx";
import Loading from "./pages/Loading.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";

import './index.css';

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
      switch (newMode) {
        case "home":
        case "graphs":
        case "selfie":
        case "register":
          this.setState({ page: newMode });
          break;
        case "logout":
          this.setState({
            garmentList: [],
            garmentWearList: [],
            userUrl: "",
            userName: "",
            page: "logout"
          })
          break;
        default:
          this.setState({ page: "home" })
      }
    };
  }

  async refreshList() {
    try {
      let response = await API.get("/dashboard/")
      this.setState({
        page: "home",
        userUrl: response.data[0].user,
        userName: response.data[0].username,
        garmentList: response.data[0].garments,
        garmentWearList: response.data[0].garment_wears,
      });
    } catch (error) {
      this.setState({page: "login"})
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {

    return (
      <div className="global-stack">
        <Header userName={this.state.userName} onNav={this.handleNav} />
        <main className="field">
          {this.state.page === 'home' &&
            <Dashboard
              garmentList={this.state.garmentList}
              garmentWearList={this.state.garmentWearList}
              refreshList={this.refreshList}
              userName={this.state.userName}
              onNav={this.handleNav}
            />
          }
          {this.state.page === 'graphs' &&
            <Graph
              garmentList={this.state.garmentList}
              garmentWearList={this.state.garmentWearList}
              refreshList={this.refreshList}
              userName={this.state.userName}
              onNav={this.handleNav}
            />
          }
          {this.state.page === 'login' &&
            <Login onNav={this.handleNav} onLogin={this.refreshList} />
          }
          {this.state.page === "register" &&
            <Register />
          }
          {this.state.page === "logout" &&
            <Logout />
          }
          {this.state.page === "loading" &&
            <Loading />
          }
        </main>
        <Footer />
      </div >
    )
  }
}

//<main className="field">{content}

export default App;
