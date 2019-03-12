import React from "react";
import axios from "axios";

export default class PoseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log("click");
    this.props.handleClick(this.props.pose);
  }

  render() {
    return (
      <div onClick={this.onClick} className="pose-card">
        <div className="sanskrit-name">{this.props.pose.sankrit_name}</div>
        <img src={this.props.pose.img_url} className="pose-card-img" />
        <div className="english-name">{this.props.pose.english_name}</div>
      </div>
    );
  }
}
