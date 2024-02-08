import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Link} from 'react-router';
import { black } from 'material-ui/styles/colors';
import UserHeaderItems from '../components/NavBars_Items/user';
import AdminHeaderItems from '../components/NavBars_Items/admin';
// import { Navbar, Nav, NavItem } from 'react-bootstrap';


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
  
    let localstyles={
      paddingLeft: 0
    };    
class header1 extends Component {
  constructor(props){
    super(props);
  
  }
  componentWillUpdate(){
   // alert(JSON.stringify(this.props.styles));
 localstyles = this.props.styles;
  }
   logout(){
     localStorage.removeItem('Authentication');
     localStorage.removeItem("token");
     localStorage.removeItem('firstname');
     localStorage.removeItem('lastname');
     localStorage.removeItem('member_obj');
     this.props.router.push('/');
   } 
    render() {
      //alert(JSON.stringify(localstyles));
         const {handleChangeRequestNavDrawer} = this.props;
         let user_type = localStorage.getItem('user_type') ;
  
        return (
     
    <div className="row" style={{...style.appBar,...localstyles,...{transition:'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',boxSizing:'border-box',zIndex:'1100'}}}>
             
        {user_type == 0 ? <UserHeaderItems handleChangeRequestNavDrawer={handleChangeRequestNavDrawer} />:<AdminHeaderItems handleChangeRequestNavDrawer={handleChangeRequestNavDrawer}  />}
              
       <div className="h-100" style={{position:'absolute',right:0,alignItems:'center',display:'flex'}}>
                 <div className="row h-100" >
                       <img style={{height:40,width:40,alignSelf:'center',padding:5}} src={require('../images/download.png')}></img>
                            <div className="h-100" style={{display:'flex',alignItems:'center'}} ><h6 style={{color:'black'}}>{localStorage.getItem('firstname')+" "+ localStorage.getItem('lastname')}</h6>
                               </div>
                          <IconMenu color={black}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={black}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                                        <MenuItem primaryText="Profile" containerElement={<Link to="/dashboard/profile"/>}/>
                                        <MenuItem primaryText="Change Password" containerElement={<Link to="/dashboard/change_password"/>}/>
                                        <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)} containerElement={<Link to="/"/>}/>

                  </IconMenu>
                

                 </div>
        </div>

</div>
        );
    }
}

export default header1;
