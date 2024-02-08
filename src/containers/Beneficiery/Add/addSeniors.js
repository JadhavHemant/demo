import React, { Component } from 'react';
import InputContainer from '../../row_input_elements/inputs';
import APIS from '../../../APIS/APIS';
class addSeniors extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount()
    {
        
        // console.log(this.props.obj);
        if(this.props.obj != null){
        document.getElementById('name').value = this.props.obj.name;
        document.getElementById('company_name').value = this.props.obj.company_name;
        document.getElementById('address').value = this.props.obj.address;
        document.getElementById('email').value = this.props.obj.email;  
        document.getElementById('mobile').value = this.props.obj.mobile;
        document.getElementById('profile').value = this.props.obj.profile;
        document.getElementById('id').value = this.props.obj.id;
        }
    }
    handleSubmit(e){
        let url="";

        if(this.props.obj == null){
            url = APIS.baseurl+ APIS.insert_beneficiery+"/0";
        }
        else{
            url = APIS.baseurl+ APIS.insert_beneficiery+"/1";
        }
       // alert(url);
        const formData = new FormData(e.target);
         
         formData.append('table','beneficiery_senior_partner');
         
         
         fetch(url,{
               method:'POST',
               type:"no-cores",
               body:formData
              }).then(response=>response.json().then(res=>{
                  //console.log('result',JSON.stringify(res));
                  if(res.status == 0){
                      alert('beneficiery added successfully under you');
                      window.history.go(0);
                  }
                  else{
                      alert('problem to add beneficiery please try again ');
                  }
              }));
        
            e.preventDefault();
    }
    render() {
        return (
            <div>
                 <form id="form_senior_benificiery" onSubmit={(e)=>this.handleSubmit(e)}>
                     <input type="hidden" name="id" id="id" />
                  <input type="hidden" value={localStorage.getItem('token')} name="member_id" id="member_id" />
                       <div className="form-group col-md-12 col-lg-12">
                           <InputContainer title="Company Name" type="text" class_input="form-control col-md-9 col-lg-8" class_label="col-md-4 col-lg-4"   name="company_name" id="company_name" required={true} />  
                       </div>
                       <div className="form-group col-md-12 col-lg-12">
                           <InputContainer title="Name" type="text" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4"   name="name" id="name" required={true}  />  
                       </div>
                       <div className="form-group col-md-12 col-lg-12">
                          <InputContainer title="Email" type="email" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4"   name="email" id="email" required={true}  /> 
                      </div>
                      <div className="form-group col-md-12 col-lg-12 ">
                             <div className="row">
                            <label   className="col-md-4 col-lg-4">Address</label>
                             <textarea className="col-md-8 col-lg-8" rows="3" name="address" id="address" />
                             </div>
                      </div>
                      <div className="form-group col-md-12 col-lg-12">
                           <InputContainer title="Mobile" type="text" pattern={APIS.mobile_pattener} class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4"   name="mobile" id="mobile" required={true}  />
                      </div>
                      <div className="form-group col-md-12 col-lg-12 ">
                             <div className="row">
                            <label   className="col-md-4 col-lg-4">About Us</label>
                             <textarea className="col-md-8 col-lg-8" rows="3" name="profile" id="profile" />
                             </div>
                      </div>
                      <div className="form-group col-md-12 col-lg-12">
                          <div className="row">
                           <div className="col-md-4 col-lg-4"></div>
                           <div className="col-mmd-8 col-lg-8">
                          <div className="d-flex justify-content-center" >
                            <button type="submit" className="btn btn-primary w-50 p-1 mt-5" >Save</button> 
                            </div>
                            </div>  
                            </div>
                      </div>

                 </form>
            </div>
        );
    }
}

export default addSeniors;
