import React, { Component } from "react";
import { authToken } from "../utilities.js";

import ResumeUpload from "./ResumeUpload.js";
import Login from "./Login.js";

class Home extends Component {
  render() {
    return authToken ? <ResumeUpload /> : <Login />;
  }
}

export default Home;