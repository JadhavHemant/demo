import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

class InfoBox extends React.Component {

  render() {
    const {color, title,url,background_color,icon_style} = this.props;
    const styles = {
      content: {
        marginLeft: 0,
        height: 'auto'
      },
      number: {
        display: 'block',
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: grey800
      },
      text: {
        fontSize: 18,
        display: 'flex',
        justifyContent: 'flex-start',
        fontWeight: typography.fontWeightLight,
        color: grey800
      },
      iconSpan: {
        float: 'left',
        height: 'auto',
        width: 'auto',
        backgroundColor: color
      },
      icon: {
        marginTop: 10,
        marginLeft:0,
        display:'flex',
        justifyContent: 'stretch',
        height:100

      }
    };

    return (
      <Paper className="w-auto h-100" style={{backgroundColor:background_color}}>
        <div style={styles.content} >
        <div className="w-100" >
        {<div className="col-md-12 col-12 col-sm-12 "  ><div className="d-flex justify-content-center"><img  style={icon_style} alt="Italian Trulli"  src={url}></img> </div> <div className="col-md-12 col-12 col-sm-12 mt-md-3 mt-3" style={{display:'flex',justifyContent:'center'}} >{title}</div></div>
        } 

        
         </div>
                 </div>
      </Paper>
      );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};


export default InfoBox;
