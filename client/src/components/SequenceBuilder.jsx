import React from "react";
import axios from "axios";
import PoseCard from "./PoseCard.jsx";

export default class SequenceBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poses: []
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(pose) {
    this.props.handleClick(pose, "remove");
  }

  componentDidMount() {
    // axios
    //   .get("/poses")
    //   .then(({ data }) => {
    //     console.log(data);
    //     this.setState({ poses: data });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    return (
      <div className="card-list">
        {this.props.poses.slice(0, 10).map(pose => {
          return <PoseCard handleClick={this.handleRemove} pose={pose} />;
        })}
      </div>
    );
  }
}
