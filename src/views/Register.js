import React from "react";
import "../css/ResumeUpload.css";
import { Component } from "react";
import { baseUrl } from "../utilities";

// This is the page where the user uploads their resume to be parsed.
class Register extends Component {
  changeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  changeFirstName = (e) => {
    this.setState({ firstname: e.target.value });
  };
  changeLastName = (e) => {
    this.setState({ lastname: e.target.value });
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  register = (e) => {
    fetch(baseUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
      }),
    })
      .then((d) => console.log(d))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="Register">
        <h1>Register</h1>
        Username: <input type="string" onChange={this.changeUsername} />
        Password: <input type="string" onChange={this.changePassword} />
        Email <input type="string" onChange={this.changeEmail} />
        First Name: <input type="string" onChange={this.changeFirstName} />
        Last Name: <input type="string" onChange={this.changeLastName} />
        <button type="submit" onClick={this.register}>
          Register
        </button>
      </div>
    );
  }
}

export default Register;
