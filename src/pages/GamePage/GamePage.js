import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createGame } from '../../store/actions/game'

export class Game extends Component {
  state = {
    sample: "this is sample data"
  }
  handleSubmit = () => {
    this.props.createGame(this.state);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>test</button>
        This is our game page
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGame: (game) => dispatch(createGame(game))
  }
}



export default connect(null, mapDispatchToProps)(Game);
