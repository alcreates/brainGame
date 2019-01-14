
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import fire from '../../../fire';
import './Register.css';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 90+ "%",
    },
    button: {
        margin: theme.spacing.unit,
        float: "right",
        fontFamily: 'circus',
        color: 'white',
        backgroundColor: '#1C71A7'
      },
   
  });
  

class Register extends Component {
    state = {}
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
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user)=>{
        this.setState({
            redirect: true
          })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if( errorCode || errorMessage){
        alert(errorCode)
      }
    
    
    });
    
  }
  render() {
    const { classes } = this.props;
    return (
        <div className="registerPage">
              {this.renderRedirect() }
            <div className="regForm">
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
               
                    <TextField
                    id="password"
                    label="Password"
                    name= "password"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChange}
                    margin="normal"
                    onKeyPress={this.handleKeyPress} 
                    />
                </div>
           
                <div>
                    
                    <Button onClick={this.handleSubmit} variant="contained" className={classes.button}>
                    Submit
                    </Button>
                </div>

            </div>
          
      </div>
    )
  }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
  
export default connect(mapStateToProps)(withStyles(styles)(Register));


