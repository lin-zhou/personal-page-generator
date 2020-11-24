import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../css/ResumeUpload.css";
import { Component } from "react";
import { baseUrl, upload, request, baseRegular } from "../utilities.js";

library.add(faUserCircle)

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
            .then((p) => window.location.replace(baseRegular + "resume/" + p.id));
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="upload view">
        <header className="upload__header">
          <FontAwesomeIcon icon="user-circle" className="rotating-logo" />
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
