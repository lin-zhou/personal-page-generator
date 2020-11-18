import React from "react";
import logo from "../assets/logo.svg";
import "../css/ResumeUpload.css";
import { Component } from "react";
import { baseUrl, upload } from "../utilities.js";

// This is the page where the user uploads their resume to be parsed.
class ResumeUpload extends Component {
  onFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };
  uploadResume = (e) => {
    const formData = new FormData();
    formData.append("resume", this.state.file);

    upload(`${baseUrl}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((d) => d.json())
      .then((d) => console.log(d))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="resume-upload">
        <header className="resume-upload-header">
          <img src={logo} className="rotating-logo" alt="logo" />
          <h1>Personal Website Generator</h1>
          <input type="file" onChange={this.onFileChange} />
          <button type="submit" onClick={this.uploadResume}>
            Upload Resume
          </button>
        </header>
      </div>
    );
  }
}

export default ResumeUpload;
