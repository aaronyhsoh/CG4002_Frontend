import React from 'react';
import Login from "../components/Login";
import Main from "./Main";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isLoggedIn: false
    }
    this.login = this.login.bind(this);
  }

  login() {
    console.log("Logging in 2")
    this.setState({
      isLoggedIn: true
    })
  }

  render() {
    const {isLoggedIn} = this.state;

    return(
      <div>
        isLoggedIn ?
        <Main/>
        :
        <Login
          login={this.login}
        />
      </div>
    )
  }
}

export default SignIn;