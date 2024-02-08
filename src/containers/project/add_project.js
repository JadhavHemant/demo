import React, { Component } from 'react';
import APIS from '../../APIS/APIS';
// import { domainToUnicode } from 'url';
class add_project extends Component {
   
    constructor(props){
        super(props);
        this.state = {categories:[],sectors:[],project_category:[],filters:['category_name','sector_name','member_id','sector','category','project_category']};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sectorsOnchange = this.sectorsOnchange.bind(this);
        
    }


    componentWillMount()
    { 
        let url = APIS.baseurl+APIS.project_module;
        fetch(url+"0",{
            method:'GET'
        }).then(response=>response.json().then((res)=>{
 
            this.setState({sectors:res});
        }));
        fetch(url+"2",{
            method:'GET'
        }).then(response=>response.json().then((res)=>{
             this.setState({categories:res});
             if(typeof this.props.router.params.id != "undefined"){
              
                let obj = JSON.parse(this.props.router.params.obj);
                document.getElementById('category').selectedIndex = obj.category;  
                document.getElementById('sector').selectedIndex = obj.sector;
               
                Object.entries(obj).map(([key,value])=>{if(!this.state.filters.includes(key)){
                   try{
                       if(key == "commercial"){
                           if(value == "0")
                          document.getElementById("yes").checked = true;   
                        else{
                            document.getElementById("no").checked = true;
                        }
                     }
                       else
                        document.getElementById(key).value = value;
                
                }catch(error){
                     alert(error+',',key);

                   }
                }});
       
          }
            }));
        
    }
    sectorsOnchange(e){
        let url = APIS.baseurl+APIS.project_module;

        let formdata = new FormData();
        formdata.append("sector_id",e.target.value);
        fetch(url+"1",{method:'POST',body:formdata}).then(response=>response.json().then(res=>{
            //alert(JSON.stringify(res));
            this.setState({project_category:res});
                    }));
    }
    handleSubmit(e){
       
        let do_something = true;
        //alert(e.target.id);
        let url; 
        if(do_something){
            e.preventDefault();
        if(typeof this.props.router.params.id != "undefined"){
         url = APIS.baseurl+APIS.project_module+"5";
        }
        else
        {
            url = APIS.baseurl+APIS.project_module+"3";
        }
        //alert(url);
        let formdata = new FormData(document.getElementById('frm_addproject'));
        fetch(url,{
            method:'POST',
            body:formdata
        }).then(response=>response.json().then((res)=>{ 
            if(res.success) {
                alert(res.message);
               // e.startPropation();
            }
            else if(res.code == "0"){
                alert(res.message);
                window.history.go(0);
            }
            else {
                alert("server error try again..");
            }
            do_something = false;
            
        }));
        
    }
       
    }  
    render() {
        return (
            <div>
                 <form id="frm_addproject" onSubmit={(e)=>this.handleSubmit(e)} className="needs-validation" novalidate>
                     <input type="hidden" name="id" id="id"  />
                     <input type="hidden" name="member_id" id="member_id" value={localStorage.getItem('token')} />
                        <div className="d-flex justify-content-center" >
                           <div className="col-md-6 col-lg-6">
                                 <div className="form-group d-flex justify-content-center mb-3">
                                 <h4 style={{fontFamily:  'cursive'}}>Project Details</h4>
                           </div>
                      
                        <div className="form-group">
                              <div className="row">
                                  <label className="form-label col-md-3 col-lg-3">Category</label>
                                  <select className="form-control col-md-9 col-lg-9" required aria-required="true" id="category" name="category" >
                                      <option value="">Select</option>
                                      {this.state.categories.map((value)=>(<option value={value.id}>{value.name}</option>))}
                                  </select>
                              </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="row">
                            <label className="form-label col-md-3 col-lg-3">Sector</label>
                                <select className="form-control col-md-9 col-lg-9" required aria-required="true"  id="sector" name="sector" onChange={(e)=>this.sectorsOnchange(e)} >
                                      <option value="">Select</option>
                                      {this.state.sectors.map((value)=>(<option value={value.id}>{value.sector_name}</option>))}
                                      <option value="other">other</option>
                                </select>
                             </div>   

                        </div>

                        <div className="form-group">
                             <div className="row"> 
                                   <label className="form-label col-md-3 col-lg-3">Project Category</label>
                                       <select className="form-control col-md-9 col-lg-9" required aria-required="true" id="project_category" name="project_category" >
                                              <option value="">Select</option>
                                              {this.state.project_category.map((value)=>(<option value={value.id}>{value.category_name}</option>))}
                                              <option value="other">other</option>
                                        </select>
                              </div>
                        </div>
                        
                        <div className="form-group">
                             <div className="row">
                                  <label className="col-md-3 col-lg-3"> Project Name: </label>
                                  <input className="form-control col-md-9 col-lg-9" id="project_name" name="project_name" required/>
                              </div>
                        </div>
                        
                        <div className="form-group">
                             <div className="row">
                                  <label className="col-md-3 col-lg-3"> Description: </label>
                                  <textarea className="form-control col-md-9 col-lg-9" id="project_description" rows="5" name="project_description" required /> 
                             </div>
                        </div>

                        <div className="form-group">
                              <div className="row">
                                  <label className="col-md-3 col-lg-3"> Organization </label>
                                  <input className="form-control col-md-9 col-lg-9" id="organization" name="organization" required/> 
                              </div>
                        </div>

                        <div className="form-group">
                              <div className="row">
                                    <label className="col-md-3 col-sm-3 col-xs-3 col-lg-3"> Commercial </label>
                                    <label className="col-md-2 col-sm-3 col-xs-3 col-lg-2 ml-3 ml-3"> Yes <input type="radio" id="yes" value="0" name="commercial" required /> </label>
                                    <label className="col-md-2 col-sm-3 col-xs-3 col-lg-2"> No  <input type="radio" id="no" value="1" name="commercial"/></label> 
                              </div>
                        </div>

                        <div className="form-group">
                             <div className="row">
                                  <label className="col-md-3 col-lg-3"> Project date </label>
                                  <label className="col-md-5 col-lg-4"><div className="column"> <label>Start</label>  <input className="form-control p-n5 col-md-12 col-lg-12" type="date" id="start_date" name="start_date" required/> </div></label>
                                  <label className="col-md-5 col-lg-4"><div className="coumnt"> <label> End </label>  <input className="form-control p-n5 col-md-12 col-lg-12" type="date" id="end_date" name="end_date" required/></div></label> 
                              </div>
                        </div>

                        <div className="form-group">
                              <div className="row">
                                  <label className="col-md-3 col-lg-3"> Commercial Amount </label>
                                  <input className="form-control col-md-9 col-lg-9" id="commercial_amount" name="commercial_amount" required/> 
                              </div>
                        </div>
                        <div className="form-group">
                              <div className="row">
                                  <label className="col-md-3 col-lg-3"> Team Size </label>
                                  <input type="number"  className="form-control col-md-3 col-lg-3" id="team_size" name="team_size" required/> 
                              </div>
                        </div>
                 
                        <div className="form-group">
                              <div className="row">
                                  <label className="col-md-3 col-lg-3">Technology </label>
                                  <input className="form-control col-md-9 col-lg-9" id="technology" name="technology" required/> 
                              </div>
                        </div>
                                         <div className="form-group">
                              <div className="row">
                                  <label className="col-md-3 col-lg-3">Project registration date </label>
                                  <input className="form-control col-md-9 col-lg-9" type="date" id="proj_reg_date" name="proj_reg_date" required/> 
                              </div>
                        </div>
                 
                        <div className="form-group d-flex justify-content-center">
                         <button className="btn btn-primary btn-md w-25 mt-3" type="submit" id="btn_save" >Save</button>
                        
                        </div>

                        </div>
                        </div>
                        </form>             
                       
            </div>
        );
    }
}


export default add_project;
