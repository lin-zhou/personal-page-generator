import React, { Component } from "react";
import EducationCard from "./EducationCard";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: []
    }
  }

  componentDidMount() {
    this.setState({ schools: this.props.schools });
  }

  render() {
    let schools = [];
    if (this.state.schools) {
      this.state.schools.forEach(school => schools.push(school));
    }
    let educationList =
      <div className="education section">
        <div className="section-header">Education</div>
        {schools.map(school => <div key={school.org + "_" + school.degree}>
          <EducationCard school={school} />
        </div>)}
      </div>;

    return educationList;
  }

}

export default Education;