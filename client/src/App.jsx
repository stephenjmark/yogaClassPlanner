import React from "react";
import ReactDOM from "react-dom";
import PoseList from "./components/PoseList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      currentClass: null
    };
  }

  render() {
    return (
      <div>
        <PoseList />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
