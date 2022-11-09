import React, { Component } from "react";
import Wardrobe from "./components/Wardrobe";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      garmentList: [] 
    };
  }

  render() {
    return (
      <div>
      <h1>User Home Page</h1>
      <Wardrobe />
      </div>
    );
  }
}

export default App;