import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../styles';


const PageBase = (props) => {

    const {title, navigation} = props;

    return (
      <div className="container" style={{display: 'flex',justifyContent: 'center'}}>
        <span style={globalStyles.navigation}>{navigation}</span>

        <Paper className="col-md-10 m-3" style={globalStyles.paper}>
          <h3 style={globalStyles.title}>{title}</h3>

          <Divider/>
          {props.children}

          <div style={globalStyles.clear}/>

        </Paper>
      </div>
    );
};
PageBase.DefaultProTypes={
width:100
};
PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element,
  width:PropTypes.style
};

export default PageBase;
