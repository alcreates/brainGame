import React, { Component } from 'react';
import './App.css';
import Login from './pages/LoginPage/Login';
import Game from './pages/GamePage/Game';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


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
