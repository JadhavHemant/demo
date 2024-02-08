import React,{Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../data';
//import { confirmWrapper, confirm } from '../confirmDialog/createConfirm';
import "bootstrap/dist/css/bootstrap.min.css";
import {isMobile} from 'react-device-detect';
import Header1 from '../components/header1';
//import { AlertWarning } from 'material-ui/svg-icons';
// const handleOnClick = async () => {
//   if (await confirm({
//     confirmation: 'Are you sure?'
//   })) {
//     console.log('yes');
//   } else {
//     console.log('no');
//   }
// }
 
// const handleOnClick2 = async () => {
//   if (await confirmWrapper('Are your sure?')) {
//     console.log('yes');
//   } else {
//     console.log('no');
//   }
// }
//var handleOnClick;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    };
  }
   componentWillMount(){
    //alert(JSON.stringify(JSON.parse(localStorage.getItem('echo_systems'))));
    if(!localStorage.getItem('Authentication')){
      this.props.router.replace('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }
  logout(){
    localStorage.clear();
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });

  }
  // handleOnClick= async ()=> {
  //    await( new Promise());
  //   if (await confirm({
  //     confirmation: 'Are you sure?'
  //   })) {
  //     console.log('yes');
  //   } else {
  //     console.log('no');
  //   }
  //  }
   

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 305;
   // alert(navDrawerOpen);   
//alert(JSON.stringify(JSON.parse(localStorage.getItem('echo_systems'))));
    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };
   // alert(JSON.stringify(styles.header));
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
  {isMobile ? <Header
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>
  :<Header1 styles={styles.header} handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>}
            <LeftDrawer logout={this.logout.bind(this)} handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer} navDrawerOpen={navDrawerOpen}
                        menus={Data.data}
                        username={localStorage.getItem('firstname')+" "+localStorage.getItem('lastname')}/>

            <div style={styles.container}>
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    );
  
  
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
