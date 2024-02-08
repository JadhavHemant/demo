import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../theme-default';
import InputContainer from '../containers/row_input_elements/inputs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import APIS from '../APIS/APIS';
class echosystem_register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
       // alert(e.target.id);
        let url = APIS.baseurl+APIS.insert_ecosystem;
         let formData = new FormData(document.getElementById(e.target.id));
         fetch(url,{method:'POST',body:formData}).then(response=>response.json().then(res=>{
            if(res.code == 0 || res.code=="0"){
                alert(res.message);
                window.history.go(0);
            }
            else{
                alert(res.code);
                alert(res.message);
            }
         }));

    }
    
    render() {
        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
            <form onSubmit={(e)=>this.handleSubmit(e)} id="form_register_ecosystem" >
            <div>      
            <div className="d-flex justify-content-center">
                <div className="col-md-8 col-lg-8 mt-5">
                    <div className="d-flex justify-content-center">
                     <div className="column col-md-8 col-lg-8">
                      <div className="mb-5" style={{textAlign:'center'}}><h5>Ecosystem Register</h5></div>
                           <Paper className="col-md-12 col-lg-12">             
                                <div className="form-group">
                                      <TextField name="name" floatingLabelText="Eco System Name" fullWidth={true} required />
                                </div>
                                <div className="form-group">
                                      <TextField name="address" id="address" floatingLabelText="Address" fullWidth={true} />
                                </div>
                                <div className="form-group">
                                      <TextField name="contact_no" id="contact_no"  required pattern="[7-9]{1}[0-9]{9}" floatingLabelText="Contact Name" fullWidth={true} />
                                </div>
                                <div className="form-group">
                                      <TextField name="email_address" id="email_address" required floatingLabelText="Email Address" fullWidth={true} />
                                </div>
                              
                                <div className="form-group">
                                      <label>Description</label>
                                      <textarea name="description" id="description"  rows="4" className="col-md-12 col-lg-12" floatingLabelText="Description" fullWidth={true} />
                                </div>
                              
                                <div className="form-group">
                                      <InputContainer name="icon[]" multiple required={true} id="icon" type="file" title={<b>Icon</b>} class_input="col-md-8 col-lg-8" class_label="col-md-4 col-lg-4"/>
                                </div>
                                
                                <div className="d-flex justify-content-center mt-5 ">
                                    <RaisedButton label="Register"
                                                  primary={true}
                                                  className="mb-3"
                                                  type="submit" />
                                </div>

                            </Paper>
                        </div>
                    </div>

                </div>
            </div>
            </div>
       </form>
            </MuiThemeProvider>
        );
    }
}

export default echosystem_register;
