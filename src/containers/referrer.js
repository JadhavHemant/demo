import React, { Component } from 'react';
import APIS from '../APIS/APIS';
class referrer extends Component {
    constructor(props){
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
handleSubmit(e){
const formData = new FormData(e.target);
 formData.append('table','beneficiary_student');
 fetch(APIS.baseurl+ APIS.insert_beneficiery,{
       method:'POST',
       type:"no-cores",
       body:formData
      }).then(response=>response.json().then(res=>{
          console.log('result',JSON.stringify(res));
          alert(res.status);
          if(res.status == 200){
              alert('referral beneficiery added successfully under you');
          }
          else if(res.status == 1062){
              alert("you have added refferal already");
          }
          else{
              alert('problem to add beneficiery please try again ');
          }
      }));

    e.preventDefault();


}
    render() {
        return (
            <form id="form-referrer" method="POST" onSubmit={(e)=>this.handleSubmit(e)}>
            <div className="form-group">
                <div className="row">
                    <label className="col-md-4">Name</label>
                <input className="form-control col-md-8" name="rname"/> </div>
            </div>
          
    <div className="form-group">
    <div className="row">
        <label className="col-md-4">Mobile No</label>
    <input className="form-control col-md-8" name="rmobile"/> </div>
</div>
 <div className="form-group">
 <div className="row">
     <label className="col-md-4">Email</label>
 <input className="form-control col-md-8" name="remail"/> </div>
</div>
<div className="form-group">
 <div className="row">
     <label className="col-md-4">Amount Paid</label>
   <input rows="5" className="form-control col-md-8" name="ramountpaid" />
</div>
</div>
<div className="d-flex justify-content-center m-5">
    <button className="btn btn-primary col-sm-3 mt-2 col-lg-3 align-self-center" onSubmit={this.handleSubmit}>Save</button> 
                     </div>
</form>
        );
    }
}

export default referrer;
