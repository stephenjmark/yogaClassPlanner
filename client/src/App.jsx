import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import PoseList from "./components/PoseList";
import SequenceBuilder from "./components/SequenceBuilder";
import ClassSelector from "./components/ClassSelector";
import LinkedList from "./linkedList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      selectedPoses: {},
      currentSequence: LinkedList(),
      currentClass: null,
      name: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.getSequence = this.getSequence.bind(this);
    this.saveClass = this.saveClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadClass = this.loadClass.bind(this);
  }

  saveClass(e) {
    e.preventDefault();
    let sequence = this.getSequence(this.state.currentSequence);
    axios
      .post("/classes", { name: this.state.name, sequence: sequence })
      .then(response => {
        console.log(response);
        this.setState({
          selectedPoses: {},
          currentSequence: LinkedList(),
          currentClass: null,
          name: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick(pose, e) {
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

  //transform linked list into sequence object
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

  loadClass(selectedClass) {
    //transform class into linked list
    //store into selected poses
    console.log(selectedClass.name);
    let loadedSequence = {};
    selectedClass.sequence.forEach(item => {
      loadedSequence[item._id] = this.state.currentSequence.addToTail(item);
    });
    this.setState({
      selectedPoses: loadedSequence,
      currentSequence: this.state.currentSequence,
      name: selectedClass.name
    });
  }

  getClasses() {
    axios
      .get("/classes")
      .then(({ data }) => {
        console.log(data);
        this.setState({ classes: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  componentDidMount() {
    this.getClasses();
  }

  render() {
    return (
      <div className="class-builder">
        <ClassSelector
          className="column"
          loadClass={this.loadClass}
          classes={this.state.classes}
        />
        <PoseList className="column" handleClick={this.handleClick} />
        <SequenceBuilder
          className="column"
          handleClick={this.handleClick}
          poses={this.getSequence(this.state.currentSequence)}
        />
        <form onSubmit={this.saveClass} className="column">
          <h3>Class Name: </h3>

          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button>Save Class</button>
        </form>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
