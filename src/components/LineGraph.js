import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip, CartesianGrid
} from 'recharts';

class LineGraph extends React.Component {

  constructor(props) {
    super(props);
    // We'll fill this out soon
  }

  render() {
    return (
      <div>
        <LineChart width={500} height={300} data={this.props.data}>
          {/*<CartesianGrid strokeDasharray="3 3" />*/}
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </div>
    );
  }
}

export default LineGraph;