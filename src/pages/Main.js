import React from 'react';
import socketIOClient from "socket.io-client";
import _ from "../api/Constants";
import NewTable from "../components/NewTable";
import EMGData from "../components/EMGData";
import DanceData from "../components/DanceData";
import FunctionBar from "../components/FunctionBar";
import "./Main.css";
import GyroscopeTable from "../components/GyroscopeTable";
import ButtonAppBar from "../components/AppBar";
import LineGraph from "../components/LineGraph";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


const socket = socketIOClient(_.PORT.BACKEND);
let tick = 0;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //sensorData: [],
      emgData: [],
      danceData: {},
      gyroscopeData: [],
      emgMin: 0,
      emgMax: 0,
      stream: false,
      accelerometerData: []
    }

    this.websocketInit = this.websocketInit.bind(this);
    this.websocketDisconnect = this.websocketDisconnect.bind(this);
    this.toggleStream = this.toggleStream.bind(this);
  }

  websocketInit() {
    console.log("init websocket");
    socket.emit("connection_test", "Connected to port: " + "3000", error => {
      if (error) {
        alert(error);
      }
    });
    socket.on(this.props.dancer_id, data => {
      //console.log(this.props.dancer_id + ": " + JSON.stringify(data));
      const emgMin = (this.state.emgMin > data.emg_data.value) ? data.emg_data.value : this.state.emgMin;
      const emgMax = (this.state.emgMax < data.emg_data.value) ? data.emg_data.value : this.state.emgMax;
      const accelerometerData = {
        name: tick,
        x: data.sensor_data.x,
        y: data.sensor_data.y,
        z: data.sensor_data.z
      };
      const accelerometerDataArray = this.state.accelerometerData.concat([accelerometerData]);
      if (accelerometerDataArray.length > 50) {
        accelerometerDataArray.shift();
      }
      const emgData = {
        name: tick,
        emg: data.emg_data.value
      }
      const emgDataArray = this.state.emgData.concat([emgData]);
      if (emgDataArray.length > 50) {
        emgDataArray.shift();
      }
      //console.log("lineData: ", lineData);
      if (this.state.stream) {
        this.setState({
          //sensorData: data.sensor_data,
          danceData: data.dance_data,
          emgData: emgDataArray,
          gyroscopeData: [data.gyroscope_data],
          emgMin: emgMin,
          emgMax: emgMax,
          accelerometerData: accelerometerDataArray
        });
      }
    })
  }

  websocketDisconnect() {
    socket.disconnect(() => {
      console.log("Disconnecting socket..");
      console.log("Socket disconnected: ", socket.disconnected);
    })
  }

  componentDidMount() {
    this.websocketInit();
  }

  toggleStream() {
    const newState = !this.state.stream;
    console.log("new stream state: ", newState);
    this.setState({
      stream: newState
    })
  }

  downloadData() {

  }

  render() {
    const {accelerometerData, emgData, danceData, emgMin, emgMax, stream, gyroscopeData } = this.state;
    const positionData = {}

    return (
      <div>
        <ButtonAppBar
          user={this.props.dancer_id}
        />
        <FunctionBar
          stream={stream}
          toggleStream={this.toggleStream}
        />
        <div className="dance">
          <DanceData
            danceMove={danceData.dance_move}
            //position={danceData.position}
          />
        </div>
        <div className="emg">
          <ResponsiveContainer width="98%" height={300}>
          <LineChart data={emgData}>
            <XAxis dataKey="name" tick={false}/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Line
              legendType="none"
              type="monotone"
              dataKey="emg"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
        {/*<div className="emg">*/}
        {/*  <EMGData*/}
        {/*    data={emgData.value}*/}
        {/*    emgMin={emgMin}*/}
        {/*    emgMax={emgMax}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="tables">
          {/*<div className="accelerometer">*/}
          {/*  <NewTable*/}
          {/*    dancer_id={this.props.dancer_id}*/}
          {/*    data={sensorData}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="accelerometer">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accelerometerData}>
                <XAxis dataKey="name" tick={false} />
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line
                  type="monotone"
                  dataKey="x"
                  stroke="#8884d8"
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#82ca9d"
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="z"
                  stroke="#FF0000"
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="gyroscope">
            <GyroscopeTable
              dancer_id={this.props.dancer_id}
              data={gyroscopeData}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
