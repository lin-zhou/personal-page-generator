import React, { Component } from "react";
import { baseUrl } from "../utilities";
import { Link } from "react-router-dom";
import { request } from "../utilities.js";

import "../css/Profile.css";

// This is the page where the user uploads their resume to be parsed.
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      parsedresume: null,
      id: 0,
    };
  }

  componentDidMount() {
    // load the profile
    request(baseUrl + "/profile", {
      method: "GET",
    })
      .then((d) => d.json())
      .then((d) => {
        console.log("d", d);
        this.setState({ ...d, loaded: true });
      });
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
    return (
      <div className="profile view">
        <h1>Profile</h1>
        {this.state.parsedresume ? (
          <div>
            Check out your generated personal{" "}
            <Link to={`/resume/${this.state.id}`}>website</Link>!
          </div>
        ) : (
          <div>
            Please upload your resume <Link to="/">here</Link>
          </div>
        )}
        <div className="edit-container">
          <div className="profile__edit-info shadow-box">
            Edit your information here.
            <div className="edit-info__field">
              <label htmlFor="firstname">First Name</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="firstname"
                value={this.state.firstname}
                onChange={this.changeFirstName}
              />
            </div>
            <div className="edit-info__field">
              <label htmlFor="lastname">Last Name</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="lastname"
                value={this.state.lastname}
                onChange={this.changeLastName}
              />
            </div>
            <div className="edit-info__field">
              <label htmlFor="username">User Name</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="username"
                value={this.state.username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="edit-info__field">
              <label htmlFor="password">Password</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="email"
                value={this.state.password}
                onChange={this.changePassword}
              />
            </div>
            <div className="edit-info__field">
              <label htmlFor="email">Email</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="email"
                value={this.state.email}
                onChange={this.changeEmail}
              />
            </div>
            <button
              className="edit-info__button custom-button"
              type="submit"
              onClick={this.update}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
