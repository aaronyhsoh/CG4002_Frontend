import React from 'react';
import "./EMGData.css"

class EMGData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 0,
      min: 0
    }
  }

  render() {
    return(
      <div className="emg-component">
        <h1 className="emg-header">EMG data</h1>
        <p className="emg-value">Value: {this.props.data}</p>
        <p className="emg-min-max">
          <text className="emg-min">Min: {this.props.emgMin}, </text>
          <text className="emg-max">Max: {this.props.emgMax}</text>
        </p>
        {/*<p className="emg-max">Max: {this.props.emgMax}*/}
      </div>
    )
  }
}

export default EMGData;