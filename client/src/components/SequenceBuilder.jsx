import React from "react";
import axios from "axios";
import PoseCard from "./PoseCard.jsx";

export default class SequenceBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPose: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.removePose = this.removePose.bind(this);
    this.insertUp = this.insertUp.bind(this);
    this.insertDown = this.insertDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  removePose() {
    this.props.handleClick(this.state.selectedPose, "remove");
    this.setState({ selectedPose: null });
  }

  insertUp() {
    this.props.handleClick(this.state.selectedPose, "insertUp");
  }

  insertDown() {
    this.props.handleClick(this.state.selectedPose, "insertDown");
  }

  handleSelect(pose) {
    this.setState({ selectedPose: pose });
  }

  handleKeyPress(e) {
    if (e.key === "x") this.removePose();
    if (e.key === "w") this.insertUp();
    if (e.key === "s") this.insertDown();
  }

  render() {
    return (
      <div className="card-list" onKeyPress={this.handleKeyPress} tabIndex="0">
        {this.props.poses.slice(0, 10).map(pose => {
          let selected = this.state.selectedPose;
          if (selected) {
            if (selected._id === pose._id)
              return (
                <PoseCard
                  selected={true}
                  handleClick={this.handleSelect}
                  pose={pose}
                />
              );
          }
          return (
            <PoseCard
              selected={false}
              handleClick={this.handleSelect}
              pose={pose}
            />
          );
        })}
      </div>
    );
  }
}
