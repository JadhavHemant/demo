import React, { Component } from 'react';
import APIS from '../../APIS/APIS';
import Pagination from "react-js-pagination";
import {isMobile} from 'react-device-detect';
import Card from 'material-ui/Card';
// import {Link} from 'react-router';
// import jobComponent from './jobComponent';

class view_jobs extends Component {
    constructor(props){
        super(props);
        this.state = {activePage:0,jobs:{MyJobPosts:[]},rupess:[<span />,<span />,<span />,<span />,<span />,<span />,<span />,<span>&#8377;</span>,<span />,<span />],styles:["","","h5","small","small","small","small","small","small","small"],
        filters:['id','member_id','createdAt']};
        this.appply_interview = this.appply_interview.bind(this);
    //alert(Object.keys(this.state.jobs).length);
    }
     componentDidMount(){
         this.getJobs();
        //  for(let i=0;i<10;i++){
        //      alert(i);
        //  }
     }
     appply_interview(value){
      //alert(JSON.stringify(value));
      let url = APIS.baseurl+APIS.job_posts+"5"; 
      let formData = new FormData();
          formData.append('job_details',JSON.stringify(value));
          formData.append('user_details',localStorage.getItem('member_obj'));
          formData.append("cid",value.id);
          formData.append('mid',localStorage.getItem('token')); 
          formData.append("type","2");
          formData.append("cat_id","1");
          alert("please wait we are sending your request to client");
          
          fetch(url,{method:'POST',body:formData}).
                                                 then((response=>
                                                         response.json().then(res=>{alert(JSON.stringify(res));})));
    }
     getJobs(){
        let url = APIS.baseurl+APIS.job_posts+'3';
        let formdata = new FormData();
        formdata.append('isMobile',isMobile);
        formdata.append('current_page',(this.state.activePage));
        formdata.append('member_id',localStorage.getItem('token'));

        fetch(url,{method:'POST',body:formdata}).
           then(response=>
                response.json().
                   then(res=>{
                   //            this.props[''] = res.MyJobPosts;
                               this.setState({jobs:res});
                 //              alert(JSON.stringify(this.props));
       //                        alert(1);
                              }
                       )
               );
     }

    handlePageChange(e){
      //  alert(e.target.id);
        this.setState({activePage:(parseInt(e)-1)});
        this.getJobs();
    }
    render() {
        //alert(JSON.stringify(this.state.jobs.MyJobPosts));
        const child =  <div className="row d-flex justify-content-center">{
                           this.state.jobs.MyJobPosts.map(value=>
                                                                (
                                                                    <Card className="column col-md-3 col-lg-3 m-lg-3 m-md-3 m-5"> <table className="table">{
                                                                                Object.entries(value).map(
                                                                                    ([key,value],i)=> !this.state.filters.includes(key) ?
                                                                                     (
                                                                                         <div>
                                                                                             {/* <jobComponent postJob = {value}/> */}
                                                                                               {/* <td width="30%">
                                                                                                    <label className="col-md-3 col-lg-3">{key.charAt(0).toUpperCase()+key.slice(1).replace("_"," ")}</label>
                                                                                                </td> */}

                                                                                                {/* <td width="70%"> */}
                                                                                                     <a className={this.state.styles[i]} style={{wordBreak:'break-all',textOverflow:'ellipsis'}} title={value.charAt(0).toUpperCase()+value.slice(1).replace("_"," ")}>{this.state.rupess[i]} {value.charAt(0).toUpperCase()+value.slice(1).replace("_"," ")}</a>
                                                                                                {/* </td> */}
                                                                                         </div>
                                                                                     ):("")
                
                                                                                 )}</table><div className="d-flex justify-content-center" ><h5><button style={{width:'150px'}} onClick={()=>this.appply_interview(value)}>Apply</button></h5></div></Card>))}</div>;
             
         return (
                    
            <div>{
                     //Object.keys(this.state.jobs).length > 0 ? 0:1
                    Object.keys(this.state.jobs).length > 0 ? <div>{child}  
                    <div className="d-flex justify-content-center mt-3 mt-lg-3">
                        <Pagination
                              activePage={this.state.activePage+1}
                              itemsCountPerPage={this.state.jobs.items_per_count}
                              itemClass="page-item"
                              linkClass="page-link"
                              totalItemsCount={this.state.jobs.total_pages * this.state.jobs.items_per_count}
                              pageRangeDisplayed={this.state.jobs.total_pages}
                              onChange={this.handlePageChange.bind(this)}/></div> </div> :""
                  }
                   
            </div>
        );
    }
}

export default view_jobs;
