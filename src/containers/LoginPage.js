import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import decode from 'jwt-decode';
import ThemeDefault from '../theme-default';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
//import {Link} from 'react-router';
import APIS from '../APIS/APIS';


// const LoginPage = () => {
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
 class LoginPage extends Component {
  
  constructor(props){
    super(props);
    console.log(this.props.router);
    this.state= {echo_systems:[],password:true};
   this.handleSubmit = this.handleSubmit.bind(this);
    //this.props.history.push('/register');
   //this.validateForm = this.validateForm.bind(this); 
   this.get_echo_system = this.get_echo_system.bind(this);
  }

  componentDidMount(){
    // this.props.router.push('/demo');
    this.get_echo_system();

    if(localStorage.getItem('Authentication')== 'true'){
    this.props.router.replace('/dashboard');
  //  alert('success');
  }
   else{
    //alert('fail');
    this.props.router.push('/');

   }

  }
  validateForm(){
    return true;
  } 
  handleSubmit(e){
    e.preventDefault();
    if(this.validateForm()){
     const formData = new FormData(document.getElementById('login-form'));
      fetch(APIS.baseurl+APIS.user_op+"/0/2",{method:'POST',body:formData}).then(response=>{response.json().then(res=>{
     //    alert(res.status);   
       if(res.status == 200 ){
        localStorage.setItem("token",res.user_details[0].users_id);
        localStorage.setItem("email",res.user_details[0].mentors_email_address);
        localStorage.setItem('firstname',res.user_details[0].mentors_firstname);
        localStorage.setItem('lastname',res.user_details[0].mentors_lastname);
        localStorage.setItem('user_type',res.user_details[0].user_type);
     //   alert(res.user_details[0].user_type);
        localStorage.setItem('member_obj', JSON.stringify(res.user_details[0]));
        localStorage.setItem('Authentication',true);

        this.props.router.replace('/dashboard');
       }
       else{
        localStorage.setItem('Authentication',false);
       // alert(localStorage.getItem('Authentication'));
        // alert(res.user_details.message);
       }
      })});
    }
  }
  get_echo_system(){
    let url = APIS.baseurl+APIS.get_echo_systems;
   // alert(url);
    fetch(url,{method:'GET'}).then(response=>(response.json().then(res=>{localStorage.setItem("echo_systems",JSON.stringify(res));this.setState({echo_systems:res});})));
    }
render(){
  // eslint-disable-next-line react/prop-types
  
  return (
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <div>
        <div style={styles.loginContainer}>
        <div style={{display:'flex',alignItems: 'flex-end',}} className="row p-3"><img style={styles.logo} className="col-md-3 col-xs-3"  src={require('../images/pcombinator.png')} /> <p className="col-md-8 col-xs-8 text-primary" style={{fontSize:'20px'}}>Passion Framework</p></div>

          <Paper style={styles.paper}>

            <form onSubmit={(e)=>this.handleSubmit(e)} id="login-form" >
              <TextField
                hintText="E-mail" 
                name="username"
                floatingLabelText="E-mail"
                fullWidth={true}
                required={true}
              />
              <TextField
                hintText="Password"
                name="password"
                id="password"
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
                required
              />

              <div>
                <Checkbox
                  label="Show Password"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                  onClick={()=>{
                       this.state.password ?
                       document.getElementById('password').type="text":document.getElementById('password').type="password";
                       this.setState({password:!this.state.password});
                  }
                }
                />

                {/* <Link to="/"> */}
                  <RaisedButton label="Login"
                                primary={true}
                                type="submit"
                                style={styles.loginBtn}/>
               {/* / </Link> */}
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
          {/* <Link to="/register"> */}
          <FlatButton
              label="Ecosystem Register"
              style={styles.flatButton}
              icon={<PersonAdd />}
              onClick={()=>{this.props.router.push('/ecosystem_register',{IsReferral:false})}}
            />  
            <FlatButton
              label="Register"
              style={styles.flatButton}
              icon={<PersonAdd />}
              onClick={()=>{this.props.router.push('/register',{IsReferral:false})}}
            />
          {/* </Link> */}
            <FlatButton
              label="Forgot Password?"
              style={styles.flatButton}
              icon={<Help />}
              onClick={()=>{this.props.router.push('/forgot_password',{IsReferral:false})}}

            />
            
          </div>

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

export default LoginPage;
