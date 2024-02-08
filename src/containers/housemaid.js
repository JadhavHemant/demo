import React, { Component } from 'react';

class housemaid extends Component {
    render() {
        return (
            <div>
            <div className="form-group">
                <div className="row">
                    <label className="col-md-4">Name</label>
                <input className="form-control col-md-8" name="hname"/> </div>
            </div>
          
    <div className="form-group">
    <div className="row">
        <label className="col-md-4">Mobile No</label>
    <input className="form-control col-md-8" name="hmobile"/> </div>
</div>
 <div className="form-group">
 <div className="row">
     <label className="col-md-4">Email</label>
 <input className="form-control col-md-8" name="hemail"/> </div>
</div>
<div className="form-group">
 <div className="row">
     <label className="col-md-4">Amount Paid</label>
   <input rows="5" className="form-control col-md-8" name="hamountpaid" />
</div>
</div>
</div>
        );
    }
}

export default housemaid;
