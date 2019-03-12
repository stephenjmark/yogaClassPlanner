import React from "react";
import ReactDOM from "react-dom";
import PoseList from "./components/PoseList";
import SequenceBuilder from "./components/SequenceBuilder";
import LinkedList from "./linkedList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      selectedPoses: {},
      currentSequence: LinkedList(),
      currentClass: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(pose, e, earlierPose) {
    let selected = this.state.selectedPoses;
    let sequence = this.state.currentSequence;
    if (e === "add") {
      if (!selected[pose._id]) {
        let node = sequence.addToTail(pose);
        selected[pose._id] = node;
        this.setState({ selectedPoses: selected, currentSequence: sequence });
      }
    }
    if (e === "remove") {
      if (Object.values(selected).length === 1) {
        this.setState({
          selectedPoses: {},
          currentSequence: LinkedList()
        });
      } else {
        if (!selected[pose._id].previous)
          sequence.head = selected[pose._id].next;
        selected[pose._id].remove();
        delete selected[pose._id];
        this.setState({
          currentSequence: sequence
        });
      }
    }

    if (e === "insertUp") {
      let card = selected[pose._id];
      if (card.previous !== null)
        if (card.previous.previous === null) {
          card.insertBefore(sequence);
          this.setState({
            currentSequence: sequence
          });
        } else {
          card.insertBefore();
          this.setState({ currentSequence: sequence });
        }
    }

    if (e === "insertDown") {
      let card = selected[pose._id];
      if (card.next !== null)
        if (card.previous === null) {
          card.insertAfter(sequence);
        } else card.insertAfter();

      this.setState({ currentSequence: sequence });
    }
  }

  getSequence(list) {
    let sequence = [];
    const iterate = node => {
      sequence.push(node.value);
      if (node.next === null) return;
      else iterate(node.next);
    };
    if (list.head) iterate(list.head);
    return sequence;
  }

  render() {
    return (
      <div className="class-builder">
        <PoseList handleClick={this.handleClick} />
        <SequenceBuilder
          handleClick={this.handleClick}
          poses={this.getSequence(this.state.currentSequence)}
        />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
