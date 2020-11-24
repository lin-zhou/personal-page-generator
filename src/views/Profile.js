import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseUrl, request, logout } from "../utilities.js";
import DeleteModal from "../components/Profile/DeleteModal.js";

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
      updating: false,
      deleting: false
    };

    this.openDelete = this.openDelete.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
  }

  componentDidMount() {
    // load the profile
    request(baseUrl + "/profile", {
      method: "GET",
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
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
    this.setState({ updating: true });
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
      .then((d) => {
        console.log(d);
        this.setState({ updating: false });
      })
      .catch((err) => console.log(err));
  };

  openDelete() {
    this.setState({ deleting: true });
  };

  closeDelete() {
    this.setState({ deleting: false });
  };

  delete = (e) => {
    request(baseUrl + "/profile", {
      method: "DELETE"
    }).then((d) => logout());
    this.setState({ deleting: false });
  }

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
              Please upload your resume <Link to="/">here</Link>.
            </div>
          )}
        <div className="edit-container">
          Edit your information here.
          <div className="profile__edit-info shadow-box">
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
                type="password"
                name="password"
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
              {!this.state.updating ? "Update" : "Updating..."}
            </button>
          </div>
        </div>
        <button className="delete-button custom-button" onClick={this.openDelete} >Delete Account</button>
        { this.state.deleting && <DeleteModal closeDelete={this.closeDelete} delete={this.delete} />}
      </div>
    );
  }
}

export default Profile;
