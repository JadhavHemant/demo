import React from 'react';
import PropTypes  from 'prop-types';
//import Drawer from 'material-ui/Drawer';
// import {spacing, typography} from 'material-ui/styles';
// import {white} from 'material-ui/styles/colors';
//import MenuItem from 'material-ui/MenuItem';
//import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
///import 'react-pro-sidebar/dist/css/styles.css';
//import Menu  from 'material-ui/Menu';
//import {Link} from 'react-router';

//import Avatar from 'material-ui/Avatar';
//import { isArray } from 'util';

const LeftDrawer = () => {
  //let { navDrawerOpen , handleChangeRequestNavDrawer}  = props;

  // const styles = {
  //   logo: {
  //     cursor: 'pointer',
  //     fontSize: 22,
  //     color: typography.textFullWhite,
  //     lineHeight: `${spacing.desktopKeylineIncrement}px`,
  //     fontWeight: typography.fontWeightLight,
  //     backgroundColor: "#ff9a00",
  //     paddingLeft: 0,
  //     height: 55,
  //   },
  //   menuItem: {
  //     color: white,
  //     margin: '10px 0px 0px 0px',
  //     fontSize: 14
  //   },
  //   avatar: {
  //     div: {
  //       padding: '0px 10px 10px 0px',
  //       backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
  //       backgroundRepeat: 'noRepeat',
  //       backgroundAttachment: 'fixed',
  //       width: '100%',
  //       height: '150'
  //     },
  //     icon: {
  //       float: 'left',
  //       display: 'block',
  //       marginRight: 15,    
  //     },
  //     span: {
  //       paddingTop: 0,
  //       marginTop: 0,
  //       display: 'block',
  //       color: 'white',
  //       fontWeight: 400,
  //       justifyContent: 'center',
  //       textAlign:'center',
  //       fontSize:'large',
  //       height:100,
  //       textShadow: '1px 1px #444'
  //     }
  //   }
  // };

  return (
    <div>
      
    </div>
//     <ProSidebar>
//   <Menu >
//     <MenuItem>Dashboard</MenuItem>
//     <SubMenu title="Components">
//       <MenuItem>Component 1</MenuItem>
//       <MenuItem>Component 2</MenuItem>
//     </SubMenu>
//   </Menu>
// </ProSidebar>
    // <Drawer width={300} 
    // containerStyle={{overflow:'hidden'}}
    // docked={true}
    //   open={navDrawerOpen}>
    //     <div style={styles.logo}>
    //       {/* Admin */}
    //       <img src={require('../images/logo.png')}
    //        />
    //        {/* <img src={require('../images/arrow.png')} /> */}
    //     </div>
    //     <div style={styles.avatar.div}>       
    //     <div className="row">
    //       <div className="col-md-12" style={{display:'flex',justifyContent:'center'}}>

    //     <Avatar  src={require('../images/download.png')}
    //               size={100}
    //               style={styles.avatar.icon}/> 
    //      </div>
    //     </div>
    //     <div className="col-md-12" style={styles.avatar.span}><p style={{textAlign:'center', wordBreak:'break-word'}}>{props.username}</p></div>
    //     </div>
    //     <div style={{}}>
    //       {props.menus.map((menu, index) =>
    //           // !isArray(menu)?   
    //         <MenuItem
    //           onClick={handleChangeRequestNavDrawer}
    //           key={index}
    //           style={styles.menuItem}
    //           primaryText={menu.text}
    //           leftIcon={menu.icon}
    //           containerElement={<Link to={menu.link}/>}
    //         />
    //       )}
    //     </div>
    // </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
