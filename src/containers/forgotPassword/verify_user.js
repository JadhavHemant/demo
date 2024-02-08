import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
//import FlatButton from 'material-ui/FlatButton';
// import decode from 'jwt-decode';
import ThemeDefault from '../../theme-default';
//import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
//import PersonAdd from 'material-ui/svg-icons/social/person-add';
//import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
//import {Link} from 'react-router';
// import APIS from '../../APIS/APIS';
const styles = {
    logo:{
width:48,
height:48,
margin:10
    },
    loginContainer: {
      minWidth: 320,
      maxWidth: 400,
      height: 'auto',
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      margin: 'auto'
    },
    paper: {
      padding: 20,
      margin: 10,
      overflow: 'auto'
    },
    buttonsDiv: {
      textAlign: 'center',
      padding: 10
    },
    flatButton: {
      color: grey500
    },
    checkRemember: {
      style: {
        float: 'left',
        maxWidth: 180,
        paddingTop: 5
      },
      labelStyle: {
        color: grey500
      },
      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
    },
    loginBtn: {
      float: 'right'
    },
    btn: {
      background: '#4f81e9',
      color: white,
      padding: 7,
      borderRadius: 2,
      margin: 2,
      fontSize: 13
    },
    btnFacebook: {
      background: '#4f81e9'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5
    },
  };

class verify_user extends Component {
    handleSubmit(e){
        e.preventDefault();
    let otp;
        otp=  document.getElementById("otp").value;
     if(otp === localStorage.getItem('otp')){
         this.props.router.push('/change_password/false');
     }  
     else{
         alert("wrong otp enter valid one");
         localStorage.removeItem('otp');
         

     }
    }
     
      render() {
          return (
              <MuiThemeProvider muiTheme={ThemeDefault}>
                  <div className="container">
                  <div style={styles.loginContainer}>
                      <div style={{display:'flex',alignItems: 'flex-end',}} className="row p-3"><img style={styles.logo} className="col-md-3 col-xs-3"  src={require('../../images/pcombinator.png')} /> <p className="col-md-8 col-xs-8 text-primary" style={{fontSize:'20px'}}>Passion Framework</p></div>
  
            <Paper style={styles.paper}>
  
              <form method="POST" onSubmit={(e)=>this.handleSubmit(e)} id="verify-form" >
                <TextField
                  hintText="Enter OTP Send to Mail" 
                  name="otp"
                  id="otp"
                  floatingLabelText="Enter OTP Send to Mail"
                  fullWidth={true}
                  required={true}
                  type="number"
                  max="999999"
                  min="100000"
                />
                {/* <TextField
                  hintText="Password"
                  name="password"
                  id="password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  required
                /> */}
  
                <div>
                  {/* <Checkbox
                    label="Show Password"
                    style={styles.checkRemember.style}
                    labelStyle={styles.checkRemember.labelStyle}
                    iconStyle={styles.checkRemember.iconStyle}
                    onClick={(e)=>{
                         this.state.password ?
                      document.getElementById('password').type="text":document.getElementById('password').type="password";
                         this.setState({password:!this.state.password});
                    }
                  }
                  /> */}
  
                  {/* <Link to="/"> */}
                    <RaisedButton label="Next"
                                  primary={true}
                                  type="submit"
                                  style={styles.loginBtn}/>
                 {/* / </Link> */}
                </div>
              </form>
            </Paper>
  
            {/* <div style={styles.buttonsDiv}>
            {/* <Link to="/register"> */}
              {/* <FlatButton
                label="Register"
                style={styles.flatButton}
                icon={<PersonAdd />}
                onClick={()=>{this.props.router.push('/register',{IsReferral:false})}}
              /> */}
            {/* </Link> */}
              {/* <FlatButton
                label="Forgot Password?"
                style={styles.flatButton}
                icon={<Help />}
                onClick={()=>{this.props.router.push('/forgot_password',{IsReferral:false})}}
  
              /> */}
              
            {/* </div>  */}
  
            {/* <div style={styles.buttonsDiv}>
              <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
                <i className="fa fa-facebook fa-lg"/>
                <span style={styles.btnSpan}>Log in with Facebook</span>
              </Link>
              <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
                <i className="fa fa-google-plus fa-lg"/>
                <span style={styles.btnSpan}>Log in with Google</span>
              </Link>
            </div> */}
          </div>
  
                  </div>
              </MuiThemeProvider>
          );
      }
}

export default verify_user;
