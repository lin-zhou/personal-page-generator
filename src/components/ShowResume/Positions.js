import React, { Component } from 'react';
import PositionCard from './PositionCard.js';

class Positions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: []
    }
  }

  componentDidMount() {
    this.setState({ positions: this.props.positions });
  }

  render() {
    let positionsList = "";
    if (this.props.positions) {
      let positions = [];
      if (this.state.positions) {
        this.state.positions.forEach(pos => positions.push(pos));
      }
      positionsList =
        <div className="positions section">
          <div className="section-header">Experience</div>
          {positions.map(pos => <div key={pos.org + "_" + pos.title + "_" + pos.start.timestamp}>
            <PositionCard position={pos} />
          </div>)}
        </div>;
    }

    return positionsList;
  }
}

export default Positions;