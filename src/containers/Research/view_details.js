import React, { Component } from 'react';
import APIS from '../../APIS/APIS';
// import loadsh from 'lodash';
// import { object } from 'prop-types';
import { Paper } from 'material-ui';
import {Link} from 'react-router';
import {isMobile} from 'react-device-detect';
import Pagination from "react-js-pagination";





class view_details extends Component {
    constructor(props){
        super(props);

        this.state = {count:[1,2],otherresearch_current_page:0,myresearch_current_page:0,page:0,item_count:2,filters:['id','current_page','next_page','items_per_count','total_pages','category','research_category','sector','project_category','proj_reg_date','start_date','end_date','member_id'], data:{}};
  this.handleSubmit = this.handleSubmit.bind(this);
      }
    connect(data){
        // alert(JSON.stringify(data));

         let cat_id = this.props.router.params.id;
         let obj = localStorage.getItem('member_obj');
         let obj1 = JSON.stringify(data);
         let mid = localStorage.getItem('token');
         let cid = data.id;
         
         alert("please wait few seconds sending details to admin..");
         
         const formData = new FormData();
         
         formData.append("cat_id",cat_id);
         formData.append("user_details",obj);
         formData.append("cid",cid);
         formData.append("mid",mid);
         formData.append("type",1);
         formData.append("research_details",obj1);
         formData.append("category_name",this.props.router.params.name);
         
         let url = APIS.baseurl+ APIS.project_research+"6";
         
         fetch(url,{method:'POST',body:formData}).then(response=>response.json().then(res =>{
           if(res.success){
             alert(res.message);
           
           }
         }));
         
       }
    componentWillMount(){
        let url = APIS.baseurl+APIS.project_research;
        let formData = new FormData();
          formData.append("cat_id",this.props.params.id);
          formData.append("member_id",localStorage.getItem('token'));
          formData.append('isMobile',isMobile);
          formData.append('myresearch_current_page',this.state.myresearch_current_page);
          formData.append('otherresearch_current_page',this.state.otherresearch_current_page);
          fetch(url+"4",{
            method:'POST',
            body:formData
          }).then(response=>response.json().then(res=>{
             // alert(JSON.stringify(res));
              this.setState({data:res});
              if(isMobile){
                this.setState({item_count:1});
              }
              
          }));
    
        }
        myresearch_next(){
          //alert(1);
          let url = APIS.baseurl+APIS.project_research;
          let formData = new FormData();
            formData.append("cat_id",this.props.params.id);
            formData.append("member_id",localStorage.getItem('token'));
            formData.append('isMobile',isMobile);
            formData.append('myresearch_current_page',this.state.myresearch_current_page);
            formData.append('otherresearch_current_page',this.state.otherresearch_current_page);
            fetch(url+"4",{
              method:'POST',
              body:formData
            }).then(response=>response.json().then(res=>{
               // alert(JSON.stringify(res));
                this.setState({data:res});
                if(isMobile){
                  this.setState({item_count:1});
                }
                
            }));
        }
        handleSubmit(e,i){
        //  alert(e);
            if(i == 0)
            this.setState({myresearch_current_page:(e-1)});
            else
            this.setState({otherresearch_current_page:(e-1)});
            //for(let i=0;i<10000;i++);
            
            this.myresearch_next();
        }
    render() {
        const styles={
            links: {
                ":hover": {color: "red", textDecoration: "none"}
            },
            fonts:{fontSize:'20px'}
        };
        //const child = Object.entries(this.state.data).map(([key,value])=>(Object.entries(value).map(([key,value])=>(!this.state.filters.includes(key)? <div>{Object.entries(value).map(([obj_key,obj_value])=>(<div>{JSON.stringify(obj_value)}</div>))}</div>:""))));
        const child = Object.entries(this.state.data).
                      map(([main_key,main_value],i)=>
                      ( <div>{
                        Object.entries(main_value).map(([main_key,value])=>(
                          !this.state.filters.includes(main_key)?
                        <div className="column">
                             {/* Title of Projects */}
                             <div className="d-flex justify-content-center">
                                <h5 style={{fontFamily:'cursive'}}>{main_key}</h5>
                             </div>
                              {/* add elements in row and display elements in center of div */}
                             <div className="row d-flex justify-content-center">
                                 {
                                  //  loadsh used to ch
                                   
                                // item view on row div 
                
                            value.map(value=>(
                                <Paper className="column col-md-4 col-lg-4 m-3 h-25">
                                   
                                   {/* table to display research project view */}
                                    <div className="table-responsive">
                                        <table className="table h-75">
                                            
                                              {
                                              Object.entries(value).map(([obj_key,obj_value])=>
                                                 (!this.state.filters.includes(obj_key)? 
                                                   <tr>
                                                       <td width="40%" style={{height:'15px'}}>
                                                           <h6 className="col-md-3 col-lg-3 " style={{padding:'5px'}} >{obj_key.charAt(0).toUpperCase()+obj_key.slice(1).replace("_"," ")}</h6>
                                                       </td>
                                                                    
                                                        <td width="60%">
                                                        
                                                            <div style={{height:'40px',width:'250px', whiteSpace:'nowrap', overflow:'hidden',padding:'5px', textOverflow:'ellipsis'}}>{obj_value.charAt(0).toUpperCase()+obj_value.slice(1,40)}</div> 
                                                        </td>
                                                         </tr>:''))
                                              }
                                         </table>
                                     
                                     </div>
                                     {/* Edit and More View */}
         
                                     <div className="position-relative fixed-bottom" style={{backgroundColor:'#ff9a00',color:'white',padding:'5px',marginBottom:'5px', display:'flex',justifyContent:'space-between'}}>
         
                                           <Link className="col-md-6" style={{fontSize: 20,textAlign:'center',color:'black'}} >
                                              <h5>More</h5>
                                           </Link>
                                           <Link className="col-md-6" style={styles.fonts} to={main_key != "Other Research"?"/dashboard/research_project/0/"+JSON.stringify(value):"http://localhost:3000/dashboard/view_projects/#/#"} onClick={()=>main_key == "Other Research"?this.connect(value):""} >
                                             <h5>{main_key == "Other Research" ? "Interested":"Edit"}</h5>
                                            </Link>
                                            
                                      </div>
                                    
                                  </Paper>))
                                  
                                }
                              </div>
                              </div>:""))}
                      
                          <div className="col-12" style={{display:'flex',justifyContent:'center'}}>
                              <Pagination
                                  activePage={main_value.current_page}
                                  itemsCountPerPage={main_value.items_per_count}
                                  itemClass="page-item"
                                  linkClass="page-link"
                                  totalItemsCount={main_value.total_pages*main_value.items_per_count}
                                  pageRangeDisplayed={main_value.total_pages}
                                  onChange={(e)=>this.handleSubmit(e,i)}/>
                          </div>
                                  
                         </div>
                       
                       ));
        
        return (
            <div>
              {Object.keys(this.state.data).length > 0 ? child:""}
            </div>
        );
    }
}

export default view_details;
