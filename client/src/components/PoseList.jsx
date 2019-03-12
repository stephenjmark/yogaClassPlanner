import React from "react";
import axios from "axios";

export default class PoseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poses: []
    };
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
    return this.state.poses.map(pose => {
      return <PoseCard pose={pose} />;
    });
  }
}
