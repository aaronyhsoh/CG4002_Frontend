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

const socket = socketIOClient(_.PORT.BACKEND);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorData: [],
      emgData: {},
      danceData: {},
      gyroscopeData: [],
      emgMin: 0,
      emgMax: 0,
      stream: false
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
      console.log(this.props.dancer_id + ": " + JSON.stringify(data));
      const emgMin = (this.state.emgMin > data.emg_data.value) ? data.emg_data.value : this.state.emgMin;
      const emgMax = (this.state.emgMax < data.emg_data.value) ? data.emg_data.value : this.state.emgMax;

      if (this.state.stream) {
        this.setState({
          sensorData: data.sensor_data,
          danceData: data.dance_data,
          emgData: data.emg_data,
          gyroscopeData: data.gyroscope_data,
          emgMin: emgMin,
          emgMax: emgMax
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
    const {sensorData, emgData, danceData, emgMin, emgMax, stream, gyroscopeData} = this.state;

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
            position={danceData.position}
          />
        </div>
        <div className="emg">
          <EMGData
            data={emgData.value}
            emgMin={emgMin}
            emgMax={emgMax}
          />
        </div>
        <div className="tables">
          <div className="accelerometer">
            <NewTable
              dancer_id={this.props.dancer_id}
              data={sensorData}
            />
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