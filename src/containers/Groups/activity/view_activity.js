import React, { Component } from 'react';

class view_activity extends Component {
    constructor(props){
        super(props);
      this.state={object:[],filters:['project_name','project_description','start_date','end_date']};
    }
    componentWillMount(){
     
         let obj = JSON.parse(this.props.router.params.obj);
         this.setState({object:obj});
         console.log("view_activity",obj);
    }

    render() {
        const child= <table>
                      <thead>
                          {this.state.filters.map(value=> <th>{value.charAt(0).toUpperCase()+ value.slice(1).replace("_"," ")}</th>)}
                          </thead>
                          <tbody>
                                   {this.state.object.project_details.map(value=>(<tr>{Object.entries(value).map(([key,value])=>(
                                     this.state.filters.includes(key)? <td width="30%" style={{wordBreak:"break-all"}}><div style={{display:'block', overflowWrap:'break-word'}}>{value}</div></td>:""
                                   ))}</tr>))}
                            
                          </tbody>
                       </table>;
        return (
            <div>
                {child}
            </div>
        );
    }
}

export default view_activity;
