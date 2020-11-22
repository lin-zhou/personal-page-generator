import React from "react";

import Home from "./views/Home.js";
import ResumeUpload from "./views/ResumeUpload.js";
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
          <div className="navbar__buttons">
            <Link className="navbar__item" to="/">Home</Link>
            <Link className="navbar__item" to="/profile">Profile</Link>
            <Link className="navbar__item" to="/search">Search</Link>
          </div>
        </nav>

        <Switch>
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

export default App;
