import React from "react";
import { Component } from "react";
import { setAuthToken, baseUrl } from "../utilities.js";

import "../css/Login.css";

// This is the page where the user uploads their resume to be parsed.
class Login extends Component {
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

  login = (e) => {
    fetch(baseUrl + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthToken(data.access_token);
      })
      .catch((err) => console.log(err));
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
      .then((d) => {
        fetch(baseUrl + "/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setAuthToken(data.access_token);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="login-register view">
        <div className="login half-gap shadow-box">
          <h1>Login</h1>
          <div className="login-form">
            <div className="edit-info__field margin-bottom-15">
              <label for="username">User Name</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="username"
                onChange={this.changeUsername}
              />
            </div>
            <div className="edit-info__field margin-bottom-15">
              <label for="password">Password</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="email"
                onChange={this.changePassword}
              />
            </div>
            <button
              className="custom-button"
              type="submit"
              onClick={this.login}
            >
              Login
            </button>
          </div>
        </div>
        <div className="register half-gap shadow-box">
          <h1>Register</h1>
          <div className="login-form">
            <div className="edit-info__field margin-bottom-15">
              <label for="firstname">First Name</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="firstname"
                onChange={this.changeFirstName}
              />
            </div>
            <div className="edit-info__field margin-bottom-15">
              <label for="lastname">Last Name</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="lastname"
                onChange={this.changeLastName}
              />
            </div>
            <div className="edit-info__field margin-bottom-15">
              <label for="username">User Name</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="username"
                onChange={this.changeUsername}
              />
            </div>
            <div className="edit-info__field margin-bottom-15">
              <label for="password">Password</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="email"
                onChange={this.changePassword}
              />
            </div>
            <div className="edit-info__field margin-bottom-15">
              <label for="email">Email</label>
              <br />
              <input
                className="edit-info__input"
                type="string"
                name="email"
                onChange={this.changeEmail}
              />
            </div>
            <button
              className="custom-button"
              type="submit"
              onClick={this.register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
