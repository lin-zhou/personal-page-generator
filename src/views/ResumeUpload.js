import React from "react";
import logo from "../assets/logo.svg";
import "../css/ResumeUpload.css";
import { Component } from "react";
import { baseUrl, upload, request } from "../utilities.js";

// This is the page where the user uploads their resume to be parsed.
class ResumeUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uploading: false,
    };
  }

  onFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  uploadResume = (e) => {
    if (this.state.file) {
      const formData = new FormData();
      formData.append("resume", this.state.file);

      this.setState({ uploading: true });

      upload(`${baseUrl}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((d) => d.json())
        .then((d) => {
          this.setState({ uploading: false });
          request(baseUrl + "/profile", {
            method: "GET",
          })
            .then((p) => p.json())
            .then((p) => window.location.replace("/resume/" + p.id));
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="upload view">
        <header className="upload__header">
          <img src={logo} className="rotating-logo" alt="logo" />
          <h1>Personal Website Generator</h1>
          <input
            className="upload__input"
            type="file"
            accept="application/pdf"
            onChange={this.onFileChange}
          />
          {this.state.file ? (
            ""
          ) : (
              <p className="normal-font">Please select a PDF of your resume.</p>
            )}
          <button
            disabled={!this.state.file}
            className="upload__button custom-button"
            type="submit"
            onClick={this.uploadResume}
          >
            {!this.state.uploading ? "Upload Resume" : "Uploading..."}
          </button>
        </header>
      </div>
    );
  }
}

export default ResumeUpload;
