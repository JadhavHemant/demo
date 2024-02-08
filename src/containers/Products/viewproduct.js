import React, { Component} from 'react';
import Card from 'material-ui/Card';
import APIS from '../../APIS/APIS';
//import jsZip from 'jszip';
// import reverse from 'reverse-object-order';
import Pagination from "react-js-pagination";
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from '@progress/kendo-file-saver';

class viewproduct extends Component {
     constructor(props){
         super(props);
       this.state ={current_page:0,activePage:0,products:{},special:['','','','','Rs.'], filters1:['name','description','price','brochure_image','organization_name'],filters:['total_item_count','item_per_pages','current_index','end_index','total_pages']};
       this.getProducts = this.getProducts.bind(this);
        this.download = this.download.bind(this);
        this.connect = this.connect.bind(this); 
    }

    componentDidMount(){
      this.getProducts(this.state.current_page);
    }


    download (value) {
   
       //img.file("smile.gif", imgData, {base64: true});
       const files=  value.split(',');
   //    alert(JSON.stringify(files));
            if(files.length > 1 ){
              // alert(); 
              this.createZipandDownload(files);
            }
            else{
       files.forEach(function(url){
        // alert(url);
        const extention = url.split('.');
    //    alert(JSON.stringify(extention));
        console.log(url);
        url = url.trim();
        fetch(url, {
          method: "GET",
          type:'no-cores',
          headers: {}
        })
          .then(response => {
          
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              alert(url);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "product_brochure."+extention[1]); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            alert("image can't download it("+err+")");
            console.log(err);
          });
 
       });
  }
}

createZipandDownload(files){
    
  var zipFilename = "ProductDetails.zip";
  var count=1;
 // alert(files.length);
 var jszip = new JSZip();
 files.forEach(function(url) {
   //alert(url);
   const extention = url.split('.');

   JSZipUtils.getBinaryContent(url, function (err, data) {
    if(err) {
       throw err; // or handle the error
    }
    var filename = "product_image_"+count+"."+extention[1];
    jszip.file(filename, data, {binary:true});
    
    //alert(count);
    if (count == files.length) {
     // alert(count);
      jszip.generateAsync({type: "blob"}).then(function(content) {
      //alert(JSON.stringify(zipFile));
      saveAs(content, zipFilename);
    }
    
);

}
count++;
});
});
}



    getProducts(page){
    
        let url = APIS.baseurl+APIS.product_module+"3";
        let formData = new FormData();
        //alert(url);
        formData.append("member_id",localStorage.getItem('token'));
        formData.append("current_page",page);
        fetch(url,{method:'POST',body:formData}).
                                        then(response=>
                                                {response.json().then(res=>{this.setState({products:res});});});
    }
    handlePageChange(e){
        //alert(e);
        this.setState({activePage:(e-1)});
        //this.setState({current_page:(e-1)});
        this.getProducts((e-1)); 
    }
    connect(data){
      //alert(data.category_id);
      // alert(JSON.stringify(data));

       let cat_id = data.category_id;
       let obj = localStorage.getItem('member_obj');
       let obj1 = JSON.stringify(data);
       let mid =data.id ;
       let cid = localStorage.getItem('token');
       
       alert("please wait few seconds sending details to admin..");
       
       const formData = new FormData();
       formData.append('sector_id',data.section_id);
       formData.append("cat_id",cat_id);
       formData.append("user_details",obj);
       formData.append("product_id",data.id);
       formData.append("cid",cid);
       formData.append("mid",mid);
       formData.append("type","3");
       formData.append("product_details",obj1);

       //formData.append("category_name","");
       
       let url = APIS.baseurl+ APIS.product_module+"5";
       
       fetch(url,{method:'POST',body:formData}).then(response=>response.json().then(res =>{
         if(res.success){
           alert(res.message);
         
         }
       }));
       
     }
    render() {
        const child=Object.entries(this.state.products).
                                       map(([key,value])=>(!this.state.filters.includes(key)?
                                                         <div className="container">
                                                         <div className="d-flex justify-content-center h5">{key.replace("_" ," ").toUpperCase()}</div>
                                                            <div className="row d-flex justify-content-center">
                                                                
                                                                {value.map(main_array=>
                                                                              (     <Card className="col-md-3 col-lg-3 m-3 p-3" style={{height:'auto'}}><div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"> <ol className="carousel-indicators"> {main_array['image'].split(',').map(([value,key],i)=>(<li data-target="#carouselExampleIndicators" data-slide-to={i} ></li>))} </ol>{
                                                                              <div className="carousel-inner">{
                                                                              main_array['image'].split(',').map((value,i)=>( i == 0? <div className="carousel-item active"><img className="d-block w-100" src={value} alt="First slide"></img></div>:<div className="carousel-item"><img className="d-block w-100" src={value} alt="First slide"></img></div>))}</div>} { <div >  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                              <span className="sr-only">Previous</span>
                                                                             </a><a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a></div>}</div>{Object.entries(main_array).map(([key,value],i)=>  this.state.filters1.includes(key)?(
                                                                                                          
                                                                                                              <div className="row p-1">
                                                                                                                        {key == "brochure_image" ?  main_array['interested'] == 1? <label>{}</label>: <label>{}</label>:<label className="col-md-4 col-lg-4 h6">{key.charAt(0).toUpperCase()+key.slice(1).replace("_"," ")}</label>}  
                                                                                                                          { key == "brochure_image" ?  main_array['interested'] == 1?  <div className="col-md col-lg d-flex justify-content-around align-content-center" style={{backgroundColor:'rgb(255, 154, 0)'}}>  <a  href="#"  onClick={()=>this.download(value)} > <h6>Download Brochure</h6></a></div>:main_array['interested'] == 0?<div className="col-md col-lg d-flex justify-content-around align-content-center" style={{backgroundColor:'rgb(255, 154, 0)'}}><a href="#" onClick={()=>this.connect(main_array)}><h5>Interested</h5></a></div>:<div className="col-md col-lg d-flex justify-content-around align-content-center" style={{backgroundColor:'rgb(255, 154, 0)'}}><a><h5>Request Sent</h5></a></div>:<label className="col-md-8 col-lg-8" style={{textOverflow:'ellipsis',height:'10px', fontSize:'18px'}}>{this.state.special[i]}{value.charAt(0).toUpperCase()+value.slice(1)}</label>}
                                                                                                           </div>):key == 'image' ?"" :"")}
                                                                                    </Card>))}
                                                                      
                                                            </div></div>:""));
        return (
            <div>
                  {Object.keys(this.state.products).length > 0 ?<div><div> {child}</div> <div className="d-flex justify-content-center mt-5"> <Pagination
                              activePage={this.state.activePage+1}
                              itemsCountPerPage={this.state.products.item_per_pages}
                              itemClass="page-item"
                              linkClass="page-link"
                              totalItemsCount={this.state.products.total_pages * this.state.products.item_per_pages}
                              pageRangeDisplayed={this.state.products.total_pages}
                              onChange={this.handlePageChange.bind(this)}/></div></div>:""}            </div>
        );
    }
}

export default viewproduct;
