import React from 'react';
import './App.css';
import Main from "./pages/Main";
import ButtonAppBar from "./components/AppBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import SignIn from "./components/Login";

function App() {

  return (
    <div className="App">

      <div className="content">
        <SignIn/>
      </div>
    </div>


  );
}

export default App;
