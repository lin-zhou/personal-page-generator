import React from "react";
import "../css/ResumeUpload.css";
import { Component } from "react";
import { baseUrl } from "../utilities";
import { Link } from "react-router-dom";
import { request } from "../utilities.js"

// This is the page where the user uploads their resume to be parsed.
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false, username: '', password: '', firstname: '', lastname: '', email: '', id: 0 };
  }

  componentDidMount() {
    // load the profile
    request(baseUrl + "/profile", {
      method: "GET",
    }).then(d => d.json()).then(d => {
      this.setState({ ...d, loaded: true })
    })
  }

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

  update = (e) => {
    request(baseUrl + "/profile", {
      method: "POST",
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
    return (<div className="Profile">
      <h1>Profile</h1>
      <Link to={`/resume/${this.state.id}`}>Resume</Link>
        Username: <input type="string" value={this.state.username} onChange={this.changeUsername} />
        Password: <input type="string" value={this.state.password} onChange={this.changePassword} />
        Email <input type="string" value={this.state.email} onChange={this.changeEmail} />
        First Name: <input type="string" value={this.state.firstname} onChange={this.changeFirstName} />
        Last Name: <input type="string" value={this.state.lastname} onChange={this.changeLastName} />
      <button type="submit" onClick={this.update}>
        Update
        </button>
    </div>
    );
  }
}

export default Profile;
