import React from 'react';
import SignIn from '../../components/auth/SignIn/SignIn';
import './Login.css';




class Login extends React.Component {
    state = {}

    render(){
        return(
        <div className="loginPage" > 
          <div className="welcome"> Welcome to Mind Circus</div>
          <div className="loginContainer">
          <SignIn/>
          </div>
        </div>)
    }
}


export default Login;