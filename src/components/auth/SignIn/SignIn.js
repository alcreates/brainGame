import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import fire from '../../../fire';
import './Login.css';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 100+ "%",
    },
    button: {
        margin: theme.spacing.unit,
        float: "right",
        fontFamily: 'circus',
        color: 'white',
        backgroundColor: '#1C71A7'
      },
   
  });
  

class SignIn extends Component {
    state = {
      redirect: false
    }
  handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    }, ()=>{ console.log(this.state)})
  }
  renderRedirect(){
    if(this.state.redirect){
      return <Redirect to='/game' />
    }
  
  }
  handleKeyPress = (event)=> {
    if(event.key == 'Enter'){
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    console.log("in handle submit")
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
     
        
      this.setState({
        redirect: true
      })
     
        //redirect the user to protected game route
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorMessage){
        alert(errorMessage)
      }
      console.log('signed in');
      // ...
    });
    
  }
  render() {
    const { classes } = this.props;
    return (
        <div className="login">
          {this.renderRedirect() }
            <div className="loginTitle">Login</div>
           <div>
            <TextField
              id="standard-name"
              label="Email"
              name= "email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              name= "password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              margin="normal"
              onKeyPress={this.handleKeyPress} 
              type="password"
            />
          </div>
          <div>
            <Link className="reg" to="/register">Register</Link>
          </div>
          <div>
            
            <Button onClick={this.handleSubmit} variant="contained" className={classes.button}>
               Sign In 
            </Button>
          </div>
          
      </div>
    )
  }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
  
export default connect(mapStateToProps)(withStyles(styles)(SignIn));

