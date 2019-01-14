import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createGame } from '../../store/actions/game';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import fire from '../../fire';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import './GamePage.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: '#A5885B',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});


export class Game extends Component {
  state = {
    data: '',
    score: 0,
    clicked: [],
    showModal: false
  }
  handleSubmit = () => {
    this.props.createGame(this.state);
  }
  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };
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
            this.handleEndGame()
          }
      })
    }else {
        alert('You lose!')
         
          this.handleEndGame()
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
    
    const user = fire.auth().currentUser;
    const self = this;
  
    fire.database().ref('/game').push({
      username: user.email,
      score: self.state.score
    }).then( res => {
      const ref = fire.database().ref("game");
      ref.orderByChild("score").startAt(0).limitToLast(6).once("value", function(snapshot) {
        const result = snapshot.val();
        
        const array = [];
        
        Object.keys(result).forEach((key) => {
          array.push(result[key]);
        });
        function compare(a, b){
          return   b.score - a.score ;
        }
        const sorted = array.sort(compare) 
         
        self.setState({highScores : sorted, score: 0, showModal: true, clicked: []}, ()=> {
            console.log(self.state)
        })
      });
      
    });
  }
  componentDidMount (){
    const self = this;
    fire.database().ref('/cards').once('value').then(function(snapshot){
      
      const result = snapshot.val();
      const array = [];
      
      Object.keys(result).forEach((key) => {
        array.push(result[key]);
      });
     
      self.setState({data: array})
    })
   
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="gamePage">
        <Header score={this.state.score}/>
        <div className="gameArea">
             { this.state.data ? 
                this.state.data.map((ele,index) => {
                
                  return <Card key={index} handleClick={this.handleClick} id={ele.id} img={ele.url}/>
                })
                :
                ''
             }
              
              
              
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.showModal}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h2 className="highScoreTitle">High Scores</h2>
             {this.state.highScores ? 
              this.state.highScores.map(ele => {
                return (
                <div className="scores">
                  <div>player: {ele.username}</div>
                  <div>Score: {ele.score}</div>
                </div>)
              })
              :
              ''
            }
          </div>
        </Modal>
       
      </div>
    )
  }
}



export default withStyles(styles)(Game);
