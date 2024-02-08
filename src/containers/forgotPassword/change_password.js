import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FA from 'react-fontawesome';
import APIS from '../../APIS/APIS';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import themeDefault from '../../theme-default';

const styles={
    paper: {
        padding: 20,
        margin: 10,
        overflow: 'auto'
      },
      loginBtn: {
        float: 'right',
        marginTop: '20px',
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
      }
};
class change_password extends Component {
    constructor(props){
        super(props);
        this.state = {eye_name:"eye",toggle:false,toggle1:false,confirmeye_name:"eye"};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showandhidePassword = this.showandhidePassword.bind(this);
    
    }
    handleSubmit(e){
       // alert(localStorage.getItem('email'));
        e.preventDefault();
        let url = APIS.baseurl+APIS.verify_user+"2";
        let formData = new FormData(document.getElementById('form_change_password'));
        formData.append('member_id',localStorage.getItem('email'));

        fetch(url,{method:'POST',body:formData}).then(
            response=>response.json().then(
            res=>{
         //       alert(res.code);
                if(res.code == "0"){
                     this.props.router.replace('/');     
                }
            }
               )
        );    
    }
    showandhidePassword1(){
       // alert(2);
        this.setState({toggle1:!this.state.toggle1});
        let  element= document.getElementById('confirmPassword');
         if(this.state.toggle1){
                   this.setState({confirmeye_name:"eye-slash"});
                  element.type = "text"; 
 
         }
         else{
             this.setState({confirmeye_name:"eye"});
             element.type = "Password";
         }
    }
    
    showandhidePassword()
    {
    
        this.setState({toggle:!this.state.toggle});
       let  element= document.getElementById('newpassword');
        if(this.state.toggle){
                  this.setState({eye_name:"eye-slash"});
       element.type = "text"; 

        }
        else{
            this.setState({eye_name:"eye"});
            element.type = "Password";
        
    }
    }
    render() {
     let type = this.props.router.params.id;
        return (
            <MuiThemeProvider muiTheme={themeDefault}>
                <div className="container">
                   <div className="d-flex justify-content-center" style={styles.loginContainer}>
                        <Paper style={styles.paper}>
                               <form onSubmit={(e)=>this.handleSubmit(e)} id="form_change_password">
                                    <div className="form-group">
                                        
                                        <div className="column">
                                        
                                        {type != "false" ? <TextField
                                                 hintText="Enter Old Password" 
                                                 name="newpassword"
                                                 floatingLabelText="Enter Old Password"
                                                 fullWidth={true}
                                                 required={true}
                                                 type="Password"
                                                 />:"" }
                                                 <div className="row d-flex align-items-end">

                                                <TextField
                                                 hintText="Enter New Password" 
                                                 name="newpassword"
                                                 id="newpassword"
                                                 className="col-md-10 col-lg-10"
                                                 floatingLabelText="Enter New Password"
                                                 fullWidth={false}
                                                 type="Password"
                                                 required={true} />
                                                      
                                                 
                                          <div className="col-md-2 col-lg-2 ml-n3 mb-1"  id="dnewPassword" name="dnewPassword" onClick={(e)=>this.showandhidePassword(e)}>
                                             
                                          <FA  name={this.state.eye_name} />
                                          
                                          </div>
                                          </div>
                                          <div className="row d-flex align-items-end">
                                                 <TextField
                                                 hintText="Confirm Password" 
                                                 name="confirmpassword"
                                                 id="confirmPassword"
                                                 className="col-md-10 col-lg-10"
                                                 floatingLabelText="Confirm Password"
                                                 type="Password"
                                                 fullWidth={true}
                                                 required={true} />
                                                 
                                                 <div className="col-md-2 col-lg-2 ml-n3 mb-1" id="confirmPassword" name="confirmPassword"  onClick={(e)=>this.showandhidePassword1(e)}>
                                             
                                             <FA  name={this.state.confirmeye_name} />
   
                                          </div>
                                          </div>
                                                 <RaisedButton label="Change"
                                                 style={styles.loginBtn}
                                primary={true}
                                type="submit"/>
                                        </div>
                                         
                        </div>
                        </form>
            
                
            </Paper>
</div>
</div>

            </MuiThemeProvider>
        );
    }
}

export default change_password;
