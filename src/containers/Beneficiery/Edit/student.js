import React, { Component } from 'react';
import Student from "../../../containers/student";
class student extends Component {
    constructor(props){
        super(props);
        this.state = {obj:{}};
        
    this.setObject = this.setObject.bind(this); 
    }
    componentDidMount(){
   this.setObject();
        
    }
    setObject(){
        const _obj = JSON.parse(this.props.params.value);
        this.setState({obj:_obj});  
    }
    render() {
       // alert(JSON.stringify(this.state.obj));
        return (
            
            <div style={{display:'flex',justifyContent:'center'}}>
            <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12">
              {Object.keys(this.state.obj).length != 0 ? <Student obj={this.state.obj} />:""}       
                 </div>
            </div>
        );
    }
}

export default student;
