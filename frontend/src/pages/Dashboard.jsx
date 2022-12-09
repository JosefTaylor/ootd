import React, { Component } from "react";

import API from "../axiosApi.jsx";

import Wardrobe from "../components/Wardrobe.jsx";
import WornToday from "../components/WornToday.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daySelected: new Date(),
    };

    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.handleWear = this.handleWear.bind(this);
  }

  handleDateClick(n) {
    return (event) => {
      let newDay = new Date(this.state.daySelected);
      newDay.setDate(this.state.daySelected.getDate() + n);
      this.setState({ daySelected: newDay });
    };
  }

  handleDatePick(event) {
    console.log(event.target.value)
    console.log(new Date(event.target.value))
    this.setState({ daySelected: new Date(event.target.value)})
  }

  handleWear(event) {
    API.post("/garmentwears/", {
      //Axios to send and receive HTTP requests
      garment: event.target.attributes.value.value,
      scan_date: this.state.daySelected,
    })
      .then(this.props.refreshList())
      .catch((err) => console.log(err));
  }


  filterGarments(garments) {
    const filterGarments = garments.filter((garment) => {
      const aq_date = new Date(garment.purchase_date);
      const deaq_date = ((garment.deaq_date) ? new Date(garment.deaq_date) : null);
      return (aq_date <= this.state.daySelected & (this.state.daySelected <= deaq_date || !deaq_date));
    });
    return filterGarments;
}

  render() {
    return (
      <div className="wrapper stack pad-1 wd-max ht-full">
        <div className="ht-one-third ht-150-min">
          <WornToday 
            garmentWearList={this.props.garmentWearList}
            date={this.state.daySelected}
            onClick={this.handleDateClick}
            onChange={this.handleDatePick}/>
        </div>
        <div className="ht-two-thirds ht-225-min">
          <Wardrobe
          garmentList={this.filterGarments(this.props.garmentList)}
          onWear={this.handleWear}
          onChange={this.props.refreshList}
          />
        </div>
      </div>
    )
  }
}

export default Dashboard;
