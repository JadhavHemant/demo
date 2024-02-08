import React, { Component } from 'react';
import PropTypes from 'prop-types';
import APIS from '../APIS/APIS';
// import { isMobile } from 'react-device-detect';
class student extends Component {
    constructor(props){
        super(props);
        this.state = {name:'',email:'',address:'',education:'',mobileno:'',university:'',pass:false,appearing:false};
        this.handleSubmit= this.handleSubmit.bind(this);
    //console.log(this.props.match);
    }
    componentDidMount()
    {
        
    console.log(this.props.obj);//
 //   this.setState({name:this.props.obj.name,email:this.props.obj.email,address:this.props.obj.address,education:this.props.obj.education,mobileno:this.props.obj.mobile,university:this.props.obj.university});
 if(this.props.obj != null){
 document.getElementById('name').value = this.props.obj.name;
  document.getElementById('education').value = this.props.obj.education;
  document.getElementById('university').value = this.props.obj.university;
  document.getElementById('address').value = this.props.obj.address;
  document.getElementById('email').value = this.props.obj.email;  
  document.getElementById('mobile').value = this.props.obj.mobile;
  document.getElementById('id').value = this.props.obj.id;
 if(this.props.obj.etype == "0"){
       // this.setState({pass:true});
       document.getElementsByName('etype')[0].checked = true;
    }
    else{
        document.getElementsByName('etype')[1].checkeds = true;
        //this.setState({appearing:true});

    }
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
//alert(url);
const formData = new FormData(e.target);
 
 formData.append('table','beneficiary_student');
 
 
 fetch(url,{
       method:'POST',
       type:"no-cores",
       body:formData
      }).then(response=>response.json().then(res=>{
          console.log('result',JSON.stringify(res));
          if(res.status == 0){
              alert('student beneficiery added successfully under you');
              window.history.go(0);
          }
          else{
              alert('problem to add beneficiery please try again ');
          }
      }));

    e.preventDefault();


}
    validate(){

    }
    render() {
        return (
            <form  className="ml-xs-5"  id="formstudent" onSubmit={(e)=>this.handleSubmit(e)} method="POST" style={{alignSelf:'center'}}>
                {this.props.obj != null? <input type="hidden" value="" name="id" id="id" />:""}
                <input type="hidden" value={localStorage.getItem('token')} name="member_id"/>
            <div className="form-group">
            <div className="row"> <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">Student Name</label><input className="form-control col-md-8 col-xs-8 col-lg-8 col-sm-8" id="name" name="name"  required/> </div></div>
                   {/* {!isMobile?<div className="row"> <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">Student Name</label><input className="form-control col-md-8 col-xs-8 col-lg-8 col-sm-8" name="name" required/> </div>:<div className="row"> <input className="form-control col-xs-12 col-sm-12" name="name" required/> </div>}
                    </div> */}
                
                <div className="form-group">
                <div className="row">
                    <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4 ">Education</label>
                    <input className="form-control col-md-8 col-xs-8 col-lg-8 col-sm-8" name="education" id="education"   required/> </div>
               </div>
          <div className="form-group">
          <div className="row">
              <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">College/University</label>
          <input className="form-control col-md-8 col-lg-8 col-xs-8 col-sm-8" name="university" id="university" required/> </div>
      </div>
       <div className="form-group">
       <div className="row">
           <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">Address</label>
       <input className="form-control col-md-8 col-lg-8 col-xs-8 col-sm-8" name="address" id="address"  required/> </div>
   </div>
    <div className="form-group">
    <div className="row">
        <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">Mobile No</label>
    <input className="form-control col-md-8 col-xs-8 col-lg-8 col-sm-8" name="mobile" id="mobile"  pattern="[7-9]{1}[0-9]{9}" 
       title="Phone number with 7-9 and remaing 9 digit with 0-9" required/> </div>
</div>
 <div className="form-group">
 <div className="row">
     <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">Email</label>
 <input className="form-control col-md-8 col-xs-8 col-lg-8 col-sm-8" type="email" name="email" id="email" /> </div>
</div>
<div className="radio-group" required>
 <div className="row mt-5" style={{display:'flex',justifyContent:'center'}}>
     <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">
 <input className="col-md-4 col-xs-4 col-lg-4 col-sm-4" type="radio" name="etype"  value={0} required/>Passed</label>
 <label className="col-md-4 col-xs-4 col-lg-4 col-sm-4">
 <input className="col-md-4 col-xs-4 col-lg-4 col-sm-4" type="radio" name="etype" value={1}/>Appearing</label> </div>
</div>

<div className="d-flex justify-content-center m-5">
<button type="submit" className="col-sm-3 mt-2 col-lg-3 col-xs-8 col-md-3 align-self-center" onSubmit={this.handleSubmit}>Save</button> 
  </div>
</form>


);
    }
}
student.PropTypes={
obj : PropTypes.object
};

export default student;
