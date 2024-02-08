import React, { Component } from 'react';
import Ngos from '../../../containers/ngos';

class ngos extends Component {
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
        return (
            <div style={{display:'flex',justifyContent:'center'}}>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xs-6">
            {Object.keys(this.state.obj).length != 0 ? <Ngos obj={this.state.obj} />:""}
                
            </div>
            </div>
        );
    }
}

export default ngos;
