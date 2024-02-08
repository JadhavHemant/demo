import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
  isMobile
} from "react-device-detect";
import { black } from 'material-ui/styles/colors';
//import { Link } from 'react-router';
let localstyles;
class Header extends React.Component {
  constructor(props){
super(props);
  }

  componentWillUpdate(){
    //alert(JSON.stringify(this.props.styles));
localstyles = this.props.styles;
  }
  render() {
    const {handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        backgroundColor:"#ff9a00",
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        width:'25%'
      }
    };
    

    return (
        <div>
            <AppBar
              style={{...localstyles, ...style.appBar}}
              title={isMobile == false ? <ul className="nav nav-bar" style={{listStyle:'none'}}>
                <li className="nav-item" style={{marginRight:'2.5rem'}} active><Link to="dashboard/Connects" className="nav-link"><small>Connects</small></Link></li>
                {/* <li className="nav-item" style={{marginRight:'2.5rem'}}><Link to="dashboard/Connects" className="nav-link"><small>Categories</small></Link></li> */}
                <li className="nav-item" style={{marginRight:'2.5rem'}}><a href="https://passionframework.org" className="nav-link"> <small>About Us</small></a></li>
                {/* <li className="nav-item" style={{marginRight:'2.5rem'}}><Link to="dashboard/beneficiary" className="nav-link">  <small>Beneficiary</small> </Link></li> */}
                <div>
             
             <IconMenu color={black}
                       iconButtonElement={
                            <div><small style={{color:'black'}}>Beneficiary</small></div>
                       }
                       targetOrigin={{horizontal: 'right', vertical: 'center'}}
                       anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
               <MenuItem key={1} primaryText="Add" containerElement={<Link to="/dashboard/beneficiary" />}/>
               <MenuItem key={2} primaryText="View" containerElement={<Link to="/dashboard/view_beneficiery"/>}/>
               </IconMenu>
                {/* <IconMenu color={white}
                    s   iconButtonElement={
                         <IconButton ></IconButton>
                       }
                       targetOrigin={{horizontal: 'right', vertical: 'top'}}
                       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
             >
               <MenuItem />
             </IconMenu>  */}
           </div>
              </ul>:<label style={{fontSize:'18px',color:black}}>Passion Framework</label>
                // <SearchBox />
              }
              iconElementLeft={
                
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
                  
              }
              iconElementRight={
            !isMobile ?   <div className="row h-100 w-100" >
                  <img style={{height:40,width:40,alignSelf:'center',padding:5}} src={require('../images/download.png')}></img>
                                 <div className="h-100" style={{display:'flex',alignItems:'center'}} ><h2  style={{color:'black'}}>{localStorage.getItem('firstname')+" "+ localStorage.getItem('lastname')}</h2>
                                 
                                 </div>
                                 <IconMenu color={black}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={black}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Sign out" containerElement={<Link to="/"/>}/>
                    <MenuItem primaryText="Change Password" containerElement={<Link to="/dashboard/change_password"/>}/>
                    
                  </IconMenu>
                {
                 
                }

                </div>:""
              }
           iconStyleRight={{marginLeft:'auto',width:'39%'}}
            />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
