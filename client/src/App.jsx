import React from "react";
import ReactDOM from "react-dom";
import PoseList from "./components/PoseList";
import SequenceBuilder from "./components/SequenceBuilder";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      currentSequence: {},
      currentClass: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(pose, e) {
    if (e === "add") {
      let sequence = this.state.currentSequence;
      sequence[pose._id] = pose;
      this.setState({ currentSequence: sequence });
    }
    if (e === "remove") {
      let sequence = this.state.currentSequence;
      delete sequence[pose._id];
      this.setState({ currentSequence: sequence });
    }
  }

  render() {
    return (
      <div className="class-builder">
        <PoseList handleClick={this.handleClick} />
        <SequenceBuilder
          handleClick={this.handleClick}
          poses={Object.values(this.state.currentSequence)}
        />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
