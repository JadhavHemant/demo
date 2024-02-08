import React, { Component } from 'react';
import APIS from '../APIS/APIS';
class ngos extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount()
    {
        
    console.log(this.props.obj);//
 //   this.setState({name:this.props.obj.name,email:this.props.obj.email,address:this.props.obj.address,education:this.props.obj.education,mobileno:this.props.obj.mobile,university:this.props.obj.university});
 if(this.props.obj != null){ 
 document.getElementById('nname').value = this.props.obj.nname;
  document.getElementById('ncontactperson').value = this.props.obj.ncontactperson;
  document.getElementById('naddress').value = this.props.obj.naddress;
  document.getElementById('nmobile').value = this.props.obj.nmobile;
  document.getElementById('nabout').value = this.props.obj.nabout;  
  document.getElementById('nemail').value = this.props.obj.nemail;
  document.getElementById('id').value = this.props.obj.id;

     }    //   document.getElementById('aproject').value = this.props.obj.aproject;

 
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
       e.preventDefault();
     let url="";

if(this.props.obj == null){
    url = APIS.baseurl+ APIS.insert_beneficiery+"/0";

}
else{
    url = APIS.baseurl+ APIS.insert_beneficiery+"/1";
}

       const formData = new FormData(e.target);
       formData.append('table','beneficiary_ngo');
        
       fetch(url,{
         method:'POST',
         body:formData
     }).then(response=>response.json().then(res=>{
         //console.log('result',JSON.stringify(res));
         if(res.status == ""){
            window.history.go(0);
             alert('NGOs beneficiery added successfully under you');
         }
         else{
             alert('problem to add beneficiery please try again');
         }
     }));

    }
    
    render() {
        return (
            
            <form id="form-ngo" method="POST" onSubmit={(e)=>this.handleSubmit(e)}>
            {this.props.obj != null? <input type="hidden" value="" name="id" id="id" />:""}
                <input type="hidden" value={localStorage.getItem('token')} name="member_id"/>
                <div className="form-group">
                 <div className="row">
                    <label className="col-md-4">NGO Name</label>
                <input className="form-control col-md-8" name="nname" id="nname" required/> </div>
                </div>
            <div className="form-group">
               <div className="row">
                   <label className="col-md-4">Contact Person Details</label>
                   <input className="form-control col-md-8" name="ncontactperson" id="ncontactperson" required/>  </div>
                </div>
           <div className="form-group">
                <div className="row">
                <label className="col-md-4">Address</label>
                <input className="form-control col-md-8" name="naddress" id="naddress" required/> </div>
           </div>
           <div className="form-group">
                <div className="row">
                <label className="col-md-4">Mobile No</label>
                <input className="form-control col-md-8" name="nmobile" id="nmobile" pattern="[7-9]{1}[0-9]{9}" 
       title="Phone number with 7-9 and remaing 9 digit with 0-9" required/> </div>
            </div>
            <div className="form-group">
                 <div className="row">
                 <label className="col-md-4">Email</label>
                 <input className="form-control col-md-8" name="nemail" type="email" id="nemail" required/> </div>
            </div>

           <div className="form-group">
                 <div className="row">
                 <label className="col-md-4">About NGO</label>
                 <textarea className="form-control col-md-8" rows="5" name="nabout" id="nabout" required/>  </div>
           </div>
          <div className="d-flex justify-content-center m-5">
                <button className="btn btn-primary col-sm-3 mt-2 col-lg-3 align-self-center" onSubmit={this.handleSubmit}>Save</button> 
          </div>
</form>

        );
    }
}

export default ngos;
