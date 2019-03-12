import React from "react";
import axios from "axios";
import PoseCard from "./PoseCard.jsx";

export default class PoseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poses: []
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(pose) {
    this.props.handleClick(pose, "add");
  }

  componentDidMount() {
    axios
      .get("/poses")
      .then(({ data }) => {
        console.log(data);
        this.setState({ poses: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="card-list">
        {this.state.poses.slice(0, 10).map(pose => {
          return <PoseCard handleClick={this.handleAdd} pose={pose} />;
        })}
      </div>
    );
  }
}
