import React from 'react';
import "./DanceData.css"

class DanceData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }

  render() {
    return(
      <div className="dance-data-component">
        <h1 className="dance-data-header">Dance data</h1>
        <p className="dance-move">Dance Move: {this.props.danceMove}</p>
        {/*<p className="dance-position">Position: {this.props.position}</p>*/}
      </div>
    )
  }
}

export default DanceData;
