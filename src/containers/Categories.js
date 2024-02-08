import React, { Component } from 'react';
import APIS from '../APIS/APIS';
import InfoBox from '../components/dashboard/InfoBox';
import lodash from 'lodash';
class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {Categories:[{id:1,name:'',image:''}],ecoId:'',cardView:true,search_view:false,search_details:[],title:"EcoSystems"};
        this.handleDivClick = this.handleDivClick.bind(this);
        this.handleSearchClick= this.handleSearchClick.bind(this);
        this.connect = this.connect.bind(this);
    }


 
    
 componentWillMount() {
     let url;
    // alert(this.props.router.params.id);
     if(this.props.router.params.id == 1){
      url = APIS.baseurl+APIS.get_echo_systems;
    this.setState({title:'Ecosystems'});
    }
     else{
      url = APIS.baseurl+APIS.getcategories;
      this.setState({title:'Categories'});
     }
     //alert(url);
    fetch(url,{
        method:'GET'
    }).then(response => {
                          response.json().then(
                          res=> {
  //                           
                                  this.setState({Categories:res});
                                  //alert(JSON.stringify(this.state.Categories))''
                               } 
                                            );
});
}

componentDidUpdate(){

    let url;
    
    if(this.props.router.params.id == 1){
         url = APIS.baseurl+APIS.get_echo_systems;

    }
       else{
        url = APIS.baseurl+APIS.getcategories;
       }
     //  alert(url);
      fetch(url,{
          method:'GET'
      }).then(response => {
                            response.json().then(
                            res=> {
    //                           
                                    this.setState({Categories:res});
                                    //alert(JSON.stringify(this.state.Categories))''
                                 } 
                                              );
  });

}

handleSearchClick(e){
    this.setState({cardView:false});
    this.setState({search_view:true});
    let search_text = document.getElementById('search').value;
    let url = APIS.baseurl+APIS.get_search_result+"?typed_text="+search_text;
    fetch(url,{method:'GET'}).then(
       response=> response.json().then(res=>
        {
            this.setState({search_details:res});
        })

);
    e.preventDefault();
}

connect(data){
//    alert(data.users_id);
    let cat_id = data.tech_skill;
    let obj = localStorage.getItem('member_obj');
    let obj1 = JSON.stringify(data);
    let mid = localStorage.getItem('token');
    let cid = data.users_id;
    alert("please wait few seconds sending details to admin..");
    const formData = new FormData();
    formData.append("cat_id",cat_id);
    formData.append("user_details",obj);
    formData.append("conn_details",obj1);
    formData.append("category_name",this.props.router.params.name);
    let url = APIS.baseurl+ APIS.send_email+cid +"/" + mid;
    //alert(url);
    fetch(url,{method:'POST',body:formData}).then(response=>response.json().then(res =>{
      if(res.success){
        alert(res.message);
      
      }
    }));
    
  }
//  categories = function categories () {

  
// }
handleDivClick(k,name){

 if(this.props.router.params.id == 'lead' ){
     this.props.router.push("/dashboard/OurLeads/"+ k+"/" +name);
    }    
else if(this.props.router.params.id=="view"){
    this.props.router.push("/dashboard/view_projects/"+ k+"/" +name);
}
else if(this.props.router.params.id=="research"){
    this.props.router.push("/dashboard/research_view_projects/"+ k+"/"+name);
}
else if(this.props.router.params.id == 0){
    this.props.router.push("/dashboard/OurLeads/"+localStorage.getItem('ecoId')+"/"+ k+"/" +name);
}
else if(this.props.router.params.id == 1){
    this.props.router.replace("/dashboard/Connects/0");  
    this.setState({Categories:[]});
    this.setState({title:'Categories'});
    localStorage.setItem('ecoId',k);
}
else {
    this.props.router.push("/dashboard/Connects/1");
    this.setState({title:'EcoSystems'});
}

}
    render() {
       // let m=0;
//    alert(JSON.stringify(this.state.Categories));
       
 const search_view = this.state.search_details.length > 0 ? <div className="table table-responsive">
                                                              <table className="table table-striped">
                                                                     <thead>
                                                                              <th>Sr No</th>
                                                                              <th>Ecosystem</th>
                                                                              <th>Category</th>
                                                                              <th>Image</th>
                                                                              <th>Member Name</th>
                                                                              <th>Company/College</th>
                                                                              <th>Profile</th>
                                                                              <th>Connect</th>

                                                                     </thead>{
                                                                        this.state.search_details.map((value,k)=>
                                                                        (value.mentors.map((value1,i)=>(
                                                                             <tr>
                                                                                 <td>{i+k+1}</td>
                                                                                 <td>{value.name}</td>
                                                                                 <td>{value1.category_name}</td>
                                                                                 <td><img style={{width:'100px',height:'100px'}} src={APIS.upload_path+value1.photograph}  /></td>
                                                                                 <td>{value1.Name}</td>
                                                                                 <td>{value1.company}</td>
                                                                                 <td>{value1.remark}</td>
                                                                                 <td><button className="btn btn-primary" onClick={()=>this.connect(value1)}>Connect</button></td>
                                                                            </tr>
                                                                        ))

                                                                        ))} 
                                                              </table>
                                                         </div>:
     
                                                          <div style={{position:'fixed',top:'40%',left:'40%',right:'40%'}}>No search result found</div> ;
const childs =  lodash.chunk(this.state.Categories,4).map((dt,i)=>{
       return <div key={i} className="row">{
                dt.map((data,k)=>{ console.log("element",data);
            return <div key={k} onClick={()=>this.handleDivClick(data.id,data.name)} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15">
                       <input type="hidden" id={"cat_id"+k} value={data.id}/> 
                       <InfoBox Icon={null} width="w-auto" height="h-100"
                        color={null}
                        background-color = "#ffffff"
                        icon_style={{height:'150px',width:'150px',padding:10}}
                        url={APIS.upload_path+data.image} 
                        title={<div className="col-md-12 col-sm-12 col-lg-12 text-center" style={{fontSize:'22px'}}>{data.name}</div>}
                        value=" "
                    />
                  </div>
;
       })}</div>;
   }         
);
        return (
            <div>
                <form  className="d-flex justify-content-center mb-3" id="search_form" >
                <div className="input-group  col-md-6 col-lg-6 col-sm-8 col-xl-8 ">
                
                     <input className="form-control form-control-sm ml-3 w-75 py-4" id="search" name="search" type="search" placeholder="Search"
    aria-label="Search"/>
    <span className="input-group-append">    <button  className="btn btn-outline-primary rounded-right ml-1"  type="button" onClick={(e)=>this.handleSearchClick(e)}>
            <i className="fa fa-search"></i>
        </button>  </span>
    </div>
</form>
    <h5>{this.state.title}</h5>  
            {this.state.cardView? childs:""}
            {this.state.search_view ? search_view:""}
            </div>

        );
        
    }
}

export default Categories;
