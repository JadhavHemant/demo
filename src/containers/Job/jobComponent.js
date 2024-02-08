import React, { Component } from 'react';

class jobComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        
     const   {postJob} = this.props;
    alert(JSON.stringify(postJob));   
     return (
            <div className="column">
                  {/* <h5>{title}</h5>
                  <h5>{companyName}</h5>
                  <h5>{location}</h5>
                  <h5>{salary}</h5>
                  <h5>{job_type}</h5> */}

            </div>
        );
    }
}

export default jobComponent;
