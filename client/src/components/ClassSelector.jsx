import React from "react";
import axios from "axios";

export default class ClassSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let selectedClass = JSON.parse(e.target.value);
    this.props.loadClass(selectedClass);
  }

  render() {
    return (
      <div className="card-list">
        <h1>Classes: </h1>
        {this.props.classes.map(item => {
          return (
            <button value={JSON.stringify(item)} onClick={this.handleClick}>
              {item.name}
            </button>
          );
        })}
      </div>
    );
  }
}
