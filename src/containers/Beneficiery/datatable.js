import React,{Component} from 'react';
import {Link} from 'react-router';
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import APIS from '../../APIS/APIS';
import Paper from 'material-ui/Paper';

class DatatablePage extends Component {
constructor(props){
  super(props);
  this.state = {count:[1,2],filters:['id','university','address','email','aemail','etype','member_id','nemail','photograph'],nav_route:['/dashboard/student_beneficiery/edit','/dashboard/acadyanamic_beneficiery/edit','/dashboard/ngo_beneficiery/edit','/dashboard/senior_partner_beneficiery/edit'],beneficiery_type:['Interns','Academician','NGO','Seniorpartner']};
  console.log(this.props.data);
}
 
render(){ 
   const v =  this.props.data.map((value,i)=>(<div className="mt-3 mb-3" >
                                                     
                                                           <div style={{display:'flex',justifyContent:'center'}}>
                                                              <label style={{fontSize:'23px',fontFamily:'cursive'}}>{this.state.beneficiery_type[i]}</label>
                                                              </div>
                                                      <div className="row col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{display:'flex',justifyContent:'center'}}>
                                                                  
                                                            {value.rows.map((rows_vaue)=>
                                                                    <Paper className="column col-md-3 col-lg-3 col-sm-6 col-xs-12 m-3" style={{alignItems:'center'}}>
                                                                                <table className="table" width="100%">
                                                                                       <tr>
                                                                                            <td colSpan="12">
                                                                                                  <div style={{width:'100%',display:'flex',justifyContent:'center'}}> 
                                                                                                       <img className="rounded p-3" alt="Responsive image" src={APIS.upload_path+rows_vaue.photograph}></img>
                                                                                                  </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                            {Object.entries(rows_vaue).map(([key,value])=>(!this.state.filters.includes(key)?
                                                                                            
                                                                                            <tr>
                                                                                                  <td width="30%">
                                                                                                       <h6>
                                                                                                               {((key.charAt(0) == 'a') || (key.charAt(0) == 'n')) && (key.slice(0,2) != "na")  ? key.slice(1).charAt(0).toUpperCase() + key.slice(2):key.slice(0).charAt(0).toUpperCase() + key.slice(1)}
                                                                                                       </h6>
                                                                                                  </td>
                                                                                                  
                                                                                                        <td width="70%">
                                                                                                            <div style={{wordBreak:"break-all"}}>
                                                                                                                     {value.charAt(0).toUpperCase()+value.slice(1)}
                                                                                                            </div>
                                                                                                         </td>
                                                                                                         </tr>:""))}<tr><td width="30%"><h6>Beneficiery Category:</h6></td><td width="70%"><label>{this.state.beneficiery_type[i]}</label></td></tr></table><div style={{backgroundColor:'#ff9a00',color:'white',padding:'5px',marginBottom:'5px', display:'flex',justifyContent:'space-between'}}><Link className="col-md-6" style={{fontSize: 20,textAlign:'center',color:'black'}} >More</Link><Link className="col-md-6" style={{fontSize: 20,textAlign:'center'}} to={ console.log("i: "+i), this.state.nav_route[i]+'/'+JSON.stringify(rows_vaue)} >Edit</Link></div></Paper>)}</div></div>));
   
  

  return (
  <div> 
{v}
<div className="h-50"></div>
  
  </div>
  );
}
}

// DatatablePage.propTypes = {
//     data: PropTypes.object,
//   };

  export default DatatablePage;