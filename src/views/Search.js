import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseUrl, request } from "../utilities.js";

import "../css/Search.css";

let interval = null

// This is the page where the user uploads their resume to be parsed.
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { users: [] }
  }

  changeSearch = (e) => {
    if (e.target.value.length <= 0) return

    const v = e.target.value
    const getResults = () => {
      request(baseUrl + "/autocomplete/" + v).then(d => d.json()).then(d => { this.setState(d) })
    }

    clearTimeout(interval)
    interval = setTimeout(getResults, 250)
  };

  render() {
    return (
      <div className="search">
        <h1 className="search-container">Search: <input className="search-box" type="string" onChange={this.changeSearch} /></h1>
        <ul>{this.state.users.map(d => {
          return <li key={d.id}><Link to={`/resume/${d.id}`}>{`${d.firstname} ${d.lastname}`}</Link></li>
        })}
        </ul>
      </div>
    );
  }
}

export default Search;
