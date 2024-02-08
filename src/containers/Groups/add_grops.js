import React, { Component } from 'react';
import RowInput from '../../containers/row_input_elements/inputs';
import RowSelect from '../../containers/row_input_elements/select';
import APIS from '../../APIS/APIS';
// import { renderToString } from 'react-dom/server';


class add_grops extends Component {
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem=    this.deleteItem.bind(this);
        this.get_data=this.get_data.bind(this);
        this.add_members_div = this.add_members_div.bind(this);
        this.state = {project_type:[{id:'1',name:'Project'},{id:'2',name:'Research'}],members_ids:[],innrHtml:<div/>, project_id:'',project_category:'',project_categories:[],projects:[],intersed_members:[],sectors:[],categories:[]};
    }
    handleSubmit(e){
      //alert(e.target.id);
      e.preventDefault();
      let url = APIS.baseurl+APIS.group_module+"6";
      let formData = new FormData(document.getElementById('group_create_form'));
      fetch(url,{method:'POST',body:formData}).then(response=>
                                   response.json().
                                    then(res=>
                                         {   
                                           if(res.success){
                                            alert(res.message);
                                           }
                                          }
                                        )
                        );
    }
    handleSelect(id,value){
       // alert(value);
        switch(id){
            case 'project_type':
                  this.get_data(value,"3");
                  break;
            case  'category':this.get_data(value,"4");
                  break;      
            case 'project_id':
                  this.get_data(value,"5");
                  break;
            case 'interested_member_id':
                //alert(id.target.value);
                  this.add_members_div(value);
                  break;   
            case 'project_cat_id':
                  this.get_data(value,"1");
                  break; 
            case  'sector':this.get_data(value,"2");
                break;        
               
        }
    }
  deleteItem(e){
   // alert(e.target.id); 
    let index =this.state.members_ids.indexOf(e.target.id);
    if(index > -1)
      this.state.members_ids.splice(index,1);
      this.setState({members_ids:this.state.members_ids});
      document.getElementById("members_"+e.target.id).remove();

}
    add_members_div(id){
           let div = document.getElementById('interested_members');
           let string  = id.target.options[id.target.selectedIndex].text;
           const element =  <div>{this.state.innrHtml}<span className="tag label label-info col-md-12 col-lg-12" id={"members_"+id.target.value}><span className="col-md-6 col-lg-6">{string}</span><a className="col-md-6 col-lg-6" href="#" id={id.target.value} name={id.target.value} onClick={(e)=>this.deleteItem(e)}><i className="fa fa-close"></i></a> </span></div>;
     //      alert(id.target.id);
           if(string != "Select" ){
            let element1 =document.getElementById('members_'+id.target.value); 
            if( element1 == null){
                  this.setState({innrHtml:element});
                  this.state.members_ids.push(id.target.value);
             }
             else {
                 alert("member already added..");
             }
           }
    }
    get_data(value1,type){


        let category_id = document.getElementById('project_cat_id');
        let sector  = document.getElementById('sector');
        let project_type = document.getElementById('project_type');
        let url = APIS.baseurl+APIS.group_module+type;
        let formData = new FormData();
        formData.append('project_type',project_type.value);
        
        type == "1" ?  formData.append('category_id',category_id.value):
        type == "2" ?  formData.append('sector_id',sector.value):
        type == "3" ?  formData.append('type',''):
        type == "5" ?  formData.append('project_id',value1):"";
       
        let previous_members = document.getElementById('members_ids');
        if(previous_members != null)
           {
             let value = previous_members.value;
             let members = value.split(",");
            this.setState({members_ids:[]});
             members.forEach(element => {
            //     alert(document.getElementById( element));
            //    this.deleteItem(document.getElementById(element));
          
             let members_element=   document.getElementById("members_"+element);   
            if(members_element != null){
              members_element.remove();
             
              
            }
          
          
              
           });
          }
        
        fetch(url,{ method:'POST',body:formData}).
                                then(response=>
                                            response.json().
                                                     then(res=>
                                                        {
                                                            if(type == "1")
                                                            this.setState({projects:res});
                                                            else if(type == "2")
                                                            this.setState({project_categories:res});
                                                            else if(type == "3")
                                                            this.setState({categories:res});
                                                            else if(type == "4")
                                                            this.setState({sectors:res});
                                                            else if(type == "5")
                                                            this.setState({intersed_members:res});

                                                        }
                                                        )
                                     );
                     
                                
                                
                                
                 }
    render() {
        return (
            <form id="group_create_form" onSubmit={this.handleSubmit}>

                <div className="d-flex justify-content-center">
                <input type="hidden"  name="members_ids" id="members_ids" value={this.state.members_ids.join()} />
            <div className="col-md-6 col-lg-6 ">
                <div className="form-group m-3">    
                           <RowInput name="name" id="name" require={true} class_input="col-md-8 col-lg-8 form-control" title="Group Name"  />
                
                </div>
            <div className="form-group m-3">
            <div className="row ">
                <label className="form-label col-md-4 col-lg-4">Group Description</label>
               <textarea className="form-control col-md-8 col-lg-8" name="group_description" id="group_description"   />
                
            </div>

            <div className="form-group mt-3">
              <RowSelect name="project_type" id="project_type" select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" title="Project Type" items={this.state.project_type} require={true} hanldleChange={(e)=>this.handleSelect(e.target.id,e.target.value)}  />                
            </div>
            <div className="form-group mt-3">
              <RowSelect name="category" id="category" select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" title="Category" items={this.state.categories} require={true} hanldleChange={(e)=>this.handleSelect(e.target.id,e.target.value)}  />                
            </div>
            <div className="form-group mt-3">
              <RowSelect name="sector" id="sector" select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" title="Sector" items={this.state.sectors} require={true} hanldleChange={(e)=>this.handleSelect(e.target.id,e.target.value)}  />                
            </div>
            <div className="form-group mt-3">
              <RowSelect name="project_cat_id" id="project_cat_id" select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" title="Project Category" items={this.state.project_categories} require={true} hanldleChange={(e)=>this.handleSelect(e.target.id,e.target.value)}  />                
            </div>
            <div className="form-group mt-3">
              <RowSelect name="project_id" id="project_id" select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" title="Projects" items={this.state.projects} require={true} hanldleChange={(e)=>this.handleSelect(e.target.id,e.target.value)}  />                
            </div>
            <div className="form-group mt-3">
              <RowSelect name="interested_member_id" id="interested_member_id" select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" title="Interest Members" items={this.state.intersed_members} require={true} hanldleChange={(e)=>this.handleSelect(e.target.id,e)}  />                
            </div>
            <div className="form-group mt-3">
                <div className="row">
                    <div className="col-md-4 col-lg-4"></div>
                           <div name="interested_members" id="interested_members" className="form-control col-md-8 col-lg-8 h-auto p-3"  required  >
                           {this.state.innrHtml}
                            </div>  
                    </div>              
            </div>
            <div className="form-group mt-3">
                <div className="row">
                    <div className="col-md-4 col-lg-4"></div>
                           <div className="col-md-8 col-lg-8 d-flex justify-content-center"  required  >
                           <button type="submit" className="btn-primary col-md-4 col-lg-4">Save</button>  
                            </div>  
                    </div>              
            </div>
            </div>
            </div> 
            </div>
            </form>
        );
    }
}

export default add_grops;
