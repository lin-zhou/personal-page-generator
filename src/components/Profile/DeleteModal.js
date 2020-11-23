import React, { Component } from "react";

import "../../css/Profile.css";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="delete-modal-container">
        <div className="grayout" />
        <div className="delete-modal shadow-box">
          <div className="delete-prompt">Are you sure you want to delete your account? Your account cannot be recovered once it's deleted.</div>
          <div className="delete-buttons">
            <button className="custom-button" onClick={this.props.closeDelete}>Cancel</button>
            <button className="custom-button delete-button" onClick={this.props.delete}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteModal;