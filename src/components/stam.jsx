import React, { Component } from "react";
class Stam extends Component {
  state = {
    count: 0
  };
  render() {
    return (
      <React.Fragment>
        <span>{this.state.count} </span>
        <button> Incremnt</button>
      </React.Fragment>
    );
  }
}

export default Stam;
