import React, { Component } from "react";

class Skills extends Component {
  render() {
    return (
      <div className="section">
        <div className="section-header">Skills</div>
        <div className="shadow-box">{this.props.skills}</div>
      </div>
    )
  }
}

export default Skills;