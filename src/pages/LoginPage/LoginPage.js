import React from 'react';
import SignIn from '../../components/auth/SignIn/SignIn';
import './Login.css';




class Login extends React.Component {
    state = {}

    render(){
        return(
        <div className="loginContainer"> 
          <SignIn/>
         </div>)
    }
}


export default Login;