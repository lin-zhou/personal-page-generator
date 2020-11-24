import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { baseRegular, baseUrl, request } from "../utilities.js";

import "../css/Search.css";

library.add(faSearch)

let interval = null

// This is the page where the user uploads their resume to be parsed.
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      users: []
    }
  }

  changeSearch = (e) => {
    if (e.target.value.length <= 0) return

    const v = e.target.value;
    this.setState({ query: v });
    const getResults = () => {
      request(baseUrl + "/autocomplete/" + v).then(d => d.json()).then(d => { this.setState(d) })
    }

    clearTimeout(interval)
    interval = setTimeout(getResults, 250)
  };

  goToRandom() {
    fetch(`${baseUrl}/random`)
      .then((d) => d.json())
      .then((d) => window.location.replace(baseRegular + `resume/${d.id}`));
  };

  render() {
    return (
      <div className="search view">
        <div className="shadow-box search-container">
          <h1>Search</h1>
          <p>Search for users by first or last name, or take a look at a random user's resume!</p>
          <div className="search-or-random">
            <div className="search-bar">
              <FontAwesomeIcon icon="search" /><input className="search-box" type="string" onChange={this.changeSearch} />
            </div>
            <button className="custom-button" onClick={this.goToRandom}>Random Resume!</button>
          </div>
          {(this.state.users && this.state.users.length > 0) ?
            <ul>{this.state.users.map(d => {
              return <li key={d.id}><Link to={`/resume/${d.id}`}>{`${d.firstname} ${d.lastname}`}</Link></li>
            })}
            </ul>
            :
            <p>
              {this.state.query !== "" ?
                "No users with names containing your query." :
                ""
              }
            </p>
          }
        </div>
      </div>
    );
  }
}

export default Search;
