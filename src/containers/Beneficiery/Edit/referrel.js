import React, { Component } from 'react';
import Student from '../../../containers/student';
class referrel extends Component {
    render() {
        return (
            <div style={{display:'flex',justifyContent:'center'}}>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xs-6">
                <Student />
            </div>
            </div>
        );
    }
}

export default referrel;
