import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createGame } from '../../store/actions/game';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import fire from '../../fire';
import './GamePage.css';


export class Game extends Component {
  state = {
    data: '',
    score: 0,
    clicked: []
  }
  handleSubmit = () => {
    this.props.createGame(this.state);
  }
  handleClick = (id) => {
    
    if(!this.state.clicked.includes(id)){
      const newArr = this.shuffle(this.state.data);
      this.setState({
        clicked: [...this.state.clicked, id],
        score: this.state.score + 1,
        data: newArr
      }, ()=> {
          if(this.state.clicked.length == 15){
            alert('You win!')
          }
      })
    }else {
        alert('You lose!')
    }
    
  }
  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  handleEndGame = () =>{

  }
  componentDidMount (){
    const self = this;
    fire.database().ref('/cards').once('value').then(function(snapshot){
      
      const result = snapshot.val();
      const array = [];
      
      Object.keys(result).forEach((key) => {
        array.push(result[key]);
      });
      console.log(array)
      self.setState({data: array})
    })
   
  }
  render() {
    return (
      <div className="gamePage">
        <Header score={this.state.score}/>
        <div className="gameArea">
             { this.state.data ? 
                this.state.data.map(ele => {
                
                  return <Card handleClick={this.handleClick} id={ele.id} img={ele.url}/>
                })
                :
                ''
             }
              
              
              
        </div>
       
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
