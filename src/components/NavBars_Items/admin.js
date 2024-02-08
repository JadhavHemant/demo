import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {white} from 'material-ui/styles/colors';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {Link} from 'react-router';
const style = {
    appBar: {
      position: 'fixed',
      backgroundColor:"#ff9a00",
      top: 0,
      padding: 0,
      maxHeight: 57,
      width:'100%'
    },
    menuButton: {
      marginLeft: 10
    },
    iconsRightContainer: {
      width:'25%'
    },
    logo1:{width:'40px',height:'40px',padding:'5px'},
    logo:{
        width:'30px',
        hight:'30px'
    }
  };
class admin extends Component {
    render() {
        const   {handleChangeRequestNavDrawer} = this.props;
           return (
       
                  <div className="navbar w-75">
                      <div onClick={handleChangeRequestNavDrawer} >
                            <Menu color={white} /> 
                      </div>
                             <div className="img-hover-zoom"><img style={style.logo1} src={require('../../images/pcombinator.png')}/> 
                                 </div>                   
                             <div className="nav-item"><Link className="nav-link active" to="/dashboard/Connects/1">Connects</Link> 
                                 </div>
             
                 <div className="nav-item"><a href="http://www.passionframework.org" target="_blank">About Us
                                             </a> 
                     </div>
                  
                     <div className="dropdown nav-item">
                           <a href="#" data-toggle="dropdown" aria-haspopup="true"  id="dropdownMenuButton">Beneficiary
                              </a>
                              <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                   <Link to="/dashboard/beneficiary" className="dropdown-item">Add
                                      </Link>
                                       <Link to="/dashboard/view_beneficiery" className="dropdown-item">View
                                            </Link>
                               </div>
   
                      </div>

                          
                      <div className="dropdown nav-item">
                           <a href="#" data-toggle="dropdown" aria-haspopup="true"  id="dropdownMenuButton">Research
                              </a>
                              <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                   <Link to="/dashboard/research_project/" className="dropdown-item">Add
                                      </Link>
                                       <Link to="/dashboard/view_project/research" className="dropdown-item">View
                                            </Link>
                                        <a className="dropdown-item" href="https://osf.io/" target="_blank">  Share Research</a>    
                              </div>
   
                      </div>
                      <div className="dropdown nav-item">
                           <a href="#" data-toggle="dropdown" aria-haspopup="true"  id="dropdownMenuButton">Opportunities
                              </a>
                              <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                   <Link to="/dashboard/post_job/" className="dropdown-item">Add
                                    </Link>
                                       <Link to="/dashboard/view_post_job/" className="dropdown-item">View
                                            </Link>
                               </div>
   
                      </div>
                      <div className="dropdown nav-item">
                           <a href="#" data-toggle="dropdown" aria-haspopup="true"  id="dropdownMenuButton">Products
                              </a>
                              <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                   <Link to="/dashboard/add_product/" className="dropdown-item">Add
                                         </Link>
                                       <Link to="/dashboard/view_product/" className="dropdown-item">View
                                            </Link>
                               </div>
   
                      </div>
                      <div className="dropdown nav-item">
                      <a href="#" data-toggle="dropdown" aria-haspopup="true"  id="dropdownMenuButton">Manage Project
                              </a>
                              
                           {/* <Link to="/dashboard/add_project_groups">Manage Project
                              </Link> */}
                              <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                       <Link to="/dashboard/add_project" className="dropdown-item">Create Project
                                       </Link>
                                       <Link to="/dashboard/view_project/view" className="dropdown-item">View Projects</Link>
                                       <Link to="/dashboard/add_project_groups" className="dropdown-item">Create Groups
                                       </Link>
                                       <Link to="/dashboard/view_project_groups" className="dropdown-item">View Groups
                                                                              </Link>
                                      <a className="dropdown-item" target="_blank" href="http://projectmanagement.pcombinator.com">Project Management Tool</a>
                                 
                               </div>
   
                      </div>
                      <div className="dropdown nav-item">
                      <a href="https://surveys.happy-monk.com/InterviewLinks.jsp 
  " target="_blank">Pitch
                              </a>
                      </div>
                      <div className="nav-item dropdown">
                      <a href="#" data-toggle="dropdown" aria-haspopup="true"  id="dropdownMenuButton">Masters                              </a>
                              
                           {/* <Link to="/dashboard/add_project_groups">Manage Project
                              </Link> */}
                              <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                   
                                       <li className="dropdowns w-100 pr-4 pl-2">
                                         <a className="dropbtn">Connects <i  style={{float:'right'}} className="fa fa-angle-right "></i></a>
                                         <div className="dropdown-content ml-5" labelledby="connect_drop_down">
                                        <Link to="/dashboard/upload_csv/1/mentors">Add Connects</Link>  
                                        <Link to="/dashboard/upload_csv/1/categories">Add Categories</Link>

                               </div>
                                       </li>
                                       <li className="dropdown1 w-100 pr-4 pl-2">
                                          <a className="dropbtn1">Projects 
                                              <i  data-toggle="dropdown" aria-haspopup="true" style={{float:'right'}} className="fa fa-angle-right">

                                              </i>
                                           
                                          </a>
                                          <div className="dropdown-content1 ml-5" labelledby="project_dropdown">
                                   <Link to="/dashboard/upload_csv/2/project_category">Add Categories</Link>
                                   <Link to="/dashboard/upload_csv/2/sectors"> Add Sectors</Link>
                               </div>
                                       </li>
                                       
                                       <li className="dropdown2 w-100 pr-4 pl-2"> 
                                                 <a className="dropbtn2">
                                                   Reasearch
                                                 <i  data-toggle="dropdown" aria-haspopup="true" style={{float:'right'}} className="fa fa-angle-right">
                                                 </i>
                                                
                                                </a>
                                                <div className="dropdown-content2 ml-5" labelledby="research_drop_down">
                                                      <Link to="/dashboard/upload_csv/3/research_categories">Add Categories</Link>
                                                      <Link to="/dashboard/upload_csv/3/sectors">Add Sectors</Link> 
                                                </div> 
                                       </li>
                                       
                                       <li className="dropdown3 w-100 pr-4 pl-2" ><a className="dropbtn3">Product <i  data-toggle="dropdown" aria-haspopup="true"  style={{float:'right'}} className="fa fa-angle-right">
                                                 </i>
                                                
                                                </a> 
                                                <div className="dropdown-content3 ml-5" labelledby="product_drop_down">
                                                       <Link to="/dashboard/upload_csv/4/product_category">Add Categories</Link>
                                                       <Link to="/dashboard/upload_csv/4/product_subcategory">Add Subcategory</Link>
                                                       <Link to="/dashboard/upload_csv/4/product_main_category"> Add Sector</Link>
                                                 </div>

                                   </li>
                                   <li className="dropdown3 w-100 pr-4 pl-2" ><a className="dropbtn3">Opportunity <i  data-toggle="dropdown" aria-haspopup="true"  style={{float:'right'}} className="fa fa-angle-right">
                                                 </i>
                                                
                                                </a> 
                                                <div className="dropdown-content3 ml-5" labelledby="product_drop_down">
                                                       <Link to="/dashboard/upload_csv/4/job_type">Add Opportunity Type</Link>
                                                       <Link to="/dashboard/upload_csv/4/job_sectors">Add Sectors</Link>
                                                      
                                                 </div>

                                   </li>
                                  
                                      <a className="dropdown-item" target="_blank" href="http://projectmanagement.pcombinator.com">Project Management Tool</a>
                                 
                               </div>
                               

                               <div className="dropdown-menu" labelledby="opportunity_drop_down">
                                   <Link to="/dashboard/">Add Categories</Link>
                                   <Link to="/dashboard/">Add Sectors</Link>
                               </div>
   
                      </div>
          </div> 
               
           );
       }
   }
   admin.PropTypes = {
       handleChangeRequestNavDrawer:PropTypes.func
   };


export default admin;
