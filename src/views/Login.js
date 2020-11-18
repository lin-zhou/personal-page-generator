import React from "react";
import { Component } from "react";
import { setAuthToken, baseUrl } from "../utilities.js";

// This is the page where the user uploads their resume to be parsed.
class Login extends Component {
  changeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
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

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        Username: <input type="string" onChange={this.changeUsername} />
        Password: <input type="string" onChange={this.changePassword} />
        <button type="submit" onClick={this.login}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
