import React, { Component } from 'react';
import APIS from '../APIS/APIS';
class academic extends Component {
    constructor(props){
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        
    console.log(this.props.obj);//
 //   this.setState({name:this.props.obj.name,email:this.props.obj.email,address:this.props.obj.address,education:this.props.obj.education,mobileno:this.props.obj.mobile,university:this.props.obj.university});
 if(this.props.obj != null){ 
 document.getElementById('aname').value = this.props.obj.aname;
  document.getElementById('aeducation').value = this.props.obj.aeducation;
  document.getElementById('university').value = this.props.obj.university;
  document.getElementById('ajobrole').value = this.props.obj.ajobrole;
  document.getElementById('aemail').value = this.props.obj.aemail;  
  document.getElementById('amobile').value = this.props.obj.amobile;
  document.getElementById('aproject').value = this.props.obj.aproject;
  document.getElementById('id').value = this.props.obj.id;

 }
//  if(this.props.obj.etype == "0"){
//        // this.setState({pass:true});
//        document.getElementsByName('etype')[0].checked = true;
//     }
//     else{
//         document.getElementsByName('etype')[1].checked = true;
//         //this.setState({appearing:true});

//     }
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
        let formData = new FormData(e.target);

        formData.append('table','beneficiary_academician');
        
        fetch(url,{
          method:'POST',
          type:"no-cores",
          body:formData
      }).then(response=>response.json().then(res=>{
          console.log('result',JSON.stringify(res));
          if(res.status == ""){
            document.getElementById("form-academic").reset();
           // window.history.go(0);
              alert('academician beneficiery added successfully under you');
          }
          else{
              alert('problem to add beneficiery please try again ');
          }
      }));

      e.preventDefault();

    }
    render() {
        return (
            <form id="form-academic" method="POST" onSubmit={(e)=>this.handleSubmit(e)}>
            {this.props.obj != null? <input type="hidden" value="" name="id" id="id" />:""}
            <div className="form-group">
                <input name="member_id" value={localStorage.getItem('token')} type="hidden"/>
                <div className="row">
                    <label className="col-md-4">Name</label>
                <input className="form-control col-md-8" name="aname" id="aname" required/> </div>
            </div>
             <div className="form-group">
             <div className="row">
                 <label className="col-md-4">Education</label>
             <input className="form-control col-md-8" name="aeducation" id="aeducation" required/> </div>
         </div>
          <div className="form-group">
          <div className="row">
              <label className="col-md-4">Institute/University</label>
          <input className="form-control col-md-8" name="university" id="university" required/> </div>
      </div>
       <div className="form-group">
       <div className="row">
           <label className="col-md-4">Job Role</label>
           <input className="form-control col-md-8" name="ajobrole" id="ajobrole" required/> </div>
           </div>
    <div className="form-group">
    <div className="row">
        <label className="col-md-4">Mobile No</label>
        <input className="form-control col-md-8" name="amobile" id="amobile" pattern="[7-9]{1}[0-9]{9}" 
       title="Phone number with 7-9 and remaing 9 digit with 0-9" required/> </div>
    </div>
 <div className="form-group">
 <div className="row">
     <label className="col-md-4">Email</label>
 <input className="form-control col-md-8" name="aemail" type="email" id="aemail" required/> </div>
</div>
<div className="form-group">
 <div className="row">
     <label className="col-md-4 col-lg-4" >Project Details</label>
   <textarea rows="5" className="form-control col-md-8 col-lg-8" name="aproject" id="aproject" required ></textarea>
</div>
</div>
<div className="d-flex justify-content-center m-5">
    <button type="submit" className="col-sm-3 mt-2 col-lg-3 align-self-center" onSubmit={this.handleSubmit}>Save</button> 
                     </div>
</form>

        );
    }
}

export default academic;
