import React, { Component } from 'react';
import './App.css';
import Login from './pages/LoginPage/LoginPage';
import Game from './pages/GamePage/GamePage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//need to add game as a protected route.
class App extends Component {
  render() {
    return (
      <div className="App">

      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/game" exact component={Game} />
        </Switch>
      </Router>
       
      </div>
    );
  }
}

export default App;
