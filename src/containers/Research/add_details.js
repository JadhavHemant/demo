import React, { Component } from 'react';
// import {Link} from 'react-router';
import APIS from '../../APIS/APIS';


class add_details extends Component {
    constructor(props){
        super(props);
        this.state = {categories:[],sectors:[],research_category:[],
            filters:['category_name','sector_name','descritpion','area','member_id','sector','category','project_category'],
             dimens:['Probing','Acting','Scoping','Setting','Inovating','Owning','Nurturing'],
             perspective:['Accelerator-Startup Perspective', 'Incubator-Corporate Perspective','Incubator-Academic Perspective','Incubator-Venture Capitalist Perspective'],
             process:['Idea Management','Knowledge Management','Research Management','Entrepreneur ManagementEntrepreneur Management','Contract Management',
                      'Delivery Management','Support Management','Social Responsibility Management','Scope Management','Finance Management',
                       'Project Management','Integration Management','Operations Management','HR Management','Security Management','	Process Management',
                       'Innovation Management','Compliance Management','Technology Transfer Management','Risk Management','Governance Management','Capacity Management','Infrastructure Management','Mergers and Acquisition Management','Marketing Management','Performance Management','Partnership Management','IPO Management']};
       this.handleSubmit = this.handleSubmit.bind(this);
        this.sectorsOnchange = this.sectorsOnchange.bind(this);
        this.maturity = this.maturity.bind(this);
    }
    componentWillMount()
    { 
        let url = APIS.baseurl+APIS.project_research;
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
                 document.getElementById('research_category').selectedIndex=obj.research_category;
               
               Object.entries(obj).map(([key,value])=>{if(!this.state.filters.includes(key)){
                 //  alert(key); 
                   try{
                    
                    document.getElementById(key).value = value;
                
                }catch(error){
                     alert(error+','+key);

                   }
                }});
       
          }
            }));
        
    }
    sectorsOnchange(e){
        let url = APIS.baseurl+APIS.project_research;
        let formdata = new FormData();
        formdata.append("sector_id",e.target.value);
        fetch(url+"1",{method:'POST',body:formdata}).then(response=>response.json().then(res=>{
             this.setState({research_category:res});
                    }));
    }
    handleSubmit(e){
       
        let do_something = true;
        //alert(e.target.id);
        let url; 
        if(do_something){
            e.preventDefault();
        if(typeof this.props.router.params.id != "undefined"){
         url = APIS.baseurl+APIS.project_research +"5";
        }
        else
        {
            url = APIS.baseurl+APIS.project_research +"3";
        }
        //alert(url);
        let formdata = new FormData(document.getElementById('frm_addproject'));
        fetch(url,{
            method:'POST',
            body:formdata
        }).then(response=>response.json().then((res)=>{ 
            if(res.success) {
                alert(res.message);
                window.history.go(0);
            }
            else if(res.code == "0"){
                alert(res.message);
                window.history.go(0);
           //     e.click();
            }
            else {
                alert("server error try again..");
            }
            do_something = false;
            
        }));
        
    }
       
    }  
    maturity(e){
    let maturity = e.target.innerHTML; 
    document.getElementById('maturity').value = maturity;
         
        $('#exampleModal').modal('hide');
    }
    render() {
        return (
                <div>
                     <form id="frm_addproject" onSubmit={(e)=>this.handleSubmit(e)} className="needs-validation" novalidate>
                        <div  className="d-flex justify-content-center align-items-center">
                         <input type="hidden" name="id" id="id"  />
                         <input type="hidden" name="member_id" id="member_id" value={localStorage.getItem('token')} />
                            <div className="col-md-6 col-lg-6 ">
                            <div className="d-flex justify-content-center" >
                               <div className="col-md-6 col-lg-6">
                                     <div className="form-group d-flex justify-content-center mb-3">
                                     <h4 style={{fontFamily:  'cursive'}}>Research Details</h4>
                               </div>
                               </div>
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
                                       <label className="form-label col-md-3 col-lg-3">Research Category</label>
                                           <select className="form-control col-md-9 col-lg-9" required aria-required="true" id="research_category" name="research_category" >
                                                  <option value="">Select</option>
                                                  {this.state.research_category.map((value)=>(<option value={value.id}>{value.area}</option>))}
                                                  <option value="other">other</option>
                                            </select>
                                  </div>
                            </div>
                            {/* <div className="form-group">
                                  <div className="row">
                                        <label className="form-label col-md-3 col-lg-3">Category</label>
                                        <select className="form-control col-md-9 col-lg-9" required aria-required="true" id="category" name="category" >
                                           <option value="">Select</option>
                                          {this.state.categories.map((value)=>(<option value={value.id}>{value.name}</option>))}
                                        </select>
                                  </div>
                            </div> */}
                            
                            <div className="form-group">
                                 <div className="row">
                                      <label className="col-md-3 col-lg-3"> Research Name: </label>
                                      <input className="form-control col-md-9 col-lg-9" id="research_name" name="research_name" required/>
                                  </div>
                            </div>
                            
                            <div className="form-group">
                                  <div className="row">
                                         <label className="form-label col-md-3 col-lg-3">Abstract:</label>
                                         <textarea className="form-contol col-md-9 col-lg-9" row="3" name="abstract" id="abstract" required></textarea>
                                      
                                  </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                     <label className="col-md-3 col-lg-3">Dimension</label>
                                     <select  className=" form-control col-md-9 col-lg-9"  required aria-required="true" name="dimension" id="dimension">
                                              <option value="">Select</option>
                                              {this.state.dimens.map((value)=>(<option value={value}>{value}</option>))}
                                     </select>
                                </div>
                           </div>

                           <div className="form-group">
                                 <div className="row ">
                                       <label className="col-md-3 col-lg-3">Perspective</label>
                                             <select  className="form-control col-md-9 col-lg-9"  required aria-required="true" name="perspective" id="perspective">
                                                    <option value="">Select</option>
                                                  {this.state.perspective.map((value =>(<option value={value}>{value}</option>)))}
                                             </select>
                                 </div>
                                 </div>

                            <div className="form-group">
                                 <div className="row">
                                     <label className="col-md-3 col-lg-3">Process</label>
                                            <select  className="col-md-9 col-lg-9 form-control"  required aria-required="true" name="process" id="process">
                                                   <option value="">Select</option>
                                                   {this.state.process.map(value=>(<option value={value}>{value}</option>))}
                                           </select>
                                  </div>
                            </div>
        {/* <div className= "modal modal-lg modal-xs fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
             <div className="modal-dialog modal-lg" role="document">
                 <div className="modal-content">
                      <div className="modal-header">
                           <h5 className="modal-title">Process Areas</h5>
                           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          
                           <span aria-hidden="true">&times;</span>
                          
                           </button>
                      </div>
                 <div className="modal-body">
                      <div className="table-responsive " style={{overflow:'auto',height:"400px"}}><table className="table" width="100%">
  
                       <tr>
                             <td width="20%"><label></label></td>
                             <th width="20%">Accelerator-Startup Perspective</th>
                             <th width="20%">Incubator-Corporate Perspective</th>
                             <th width="20%">Incubator-Academic Perspective</th>
                             <th width="20%">Incubator-Venture Capitalist Perspective</th>
     
                       </tr>
                       <tr>
                             <th width="20%">P robing</th>
                             <td width="20%" onClick={(e)=>this.maturity(e)}>Idea Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Knowledge Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Research Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Entrepreneur Management</td>
     
    </tr>
    <tr>
        <th width="20%">A cting</th>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Contract Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Delivery Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Support Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Social Responsibility Management</td>
     
    </tr>
    <tr>
        <th width="20%">S coping</th>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Scope Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Finance Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Project Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Integration Management</td>
     
    </tr>
    <tr>
        <th width="20%" >S etting</th>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Operations Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>HR Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Security Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Process Management</td>
     
    </tr>
    <tr>
        <th width="20%">I nnovating</th>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Innovation Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Compliance Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Technology Transfer Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Risk Management</td>
     
    </tr>
    <tr>
        <th width="20%">O wning</th>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Governance Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Capacity Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Infrastructure Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Mergers and Acquisition Management</td>
     
    </tr>
    <tr>
        <th width="20%">N urturing</th>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Marketing Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Performance Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>Partnership Management</td>
        <td width="20%" onClick={(e)=>this.maturity(e)}>IPO Management</td>
     
    </tr>
    </table>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
</div>
</div> */}
                            
                            {/* <div className="form-group">
                                 <div className="row">
                                      <label className="col-md-3 col-lg-3"> Dimentions: </label>
                                      <textarea className="form-control col-md-9 col-lg-9" id="project_description" rows="5" name="project_description" required /> 
                                 </div>
                            </div>
    
                            <div className="form-group">
                                  <div className="row">
                                      <label className="col-md-3 col-lg-3"> Perspective </label>
                                      <input className="form-control col-md-9 col-lg-9" id="organization" name="organization" required/> 
                                  </div>
                            </div>
    
                            {/* <div className="form-group">
                                  <div className="row">
                                        <label className="col-md-3 col-sm-3 col-xs-3 col-lg-3"> Commercial </label>
                                        <label className="col-md-2 col-sm-3 col-xs-3 col-lg-2 ml-3 ml-3"> Yes <input type="radio" id="yes" value="0" name="commercial" required /> </label>
                                        <label className="col-md-2 col-sm-3 col-xs-3 col-lg-2"> No  <input type="radio" id="no" value="1" name="commercial"/></label> 
                                  </div>
                            </div> */}
    
                            {/* <div className="form-group">
                                 <div className="row">
                                      <label className="col-md-3 col-lg-3"> Process Area </label>
                                      <label className="col-md-5 col-lg-4"><div className="column"> <label>Start</label>  <input className="form-control p-n5 col-md-12 col-lg-12" type="date" id="start_date" name="start_date" required/> </div></label>
                                      <label className="col-md-5 col-lg-4"><div className="coumnt"> <label> End </label>  <input className="form-control p-n5 col-md-12 col-lg-12" type="date" id="end_date" name="end_date" required/></div></label> 
                                  </div>
                            </div>  */}
    
                            {/* <div className="form-group">
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
                      */}
                            <div className="form-group">
                                  <div className="row">
                                      <label className="col-md-3 col-lg-3">Research Tools </label>
                                      <input className="form-control col-md-9 col-lg-9" id="research_tools" name="research_tools" required/> 
                                  </div>
                            </div>
                                             {/* <div className="form-group">
                                  <div className="row">
                                      <label className="col-md-3 col-lg-3">Project registration date </label>
                                      <input className="form-control col-md-9 col-lg-9" type="date" id="proj_reg_date" name="proj_reg_date" required/> 
                                  </div>
                            </div> */}
                     
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


export default add_details;
