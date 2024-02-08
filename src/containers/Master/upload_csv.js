import React, { Component } from 'react';
import APIS  from '../../APIS/APIS';

class upload_csv extends Component {
    constructor(props){
        super(props);
        this.state ={csv_rows:{}};
    }

 componentWillMount(){
 //    alert("1");
 }

handleSubmit(e){
  
    let url;
    url = APIS.baseurl + APIS.insert_csv+this.props.router.params.stype;
    let formData = new FormData(document.getElementById('upload_csv'));
///   alert(url);
    fetch(url,{method:'POST',body:formData}).then(response=>{
                                                    response.json().
                                                       then(res=>{
                                                           //alert(JSON.stringify(res));
                                                           if(res.success){
                                                               alert(res.message);
                                                           }
                                                        });});

                                                       e.preventDefault();

                                                    }
  read_csv(){
     // alert(e.target.name); 
      let url;
      url = APIS.baseurl + APIS.get_csv+this.props.router.params.stype;
      let formData = new FormData(document.getElementById('upload_csv'));
      fetch(url,{method:'POST',body:formData}).
                           then(response=>{response.json().
                                then(res=>{
                                            this.setState({csv_rows:res});
                                           }
                                    );
                                });
         
  }
    render() {
        return (
            <form id="upload_csv"onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                   <div className="d-flex justify-content-center p-2">
                       <div className="column">
                       <h5 style={{textAlign:'center'}}>Upload CSV</h5>
                    <div className="row">
                        <label className="form-label">CSV File:</label>
                        <input className="form-control" type="file" name="csv_file" accept=".csv"  onChange={this.read_csv.bind(this)} />
                    </div>
                    <div className="table-responsive mt-3">
                   <table><thead>
                   {
                       <tr>{
                       Object.entries(this.state.csv_rows).length > 0? this.state.csv_rows.keys.map(thead=><th>{thead.charAt(0).toUpperCase()+thead.slice(1)}</th>):""}
                       </tr>
                        
                   }
                   </thead>
                   <tbody>
                       {
                          Object.entries(this.state.csv_rows).length >0 ?this.state.csv_rows.table_rows.map(csv_row=><tr>{Object.entries(csv_row).map(([key,obj_value])=><td id={key}>{obj_value}</td>)}</tr>):""
                       }
                   </tbody>
                   </table>
                   </div>
                   <div className="d-flex justify-content-center mt-5">
                   <button  style={{alignItems:'center',marginTop:'15px',paddingLeft:'10px',paddingRight:'10px',paddingTop:'2px',paddingBottom:'2px'}}>Upload</button>
                   </div>
                   </div>
                   </div>
               </div>
            </form>
        );
    }
}

export default upload_csv;
