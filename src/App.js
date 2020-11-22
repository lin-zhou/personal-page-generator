import React from "react";

import ResumeUpload from "./views/ResumeUpload.js";
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import ShowResume from "./views/ShowResume.js";
import Profile from "./views/Profile.js"
import Search from './views/Search.js'
import { authToken } from "./utilities.js";

import "./css/App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link className="navbar__item" to="/">Home</Link>
          <Link className="navbar__item" to="/login">Login</Link>
          <Link className="navbar__item" to="/register">Register</Link>
          <Link className="navbar__item" to="/upload">Upload</Link>
          <Link className="navbar__item" to="/profile">Profile</Link>
          <Link className="navbar__item" to="/search">Search</Link>

        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/upload">
            <ResumeUpload />
          </Route>
          <Route path="/resume/:id">
            <ShowResume />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/Search">
            <Search />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
