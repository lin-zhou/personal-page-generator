import React, { Component } from "react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      emails: [],
      phones: []
    }
  }

  componentDidMount() {
    this.setState({
      links: this.props.links,
      emails: this.props.emails,
      phones: this.props.phones
    });
  }

  render() {
    let contactInfo = "";
    if (this.props.links || this.props.emails || this.props.phones) {
      let links = [];
      if (this.state.links) {
        this.state.links.forEach(link => links.push(link));
      }

      let emails = [];
      if (this.state.emails) {
        this.state.emails.forEach(email => emails.push(email));
      }

      let phones = [];
      if (this.state.phones) {
        this.state.phones.forEach(phone => phones.push(phone));
      }

      contactInfo =
        <div className="contact section">
          <div className="section-header">Contact Info</div>
          <div className="contact-box shadow-box">
            {links.length > 0 &&
              <div>
                <b>Links</b>
                {links.map(link => <div key={link.url}>
                  {link.url}
                </div>)}
              </div>
            }
            {emails.length > 0 &&
              <div>
                <b>Emails</b>
                {emails.map(email => <div key={email.value}>
                  {email.value}
                </div>)}
              </div>
            }
            {phones.length > 0 &&
              <div>
                <b>Phone Numbers</b>
                {phones.map(phone => <div key={phone.value}>
                  {phone.value}
                </div>)}
              </div>
            }
          </div>
        </div>;
    }

    return contactInfo;
  }
}

export default Contact;