import React, { Component } from "react";

class Summary extends Component {
  render() {
    return (
      <div className="section">
        <div className="section-header">Summary</div>
        <div>{this.props.expSummary}</div>
      </div>
    )
  }
}

export default Summary;