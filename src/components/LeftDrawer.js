import React,  {Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import {spacing, typography} from 'material-ui/styles';
import {white} from 'material-ui/styles/colors';
//import MenuItem from 'material-ui/MenuItem';
//import Menu  from 'material-ui/Menu';
import {Link} from 'react-router';

import Avatar from 'material-ui/Avatar';
//import { isArray } from 'util';
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
const styles = {
  list: {
    width: 250,
  },
  links: {
    textDecoration:'none',
  },
  menuHeader: {
    paddingLeft: '30px'
  },
  logo: {
        cursor: 'pointer',
        fontSize: 22,
        width:300,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: "#ff9a00",
        paddingLeft: 0,
        height: 55,
      },
      menuItem: {
        color: white,
        margin: '10px 0px 0px 0px',
        fontSize: 14
      },
      avatar: {
        div: {
          padding: '0px 10px 10px 0px',
          backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
          backgroundRepeat: 'noRepeat',
          backgroundAttachment: 'fixed',
          width: '100%',
          height: '210px'
        },
        icon: {
          float: 'left',
          display: 'block',
          marginRight: 0,   
          marginTop: 80, 
        },
        span: {
          paddingTop: 0,
          marginTop: 0,
          display: 'block',
          color: 'white',
          fontWeight: 400,
          justifyContent: 'center',
          textAlign:'center',
          fontSize:'large',
          height:100,
          textShadow: '1px 1px #444'
        }
      }
};
let drawer=false;
let comp=false;
class LeftDrawer extends Component {
  constructor(props){
    super(props);
    this.state = {child:false,value:false};
    this.handler = this.handler.bind(this);
    this.handleClick= this.handleClick.bind(this);
  }
  componentWillMount(){
   //alert(this.props.navDrawerOpen);
  }
  componentWillUpdate(){
    //alert(2);
  drawer = this.props.navDrawerOpen;
  }

  handleClick( item ) {
    drawer = true;  
    this.setState( prevState => ( 
      { [ item ]: !prevState[ item ] } 
    ) );

  }
  logout(){
    //localStorage.clear();
    this.props.logout();
}

  handler( children ) {
    comp= false;

//alert(JSON.stringify( children));
        // const { classes } = this.props;
    const { state } = this;
return children.map( ( subOption ) => {
      if ( !subOption.children ) {

        //alert(subOption.name);
            return (
          <div key={subOption.name}>
            <ListItem 
              button 
              onClick={this.props.handleChangeRequestNavDrawer}
              key={subOption.name}>
               { comp?
                <ul style={{display:'inline',padding:0,listStyle:'none'}}>
                 <li style={{width:'auto',display:'inline'}}> 
                   <i className={subOption.icon} aria-hidden="true" /> 
                 </li> 
                  <li style={{width:'auto',display:'inline'}}>
       { subOption.name !== "Logout" ?  
       <Link to={subOption.url}
                className= "text-white m-4" >
                  {subOption.name}
             
              </Link>
              :<li onClick={this.logout.bind(this)}>{subOption.name}</li>}
              </li>
              </ul>:<ul style={{display:'inline',padding:0,listStyle:'none',marginLeft:10}}>
                 <li style={{width:'auto',display:'inline'}}> 
                   <i className={subOption.icon} aria-hidden="true" /> 
                 </li> 
                  <li style={{width:'auto',display:'inline'}}>
                  { subOption.name !== "Logout" ?  
       <Link to={subOption.url}
                className= "text-white m-4" >
                  {subOption.name}
             
              </Link>
              :<li style={{width:'auto',display:'inline'}} className= "text-white m-4" onClick={this.logout.bind(this)}>{subOption.name}</li>}
              </li>
              </ul>}
            </ListItem>
          </div>
        );
        
      }
      else{
        comp = !comp;
      }
      return (
        <div key={ subOption.name }>
          <ListItem 
            button 
            onClick={ () => this.handleClick( subOption.name ) }>
            <ListItemText 
              inset 
              className= "text-white ml-n5"
              primary={ subOption.name } />
            { state[ subOption.name ] ? <ExpandLess style={{ color: white }} /> :
                    <ExpandMore style={{ color: white }} />
            }
          </ListItem>
          <Collapse 
            in={ state[ subOption.name ] } 
            timeout="auto" 
            unmountOnExit
          >
            { this.handler( subOption.children ) }
          </Collapse>
        </div>
      );
    } );
  }
 render(){
   //alert(this.props.navDrawerOpen);
 // const {navDrawerOpen} = this.props;
// alert(drawer);
 // alert(JSON.stringify(this.props.menus));
  return (
    <Drawer width={300} 
    containerStyle={{overflow:'auto'}}
    variant="persistent" 
    anchor="left"
    docked={true}
      open={drawer}>
        <div>
            <List style={{maxHeight: '100%'}} >
              <ListItem 
                key="menuHeading"
                divider
                disableGutters
              >
                <ul style={{listStyle:"none",padding:0}}>
                  <li>
                  <div className="column"  style={styles.logo}>
                <ul style={{listStyle:"none"}}>
                    <li>
                          Admin
                    </li>
                     <li>
                         <img src={require('../images/logo.png')}/>
                    </li>
                </ul>
           {/* <img src={require('../images/arrow.png')} />  */}
        </div>
        </li>
        <li>
         <div style={styles.avatar.div}>        
          <div className="row">
           <div className="col-md-12" style={{display:'flex',justifyContent:'center'}}>

         <Avatar src={require('../images/download.png')}
                   size={100}
                   style={styles.avatar.icon}/> 
          </div>
         </div>
       <div className="col-md-12" style={styles.avatar.span}><p style={{textAlign:'center', wordBreak:'break-word'}}>{this.props.username}</p></div>
        </div> 
        </li>
        </ul>
                {/* <ListItemText
                  inset
                  primary="Nested Menu"
                /> */}
              </ListItem>
            {this.handler( this.props.menus ) }
            </List>
          </div>
        {/* <div style={styles.logo}>
          {/* Admin */}
          {/* <img src={require('../images/logo.png')}
           /> */}
           {/* <img src={require('../images/arrow.png')} /> */}
        {/* </div> */}
        {/* <div style={styles.avatar.div}>         */}
        {/* <div className="row">
          <div className="col-md-12" style={{display:'flex',justifyContent:'center'}}>

        <Avatar  src={require('../images/download.png')}
                  size={100}
                  style={styles.avatar.icon}/> 
         </div>
        </div>
        <div className="col-md-12" style={styles.avatar.span}><p style={{textAlign:'center', wordBreak:'break-word'}}>{props.username}</p></div>
        </div> */}
        {/* <div style={{}}>
          {props.menus.map((menu, index) => */}
              {/* !isArray(menu)?    */}
          {/* <MenuItem */}
          {/* //     onClick={handleChangeRequestNavDrawer}
          //     key={index}
          //     style={styles.menuItem}
          //     primaryText={menu.text}
          //     leftIcon={menu.icon}
          //     containerElement={<Link to={menu.link}/>}
          //   /> */}
          {/*         {/* </div> */}
    </Drawer>
  );
}
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  handleChangeRequestNavDrawer:PropTypes.func,
  menus: PropTypes.array,
  logout:PropTypes.func,
  username: PropTypes.string,
};

export default withStyles(styles)(LeftDrawer);
