import React, { Component } from 'react';

import APIS from '../../APIS/APIS';
import CKEditor from 'ckeditor4-react';
import InputContainer from '../row_input_elements/inputs';
// import { Checkbox } from 'material-ui';
import  SelectContainer from '../row_input_elements/select';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ReactDOMServer from 'react-dom/server';

class view_groups extends Component {
    constructor(props){
        super(props);
        
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.members_details = this.members_details.bind(this);
        this.handleCkEditor = this.handleCkEditor.bind(this);
        this.view_task= this.view_task.bind(this);
        this.handleActivityModelClose = this.handleActivityModelClose.bind(this);
        this.handleActivityGroupModelClose = this.handleActivityGroupModelClose.bind(this);
        this.handleWorkCorrespondModelClose = this.handleWorkCorrespondModelClose.bind(this);
        this.state = {groups:[],activityGroups:[{name:'adfak',id:'idaf'}],html_string:'',filters:['id','project_type','project_id','member_count','createdby'],mentors:['mentors_firstname','mentors_email_address'],project_d:['project_name','start_date','end_date'],toMembers:null};
    }
    

    
    componentWillMount(){
        let url = APIS.baseurl+APIS.group_module+"7"+"?type=0";
       //alert(url);
        fetch(url,{method:'GET'}).then(response=>response.json().then(res=>
            {
       
                this.setState({groups:res});
       
            }));

        url = APIS.baseurl+APIS.group_module+"9";
        
        fetch(url,{method:'GET'}).
                    then(response=>response.json().
                            then(res=>{
                                      this.setState({activityGroups:res});
                     }));   

    }
    componentDidMount(){
        $(document).ready(function () {
            $('#tbl_groups').DataTable();
         });
    }
  
    handleCkEditor(e){
            //alert(e.editor.getData());
            this.setState({html_string:e.editor.getData()});
    }
    

    handleSubmit(e){
    let formData;let url;let type;
    e.preventDefault();
   
    formData = new FormData(e.target);
  
    let project_id = document.getElementById('project_id');
    let group_id = document.getElementById('group_id'); 
  
    url = APIS.baseurl+APIS.group_module;
    
     switch(e.target.id){
         case 'form_send_work_correspond':
                 type =2;
                 url = url+"8";
                 formData.append('table_name','project_work_correspond');
                 formData.append('type',type);
                 formData.append('project_id',project_id.value);
                 formData.append('group_id',group_id.value);
                 formData.append('html_text',this.state.html_string);
         break;
         case 'form_send_create_activity':
                 type =1;
                 url = url+"8";
                 formData.append('table_name','project_activities');
                 formData.append('type',type);
                 formData.append('project_id',project_id.value);
                 formData.append('group_id',group_id.value);
         break;
         case 'form_send_create_activity_group': 
                type =0;
                url = url+"8";
                formData.append('table_name','activity_group_master');
                formData.append('type',type);
                formData.append('project_id',project_id.value);
                formData.append('group_id',group_id.value);
        break; 
        default:
        break;

     }
    
 fetch(url,{
         method:'POST',
         body:formData
     }).then(response=>
                    response.json().
                                then(
                                      res=>{
                                          
                                       if(res.code == 0){
                                      //  alert(type);
                                        $("#exampleModal2").modal('hide');

                                        if(type == 0)
                                        {
                                            this.setState({activityGroups:res.activity_group});
                                        }  
                                        alert(res.message);
                                       }
                                       else{
                                          alert(res.message);
                                       }
                                         
                                      }
                                    )
            );

      

    }
    handleSubmit1(e){
        alert(e.target.id);
        e.preventDefault();
    }


    handleCheckbox(e){
       alert(e.target.id);
    }
  project_details(details){
  let div_element = <div></div>;
    div_element= <div>{ details.map(value=>(
             Object.entries(value).map(([key,value])=>(
                         this.state.project_d.includes(key)?<div>
                     {key != "project_name"? 
                     <div>{key.replace('_'," ").toLocaleUpperCase()}</div>:""}
                    { key == "project_name" ?
                             <div>{value}</div>:<div>{value}</div>}
                             </div>:""
                         ))
                         
                 
             ))
       }</div> ;
 
      return (div_element); 
}

members_details(details) {
       let div_element = <div></div>;
      
       div_element= <div className="row col-md-4 col-sm-4 col-xs-4 col-lg-4">{ details.map(value=>(
            JSON.parse(value.user_obj).map(val=>(
                        Object.entries(val).map(([key,value])=>(
                        this.state.mentors.includes(key)?
                            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">{value}</div>
                            :""
                        ))
                        
                
            ))
      ))}</div>;

     return (div_element);
 }

 handleActivityGroupModelClose(){
   //  alert('activity_group_close');
 }

 handleWorkCorrespondModelClose(){
     //alert('activity_workCorrespond_close');
 }

 handleActivityModelClose(){
    // alert('close');
 }

 create_task(project_details,id,member_details){
    
     document.getElementById('project_id').value = project_details[0].id;
     document.getElementById('group_id').value= id;

     let div_element = <div></div>;
     div_element= <table><tbody><tr><td colSpan="2"><b>Members</b></td></tr><tr><div className="form-group col-md-12 col-lg-12"><div className="row"> { member_details.map(value=>(
              JSON.parse(value.user_obj).map(val=>(
          
             <div className="w-auto"><input className="mr-2 ml-2" type="checkbox" name="assign_members[]" value={val.mentors_email_address} id="assign_members[]" /><label className="mr-2">{val.mentors_firstname}</label>(<label>{val.mentors_email_address}</label>){" "}</div>  
              ))
        ))}</div></div></tr></tbody> </table>;
        let elementString = ReactDOMServer.renderToString(div_element);
        //alert(elementString);
        document.getElementById('member_list').innerHTML = elementString;
        $("#exampleModal1").modal('toggle');
       // $("#exampleModal2").modal('dispose');
    }
    view_task(obj){
        //alert(JSON.stringify(obj));
        this.props.router.push("/dashboard/view_activity/"+JSON.stringify(obj));
    //    $("#exampleModal3").modal('toggle');
    }
 create_group_activity(){
    $("#exampleModal2").modal('toggle');


 }


 members_details1(details,id,project_details) {
    
    let div_element = <div></div>;
    div_element= <table><tbody><tr><td colSpan="2"><b>Members</b></td></tr> { details.map(value=>(
             JSON.parse(value.user_obj).map(val=>(
                 Object.entries(val).map(([key,value],i)=>(
                 this.state.mentors.includes(key)?
                 <tr>    
                    {i != "7" ?<td><input type="checkbox" checked={true} name="members[]" id={"members"+i} value={value}  /></td>:<td></td>}
                    
                    <td>{i == "7" ?<label>{"( "+value+" )"}</label> :<b>{value}</b>}</td>
                    </tr>
                :""
             ))
                         
                 
             ))
       ))}</tbody> </table>;
    
       document.getElementById('group_id').value = id;
       document.getElementById('project_id').value = project_details[0].id;
    
       let elementString = ReactDOMServer.renderToString(div_element);
       
       $("#exampleModal").modal('toggle');
       document.getElementById('members').innerHTML = elementString;
  
  }   

    render() {
        //alert(1);
        const view_activity_task=<div className= "modal  modal-md" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-xs" role="document">
            <div className="modal-content">
    
                 <div className="modal-header">
                     <h5 className="modal-title">View Activity</h5>
                         <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleActivityGroupModelClose}>
                          <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
    
            <div className="modal-body">
                 <div className="table-responsive " style={{overflow:'auto',height:"400px"}}>
                     <form onSubmit={this.handleSubmit} id="form_send_create_activity_group">
                       
                         <div className="form-group">
                                <div className="col-md-12 col-lg-12">
                                     <InputContainer type="text" name="name" required={true} title="Name" items={this.state.activityGroups} label_class="col-md-4 col-lg-4" select_class="form-control col-md-8 col-lg-8"  />
                               </div>
                         </div>
                   
                         <div className="form-group col-md-12 col-lg-12">
                             <div className="row">
                              
                              <label>Description</label>   
                              <textarea  name="description" rows="5"  className="form-control" id="description" />
                              </div>
                              
                         </div>
    
                 <div className="form-group" >
                        <div className="d-flex justify-content-center mt-5">
                             <button type="submit" className="center w-25 p-1 ">Save</button>  
                       </div>
                 </div> 
           
                
                
            </form>
               
    </div>
    </div>
    </div>
    </div>
    </div>;
        const create_activity_group_model=<div className= "modal mt-5" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-xs" role="document">
            <div className="modal-content">
    
                 <div className="modal-header">
                     <h5 className="modal-title">Create Activity Group</h5>
                         <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleActivityGroupModelClose}>
                          <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
    
            <div className="modal-body">
                 <div className="table-responsive " style={{overflow:'auto',height:"400px"}}>
                     <form onSubmit={this.handleSubmit} id="form_send_create_activity_group">
                       
                         <div className="form-group">
                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                     <InputContainer type="text" name="name" required={true} title="Name" items={this.state.activityGroups} label_class="col-md-4 col-lg-4 col-xs-4 col-sm-4" select_class="form-control col-md-8 col-lg-8 col-xs-8 col-sm-8"  />
                               </div>
                         </div>
                   
                         <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12">
                             <div className="row">
                              
                              <label>Description</label>   
                              <textarea  name="description" rows="5"  className="form-control" id="description" />
                              </div>
                              
                               </div>
                
                 <div className="form-group" >
                    <div className="d-flex justify-content-center mt-5">
                     <button type="submit" className="center w-25 p-1 ">Save</button>  
                    </div>
                 </div> 
                 </form>
               
    </div>
    </div>
    </div>
    </div>
    </div>;
    const create_ativity =   <div className= "modal mt-5 fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
    
                 <div className="modal-header">
                     <h5 className="modal-title">Create Activity</h5>
                         <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={this.handleActivityModelClose}>
                          <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
    
            <div className="modal-body">
                 <div className="table-responsive " style={{overflow:'auto',height:"400px"}}>
                     <form onSubmit={this.handleSubmit} id="form_send_create_activity">
    
                         <div className="form-group">
                         
                         <div className="row">
                            <div className="col-md-7 col-lg-7">
                              
                                   <SelectContainer type="text" title="Activity Group" items={this.state.activityGroups} label_class="col-md-4 col-lg-4 col-xs-4 col-sm-4" select_class="form-control col-md-8 col-lg-8 col-sm-8 col-xs-7" name="group_name"  />
                            </div>
                        
                            <div className="col-md-5 col-lg-5 d-flex align-items-center" href="#" onClick={()=>this.create_group_activity()}>
                               <i className="fa fa-plus" aria-hidden="true"></i>
                           </div>
                         
                         </div>
    
                         </div>
                       
                         <div className="form-group col-md-12 col-lg-12"> 
                         <InputContainer type="text"  title="Activity" class_label="col-md-4 col-lg-4 col-xs-4 col-sm-4"  class_input="form-control col-md-6 col-lg-6 col-sm-7 col-xs-7" name="name" id="name" /> </div>
                         <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12"> <InputContainer type="date" class_label="col-md-4 col-lg-4 col-xs-4 col-sm-4" title="Planned Start Date" class_input="form-control col-md-6 col-lg-6 col-sm-7 col-xs-7" name="plannedDt" id="plannedDt" /> </div>
                         <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12"> <InputContainer type="date" class_label="col-md-4 col-lg-4 col-xs-4 col-sm-4"  title="Planned End Date" class_input="form-control col-md-6 col-lg-6 col-sm-7 col-xs-7" name="plannedendDt" id="plannedendDt" /> </div>
                         <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12"> <InputContainer type="date" class_label="col-md-4 col-lg-4 col-xs-4 col-sm-4"  title="Actual Start Date" class_input="form-control col-md-6 col-lg-6 col-sm-7 col-xs-7" name="actualstartDt" id="actualstartDt" /> </div>
                         <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12"> <InputContainer type="date" class_label="col-md-4 col-lg-4 col-xs-4 col-sm-4"  title="Actual End Date" class_input="form-control col-md-6 col-lg-6 col-sm-7 col-xs-7" name="actualendDt" id="actualendDt" /> </div>
                         <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12"><div className="row"><label>Assign</label><div id="member_list"></div></div></div>
                         <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12"> <InputContainer class_label="col-md-4 col-lg-4 col-xs-4 col-sm-4"  type="file"  title="Upload File" class_input="form-control col-md-6 col-lg-6 col-sm-7 col-xs-7" name="resource" id="resource" /> </div>
    
                         <div className="form-group col-md-12 col-lg-12"> <InputContainer type="text"  title="Status" class_label="col-md-4 col-lg-4 col-xs-4 col-sm-4"  class_input="form-control col-md-6 col-lg-6 col-sm-7 col-xs-7" name="status" id="status" /> </div>
                        
                         <div className="form-group col-md-12 col-lg-12 col-xs-12 col-sm-12">
                         <div className="row">
                        <label className="col-md-2 col-lg-2 col-xs-4 col-sm-2">Remark</label>
                         <textarea className="col-md-10 col-lg-10 col-sm-10 col-xs-8"  rows="5" name="remark" id="remark"   /> 
                         </div>
                         </div>
                        
                         
                     <div className="form-group">
                           {/* <CKEditor   data="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />
                  */}
                     </div>
                
                 <div className="form-group" >
                     <div className="d-flex justify-content-center">
                     <button type="submit" className="p-1 w-25 ">Save</button>  
                     </div>
                 </div>
                
                 </form>
               
    </div>
    </div>
    </div>
    </div>
    </div>;
    const create_group_workcorrespond_model=  <div className= "modal mt-5  fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
         <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
    
                 <div className="modal-header">
                      <h5 className="modal-title">Work correspondence</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleWorkCorrespondModelClose}>
                      <span aria-hidden="true">&times;</span>
                     </button>
                </div>
    
           <div className="modal-body">
               <div className="table-responsive " style={{overflow:'auto',height:"400px"}}>
                   <form onSubmit={this.handleSubmit} id="form_send_work_correspond">
                       <div className="form-group">
                          <InputContainer type="text" title="Subject" class_label="col-md-2 col-lg-2 col-sm-2 col-xs-3" class_input="form-control col-md-8 col-lg-8 col-sm-8 col-xs-7" className="form-control col-md-10 col-lg-10 ml-3" name="name" id="name" required={true}  />
                       </div>
                   <div id="members" className="ml-3 mb-3">
                        
                   </div>
                   <div className="form-group ml-3"> <InputContainer type="file"  multiple title="Upload Document" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf,image/*" input_class="form-control col-md-6 col-lg-6" name="file_upload[]" id="file_upload[]" /> </div>
    
           <div className="form-group">
          
                 <CKEditor   data="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" onChange={this.handleCkEditor} />
           
           </div>
          
           <div className="form-group" >
               <button type="submit"  style={{float:'right'}} className="btn-primary btn-md ">SEND</button>  
           </div>
          
           </form>
               
     
    </div>
    </div>
    </div>
    </div>
    </div>;
    
    
const child = <table width="100%" id="tbl_groups" className="table table-sm table-responsive-md table-responsive-xl table-striped"  style={{backgroundColor:'white'}}>
                           <thead>
                                     <th className="text-center">Sr No</th>
                                     <th className="text-center">Group Details</th>
                                     <th className="text-center">Members</th>
                                     <th className="text-center" >Project Details</th>
                                     <th className="text-center" >Work correspondence</th>

                                     <th className="text-center">Activity Plan</th>
                           </thead><tbody> 
                      {this.state.groups.map((value,i)=>(
                 <tr>
                     <td width="10%"  className="text-center">{i+1}</td>
                     <td width="15%"><div className="form-group"><div className="row">{Object.entries(value.group_details).map(([key,value])=>(!this.state.filters.includes(key)?
                        
                            <div>{value}</div> 
                        :""))}</div></div></td>
                     <td width="15%"  className="text-center">{
                          this.members_details(value.member_details)
                     }</td>
                     <td width="15%"  className="text-center">{this.project_details(value.project_details)}</td>
                     <td width="15%"  className="text-center"><a href="#" onClick={()=>this.members_details1(value.member_details,value.group_details.id,value.project_details)}   style={{color:'#00f'}} ><div className="d-flex justify-content-center"> <i className="fa fa-send"></i></div></a></td>
                     <td width="15%"  className="text-center"> 
                       <div className="form-group">
                           <div className="row d-flex justify-content-center">
                            <div className="w-auto">
                           
                   
                           <a href="#" onClick={()=>this.create_task(value.project_details,value.group_details.id,value.member_details)} style={{color:'#00f'}}>    <div className="column">     <label >Add</label><i className="fa fa-plus" aria-hidden="true" /></div></a>
                          
                           </div>
                        <div className="col-md-2 col-lg-2"> 
                        <label className="col-md-6 col-lg-6">View</label>
                        <a href="#" className="col-md-6 col-lg-6" onClick={()=>this.view_task(value)} style={{color:'#00f'}}><i className="fa fa-wpforms" aria-hidden="true" /></a>
                        </div>
                        </div>
                        </div>
                     </td>
                 </tr>

        ))}</tbody></table>
        return (
            <div>
                <input id="group_id" name="group_id"  type="hidden"/>
                <input id="project_id" name="project_id" type="hidden" />
                {/* table layout */}
                 {child}
                {/* work correspond model */}
               
                {create_group_workcorrespond_model}
              
                 {/* create activity model */}
                
                {create_ativity}   
                
                {/* create_activity_group_model */}
                
                {create_activity_group_model}

                {view_activity_task}




    </div>

 

        );
    }
}

export default view_groups;
