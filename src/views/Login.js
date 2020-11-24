import React from "react";
import { Component } from "react";
import { setAuthToken, baseUrl } from "../utilities.js";

import "../css/Login.css";

// This is the page where the user uploads their resume to be parsed.
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badLogin: false,
      badRegister: false,
      failedLogin: false,
      failedRegister: false
    }
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

  login = (e) => {
    this.setState({ failedLogin: false });
    if (!this.state.username || !this.state.password) {
      this.setState({ badLogin: true });
    } else {
      this.setState({ badLogin: false });
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
          if (data.hasOwnProperty('access_token')) {
            setAuthToken(data.access_token);
            this.setState({ failedLogin: false });
          } else {
            this.setState({ failedLogin: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  register = (e) => {
    this.setState({ failedRegister: false });
    if (!this.state.firstname || !this.state.lastname || !this.state.username || !this.state.password || !this.state.email) {
      this.setState({ badRegister: true });
    } else {
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
              if (data.hasOwnProperty('access_token')) {
                setAuthToken(data.access_token);
                this.setState({ failedRegister: false });
              } else {
                this.setState({ failedRegister: true });
              }
            })
            .catch((err) => {
              console.log(err)
            });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="login-register view">
        <h1 className="login-title">Personal Website Generator</h1>
        <div className="login-register-container">
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
                  type="password"
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
              <p className="red-text">{this.state.badLogin && "Username and password cannot be empty."}</p>
              <p className="red-text">{this.state.failedLogin && "Incorrect username or password."}</p>
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
                  type="password"
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
              <p className="red-text">{this.state.badRegister && "Cannot register with empty fields."}</p>
              <p className="red-text">{this.state.failedRegister && "Something went wrong with your registration."}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
