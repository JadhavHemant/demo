import React,{Component} from 'react';
import {Link} from 'react-router';
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import APIS from '../../APIS/APIS';
import loash from 'lodash';
import Paper from 'material-ui/Paper';
//import JobComponent from '../Job/jobComponent';

class view_projects extends Component {
    constructor(props){
        super(props);
        this.state = {count:[1,2],filters:['id','commercial','commercial_amount','category','sector','project_category','proj_reg_date','start_date','end_date','member_id'],nav_route:['/dashboard/student_beneficiery/edit','/dashboard/acadyanamic_beneficiery/edit','/dashboard/ngo_beneficiery/edit'],beneficiery_type:['Student','Academician','NGO','Referral'],data:{}};
       // console.log(this.props.data);
       this.connect = this.connect.bind(this);
      }
      componentDidMount(){
          let url = APIS.baseurl+APIS.project_module;  
          let formData = new FormData();
          formData.append("cat_id",this.props.params.id);
          formData.append("member_id",localStorage.getItem('token'));
          fetch(url+"4",{method:'POST',body:formData}).then(response=>response.json().then(res=>{
           // alert(JSON.stringify(res.member_projects));  
            this.setState({data:res});
      
        }));
              }
              connect(data){
               // alert(JSON.stringify(data));

                let cat_id = this.props.router.params.id;
                let obj = localStorage.getItem('member_obj');
                let obj1 = JSON.stringify(data);
                let mid = localStorage.getItem('token');
                let cid = data.id;
                
                alert("please wait few seconds sending details to admin..");
                
                const formData = new FormData();
                
                formData.append("cat_id",cat_id);
                formData.append("user_details",obj);
                formData.append("cid",cid);
                formData.append("mid",mid);
                formData.append("type",0);
                formData.append("project_details",obj1);
                formData.append("category_name",this.props.router.params.name);
                
                let url = APIS.baseurl+ APIS.project_module+"6";
                
                fetch(url,{method:'POST',body:formData}).then(response=>response.json().then(res =>{
                  if(res.success){
                    alert(res.message);
                  
                  }
                }));
                
              }
        
      render(){ 
        const styles={
          links: {
              ":hover": {color: "red", textDecoration: "none"}
          },
          fonts:{fontSize:'20px'}
      };
        const v =  Object.entries(this.state.data).map(([main_key,main_value])=>(<div><div className="form-group d-flex justify-content-center"><h5 style={{fontFamily:'cursive'}}>{main_key.charAt(0).toUpperCase()+main_key.slice(1)}</h5></div>{(loash.chunk(main_value,2).map((chunks)=>(<div className="row d-flex justify-content-center"> {chunks.map((value)=>( <Paper className="col-md-4 col-lg-4 col-sm-6 col-xs-11 mx-lg-5 mx-md-5 my-lg-5 my-md-5 mx-3 my-3 h-100"  style={{alignItems:'center'}}>
                                                                                      <div className="table-responsive">
                                                                                      <table width="100%" className="table">
                                                                                                
                                                                                                   {Object.entries(value).map(([key,value])=>(!this.state.filters.includes(key)?
                                                                                                  
                                                                                                  <tr>
                                                                                                        <td width="40%" style={{height:'15px'}}>
                                                                                                             <h6>
                                                                                                                     {key.charAt(0).toUpperCase()+key.slice(1).replace("_"," ")}
                                                                                                             </h6>
                                                                                                        </td>
                                                                                                         
                                                                                                              <td width="60%">
                                                                                                                  <lable>
                                                                                                                           {value.charAt(0).toUpperCase()+value.slice(1)}
                                                                                                                  </lable>
                                                                                                               </td>
        </tr>:""))}</table></div><div className="position-relative h-25 " style={{backgroundColor:'#ff9a00',color:'white',padding:'5px',marginBottom:'5px', display:'flex',justifyContent:'space-between'}}><Link className="col-md-6" style={{fontSize: 20,textAlign:'center',color:'black'}} ><h5>More</h5></Link><Link className="col-md-6" style={styles.fonts} to={main_key != "Other Projects"?"/dashboard/add_project/0/"+JSON.stringify(value):"http://localhost:3000/dashboard/view_projects/#/#"} onClick={()=>main_key == "Other Projects"?this.connect(value):""} ><h5>{main_key == "Other Projects" ? "Interested":"Edit"}</h5></Link></div></Paper>))}</div>)))}</div>));
        //  const v =  this.state.data.map((value,i)=>(<div className="mt-3 mb-3" >
                                                           
        //                                                          <div style={{display:'flex',justifyContent:'center'}}>
        //                                                             <label style={{fontSize:'23px',fontFamily:'cursive'}}>{this.state.beneficiery_type[i]}</label>
        //                                                             </div>
        //                                                     <div className="row col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{display:'flex',justifyContent:'center'}}>
                                                                        
        //                                                           {value.rows.map((rows_vaue)=>
        //                                                                   <Paper className="column col-md-3 col-lg-3 col-sm-6 col-xs-12 m-3" style={{alignItems:'center'}}>
        //                                                                               <table width="100%">
        //                                                                                      <tr>
        //                                                                                           <td colSpan="12">
        //                                                                                                 <div style={{width:'100%',display:'flex',alignItems:'center'}}> 
        //                                                                                                      <img className="img-fluid" alt="Responsive image" src={APIS.upload_path+rows_vaue.photograph}></img>
        //                                                                                                 </div>
        //                                                                                           </td>
        //                                                                                       </tr>
        //                                                                                           {Object.entries(rows_vaue).map(([key,value])=>(!this.state.filters.includes(key)?
                                                                                                  
        //                                                                                           <tr>
        //                                                                                                 <td width="30%">
        //                                                                                                      <label>
        //                                                                                                              {((key.charAt(0) == 'a') || (key.charAt(0) == 'n')) && (key.slice(0,2) != "na")  ? key.slice(1).charAt(0).toUpperCase() + key.slice(2):key.slice(0).charAt(0).toUpperCase() + key.slice(1)}
        //                                                                                                      </label>
        //                                                                                                 </td>
                                                                                                        
        //                                                                                                       <td width="70%">
        //                                                                                                           <lable>
        //                                                                                                                    {value.charAt(0).toUpperCase()+value.slice(1)}
        //                                                                                                           </lable>
        //                                                                                                        </td>
        //                                                                                                        </tr>:""))}<tr><td width="30%"><label>Beneficiery Category:</label></td><td width="70%"><label>{this.state.beneficiery_type[i]}</label></td></tr></table><div style={{backgroundColor:'#ff9a00',color:'white',padding:'5px',marginBottom:'5px', display:'flex',justifyContent:'space-between'}}><Link className="col-md-6" style={{fontSize: 20,textAlign:'center',color:'black'}} >More</Link><Link className="col-md-6" style={{fontSize: 20,textAlign:'center'}} to={ console.log("i: "+i), this.state.nav_route[i]+'/'+JSON.stringify(rows_vaue)} >Edit</Link></div></Paper>)}</div></div>))      
      try{
        return (
      
      
      Object.keys(this.state.data).length > 0 ?  <div> 
      
                  {v}
       </div>:<div></div>
        );
      }catch(error){
          return <div>Error</div>
      }
      }
      }
      

export default view_projects;
