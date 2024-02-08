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
class user extends Component {
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
                        <a href="#" data-toggle="dropdown" aria-haspopup="true"  id="dropdownMenuButton">Project
                           </a>
                           <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                <Link to="/dashboard/add_project" className="dropdown-item">Add
                                   </Link>
                                    <Link to="/dashboard/view_project/view" className="dropdown-item">View
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
                   <div className="nav-item">
                        <Link to="/dashboard/view_project_groups">My Project Groups
                           </Link>
                           {/* <div className="dropdown-menu" labelledby="dropdownMenuButton">
                                
                                    <Link to="/dashboard/view_product/" className="dropdown-item">View
                                         </Link>
                            </div> */}

                   </div>
       </div> 
            
        );
    }
}
user.PropTypes = {
    handleChangeRequestNavDrawer:PropTypes.func
};
export default user;
