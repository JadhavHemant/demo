import React, { Component } from 'react';
import APIS from '../../APIS/APIS';
class add_job extends Component {
    constructor(props){
        super(props);
        this.state = {job_type: ['Part Time' ,'Full Time','Work from home','Contract','Mandate','Distribution','Cluster Formation','Project','Staff Augmentation','seek investment'],sectors:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
       let url = APIS.baseurl+APIS.job_posts+"4";
       //        alert(url);
      // let formData = new FormData(document.getElementById(e.target.id));
      // alert(e.target.id);
       fetch(url,{
                   method:'POST',
            }).
       then(response=>response.json()
          .then(res=>
                 {
                     this.setState({sectors:res});
                       
                  }));

    }
    handleSubmit(e){
        e.preventDefault();
        //alert(e.target.id);
               let url = APIS.baseurl+APIS.job_posts+"1";
        //        alert(url);
        let formData = new FormData(document.getElementById(e.target.id));
       // alert(e.target.id);
        fetch(url,{
                    method:'POST',
                    body:formData
             }).
        then(response=>response.json()
           .then(res=>
                  {
                      if(res.code == "0"){
                            alert(res.message);
                            window.history.go(0);
                        }
                        
                   }));
          
           

    }
    render() {

        return (
            <form id="form_post_jobs" onSubmit={(e)=>this.handleSubmit(e)}> 
            <div className="d-flex justify-content-center">
               <input type="hidden" value={localStorage.getItem('token')} name="member_id" id="member_id"/>
                 <div className="col-lg-6 col-md-6">
                    <div className="form-group d-flex justify-content-center" >
                            <label style={{fontSize:'20px'}}>Post Opportunities</label>
                    </div>  
                    <div className="form-group">
                         <div className="row">
                                <label className="col-md-3 col-lg-3 form-label">Sector</label>
                                <select type="text" name="sector" id="sector" className="form-control col-md-9 col-lg-9" required aria-required="true" >
                                       <option value="">Select</option>
                                       {this.state.sectors.map(sectors=>(<option value={sectors.id}>{sectors.name}</option>))}
                                </select>
                         </div>     
                   </div>         
                    <div className="form-group">
                         <div className="row">
                                <label className="col-md-3 col-lg-3 form-label">Opportunity Name</label>
                                <input type="text" name="job_name" id="job_name" className="form-control col-md-9 col-lg-9" required />
                         </div>     
                   </div>
                   
                   <div className="form-group">
                         <div className="row">
                                <label className="col-md-3 col-lg-3 form-label">Opportunity Description</label>
                                <textarea className="form-control col-md-9 col-lg-9" name="job_description" id="job_description" row="5"  required />
                         </div>     
                   </div>

                   <div className="form-group">
                         <div className="row">
                                <label className="col-md-3 col-lg-3 form-label">Company Name</label>
                                <input className="form-control col-md-9 col-lg-9" name="company_name" id="company_name" row="5"  required />
                         </div> 
                   </div>
                   
                   <div className="form-group">
                          <div className="row">
                               <label className="col-md-3 col-lg-3 form-label">Opportunity type</label>
                                 <select className="col-md-9 col-lg-9 form-control" name="job_type" id="job_type" aria-required="true" required>
                                        <option value="">select</option>
                                            {this.state.job_type.map(value=>(
                                                <option value={value}>{value}</option>
                                           ))
                                  
                                   }</select>
                          </div>     
                   </div>
                   
                   <div className="form-group">
                          <div className="row">
                                <label className="col-md-3 col-lg-3 form-label">Budget</label>
                                <input inputMode="numeric" type="number" className="form-control col-md-9 col-lg-9" name="salary" id="salary" required />
                          </div> 
                   </div>
                   
                   <div className="form-group">
                          <div className="row">
                                <label className="col-md-3 col-lg-3 form-label">Period</label>
                                <input type="text" className="form-control col-md-9 col-lg-9" name="Tenure" id="Tenure"  required />
                          </div>
                   </div>
                   <div className="form-group">
                       <div className="row">
                       <div className="col-md-3 col-lg-3"></div>
                           <div className="d-flex justify-content-center col-md-9 col-lg-9 mt-3"> 
                                  <input type="submit" style={{width:'150px'}} value="save" name="save" id="save"  required />
                           </div> 
                       </div>
                   </div>
                   
                </div>
                </div>
            </form>

        );
    }
}

export default add_job;
