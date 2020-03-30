import MUIDataTable from "mui-datatables";
import React from 'react';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
// import socketIOClient from "socket.io-client";
import _ from "../api/Constants";
import "./NewTable.css"
import Button from "@material-ui/core/Button";
// const socket = socketIOClient(_.PORT.BACKEND);

class GyroscopeTable extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data : []
    // }
    // this.websocketInit = this.websocketInit.bind(this);
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      // MUIDataTable: {
      //   paper: {
      //     height: 'inherit',
      //   },
      //   responsiveScroll: {
      //     maxHeight: window.height,
      //     height: 'calc(100% - 128px)'
      //   }
      // },
      MUIDataTableBodyCell: {
        root: {
          //backgroundColor: "#bdc8c8"
        }
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          //backgroundColor: '#bdc8c8',
          fontSize: '1rem',
          fontWeight: 'bold'
        }
      },
      MUIDataTableSelectCell: {
        root: {
          //backgroundColor: '#bdc8c8'
        }
      },
      // MuiTableRow: {
      //   root: {
      //     backgroundColor: "#bdc8c8"
      //   }
      // },
      MUIDataTableToolbar: {
        titleText: {
          fontWeight: 'bold',
          fontSize: '2.2rem'
        }
      }
    }
  })

  // websocketInit() {
  //   console.log("init websocket");
  //   socket.emit("connection_test", "Connected to port: "+ "3000", error => {
  //     if (error) { alert(error) ; }
  //   });
  //   socket.on(this.props.dancer_id, data => {
  //     console.log(this.props.dancer_id + ": " + JSON.stringify(data));
  //     this.setState({
  //       data: data
  //     });
  //   })
  // }
  //
  // websocketDisconnect() {
  //   socket.disconnect(() => {
  //     console.log("Disconnecting socket..");
  //     console.log("Socket disconnected: ", socket.disconnected);
  //   })
  // }

  // componentDidMount() {
  //   //this.websocketInit();
  // }

  render() {
    //const { data } = this.state;

    const columns = [
      {
        name: "x",
        label: "X",
        options: {
          filter: false,
          sort: false,
        }
      },
      {
        name: "y",
        label: "Y",
        options: {
          filter: false,
          sort: false,
        }
      },
      {
        name: "z",
        label: "Z",
        options: {
          filter: false,
          sort: false,
        }
      }
    ];

    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      selectableRows: 'none',
      filter: false,
      responsive: 'scrollMaxHeight',
      fixedHeader: true,
      rowsPerPageOptions: {},
      pagination: false,
      search: false
    };
    return (
      <div className="sensor_table">
        {/*<Button onClick={() => this.websocketInit()}>Connect</Button>*/}
        {/*<Button onClick={() => this.websocketDisconnect()}>Disconnect</Button>*/}
        <MuiThemeProvider theme={this.getMuiTheme()}>

          <MUIDataTable
            title={"Gyroscope"}
            data={this.props.data}
            columns={columns}
            options={options}/>
        </MuiThemeProvider>
      </div>


    )
  }
}

export default GyroscopeTable;