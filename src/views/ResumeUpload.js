import React from 'react';
import logo from '../assets/logo.svg';
import '../css/ResumeUpload.css';

// This is the page where the user uploads their resume to be parsed.
function ResumeUpload() {
  return (
    <div className="resume-upload">
      <header className="resume-upload-header">
        <img src={logo} className="rotating-logo" alt="logo" />
        <h1>Personal Website Generator</h1>
        <p>[TODO: Resume PDF upload here.]</p>
      </header>
    </div>
  );
}

export default ResumeUpload;
