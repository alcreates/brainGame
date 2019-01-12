import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    button: {
        margin: theme.spacing.unit,
      },
   
  });
  

class SignIn extends Component {
    state = {}
  handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    }, ()=>{ console.log(this.state)})
  }
  handleSubmit = () => {
      alert("sign in works")
  }
  render() {
    const { classes } = this.props;
    return (
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="UserName"
          name= "name"
          className={classes.textField}
          value={this.state.name}
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
        />
        <Button onClick={this.handleSubmit} variant="contained" className={classes.button}>
        Sign In 
      </Button>
       
      </form>
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

