import React, { Component } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import GamePage from './pages/GamePage/GamePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import fire from "./fire";

fire.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('User is signed in');
  
    // ...
  } else {
    // User is signed out.
    // ...
    console.log('user is signed out');
   
  }
});
function PrivateRoute({ component: Component, ...rest }) {
 
  return (
    <Route
      {...rest}
      render={props =>
        fire.auth().currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

//need to add game as a protected route.
class App extends Component {
  render() {
    return (
      <div className="App">

      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <PrivateRoute path="/game" component={GamePage} />
          
          {/* <Route exact path="/game" component={GamePage} /> */}
          <Route path="/register" exact component={RegisterPage} />
        </Switch>
      </Router>
       
      </div>
    );
  }
}

export default App;
