import React, { Component } from "react";

class Skills extends Component {
  render() {
    if (this.props.skills) {
      return (
        <div className="section">
          <div className="section-header">Skills</div>
          <div className="shadow-box">{this.props.skills}</div>
        </div>
      )
    } else {
      return "";
    }
  }
}

export default Skills;