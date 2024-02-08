import React, { Component } from 'react';
// import {Link} from 'react-router';
import lodash from 'lodash';
import APIS from '../APIS/APIS';
import Modal from '../components/popups/model';
import InfoBox from '../components/dashboard/InfoBox';
import Pagination from "react-js-pagination";


// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentCreate from 'material-ui/svg-icons/content/create';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// import {pink500, grey200, grey500} from 'material-ui/styles/colors';
// import PageBase from '../components/PageBase';
// import Data from '../data';

class TablePage extends Component {
constructor(props){
  super(props);
  this.state = {Members:[],filters:['id','remark','image_profile','mobile','member_id'],obj:{},page_index:1,openModal:false,modalIsOpen:false,afterOpenModal:false,closeModal:false,activePage:1,items_count_per_page:12,totalItemsCount:100,pageRangeDisplayed:5};
  console.log("params",JSON.stringify(this.props.router.params.id));
this.about_details = this.about_details.bind(this);
this.openModal = this.openModal.bind(this);
this.afterOpenModal = this.afterOpenModal.bind(this);
this.closeModal= this.closeModal.bind(this);
this.connect = this.connect.bind(this);
}

openModal(_obj){

this.setState({modalIsOpen:true,obj:_obj});
}
afterOpenModal(){
  this.setState({modalIsOpen:true});
}
closeModal(){
  this.setState({modalIsOpen:false});
}
about_details(data){
 return(
  
 <div className="w-100" 
   style={{display:'flex',justifyContent:'center'}}>
   <table className="table-responsive"  style={{fontFamily:'calibri',fontSize:'20px'}}>
     {Object.entries(data).map(([key,value])=>(!this.state.filters.includes(key)?<tr><td width="30%"><label  style={{fontSize:'16px', height:'30px'}}>{key}:</label></td><td width="70%"><label style={{fontSize:'16px',height:'30px'}}>{value!="" ?value:"NA"}</label> </td></tr>:""))}
     <tr><td  colSpan="2" width="100%"><div style={{wordWrap:'break-word',paddingTop: '10px',display:'flex',justifyContent: 'start',}}><button type="button" className="btn btn-link p-n5" onClick={()=>this.openModal(data)}><label style={{color:"rgb(93, 162, 234)",fontSize:'20px',padding:'0px'}}> Profile</label></button></div></td></tr><tr><td colSpan="2" style={{alignItems: 'center',padding:'10px'}}><button id={data.id} className="Button"  name={data.id} onClick={()=>this.connect(data)}  style={{fonStyle:'bold',backgroundColor:'#ff9a00',width:'150px'}}> {data.member_id != null?'Request Send':'Connect'}</button></td></tr></table></div>
 );


}
componentDidMount(){
  //let url = APIS.baseurl+APIS.getmembers;
  //alert(url);
 this.fetch_connects(); 
 }

 fetch_connects(){
  const formData = new FormData();
  formData.append('cat_id',this.props.router.params.id);
  formData.append('ecoId',this.props.router.params.ecoId);
  formData.append('page_index',this.state.page_index);
 // alert(this.props.router.params.ecoId);
  fetch(APIS.baseurl+APIS.getmembers,{method:'POST',body:formData,}).then(response=>response.json().then(
    res=>{
//            console.log(JSON.stringify(res));
            if(this.props.router.params.user_id != null){
            
              for(let i=0;i<res.length;i++){
                if(res[i].id === this.props.router.params.user_id){
                   let obj = res[i];
                   res=[];
                   res[0] = obj;
                   this.setState({Members:res.member_deatails});
                                    }
              }
           }
         else{
      this.setState({Members:res.member_deatails});
      this.setState({items_count_per_page:res.pagination_details.items_per_page,totalItemsCount:res.pagination_details.total_items});
     // alert(JSON.stringify(res));

         }
    }
  ));


 }
handlePageChange(e){
this.setState({page_index:e});
this.setState({activePage:e});
this.fetch_connects();
}
connect(data){

  let cat_id = this.props.router.params.id;
  let obj = localStorage.getItem('member_obj');
  let obj1 = JSON.stringify(data);
  let mid = localStorage.getItem('token');
  let cid = data.id;
  alert("please wait few seconds sending details to admin..");
  const formData = new FormData();
  formData.append("cat_id",cat_id);
  formData.append("user_details",obj);
  formData.append("conn_details",obj1);
  formData.append("category_name",this.props.router.params.name);
  let url = APIS.baseurl+ APIS.send_email+cid +"/" + mid;
  //alert(url);
 let connect_btn_text = document.getElementById(data.id.toString());
 
 
  if(connect_btn_text.textContent != 'Request Send')
{
  fetch(url,{method:'POST',body:formData}).then(response=>response.json().then(res =>{
    if(res.success){
      alert(res.message);
    
    }
  }));
}
else{
     alert('Aler');
}
  
}

  render(){
    
   // alert(this.state.Members.length);
  
    const childs =  lodash.chunk(this.state.Members,4).map((dt,i)=>{
     return <div   key={i} className="row">{
    dt.map((data,k)=>{ console.log("element",data);
                      return  <div key={k} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-5 ">
                        <InfoBox Icon={null}
                        color={null}
                        background-color = {"#ffffff"}
                        icon_style={{height:'150px',width:'150px',padding:10}}
                        url={APIS.upload_path+data.image_profile}
                        title={this.about_details(data)}
                       svalue=" "/>

</div>
;
    })}</div>;
}         
);
  return (
    <div>
 
      <div><label style={{fontSize:'23px',fontFamily:'cursive'}}>{this.props.router.params.name}</label></div>
    <div className="mt-3">
    {this.state.Members.length > 0 ? childs: <div className="text-center d-flex justify-content-center min-vh-100 align-items-center">No Members</div>}
    </div>
 { this.state.Members.length > 0 ?  <div className="d-flex justify-content-center mt-5"> <Pagination
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.items_count_per_page}
                              itemClass="page-item"
                              linkClass="page-link"
                              totalItemsCount={this.state.totalItemsCount}
                              pageRangeDisplayed={APIS.PAGE_RANGE_COUNT}
                              onChange={this.handlePageChange.bind(this)}/></div>:""}
    <div>
      <Modal modalIsOpen={this.state.modalIsOpen} obj={this.state.obj} closeModal={this.closeModal.bind(this)}  />
      </div> 
    </div>
      /* <div>
        <Link to="/form" >
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.price}>Price</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.category}>Category</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Data.tablePage.items.map(item =>
              <TableRow key={item.id}>
                <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
                <TableRowColumn style={styles.columns.price}>{item.price}</TableRowColumn>
                <TableRowColumn style={styles.columns.category}>{item.category}</TableRowColumn>
                <TableRowColumn style={styles.columns.edit}>
                  <Link className="button" to="/form">
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={grey200}
                                          iconStyle={styles.editButton}>
                      <ContentCreate  />
                    </FloatingActionButton>
                  </Link>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>    
      </div> */
    // </PageBase>
  );
}
}

export default TablePage;
