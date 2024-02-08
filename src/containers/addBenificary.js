import React, { Component } from 'react';
import APIS from '../APIS/APIS';
import Student from '../containers/student';
import Ngo from '../containers/ngos';
import Referral from '../containers/Register';
import Acadmic from '../containers/academic';
import Seniors from '../containers/Beneficiery/Add/addSeniors';
// s
class addBenificary extends Component {
    
    constructor(props){
        super(props);
    this.state = {Categories:[],inner:false,form_id:''};
    this.enable_category  = this.enable_category.bind(this);
    
    }
    
  
    componentDidMount() {
//alert(localStorage.getItem('token'));
      // alert(APIS.baseurl+APIS.getcategories);
     let formData = new FormData();
     formData.append('is_beneficiery','1');
      fetch(APIS.baseurl+APIS.getcategories,{
            method:'POST',
            body:formData
        }).then(response => {
                              response.json().then(
                              res=> {
                                        this.setState({Categories:res});
                                    } 
           );
    });
    }
    enable_category(){
     //   alert(document.getElementById('category').value);
        
        switch(document.getElementById('category').value) {
          
          case "1" : this.setState({inner:<Student />});
                   // this.setState({form_id:'form-student'});
          break;
          case "5": this.setState({inner:<Acadmic />});
                  //this.setState({form_id:'form-academic'});
          break;
          case "6": this.setState({inner:<Ngo />});
                  //this.setState({form_id:'form-ngo'});
                  break;
          case "13":this.setState({inner:<Seniors />});
                  break;
          case "14":this.setState({inner:<Referral Isreferral={true} />})        
      }
    }

    render() { 
        return (
            <div>
            <form>
                <div className="container">
                    
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><h4 style={{fontFamily:'cursive',color:'black'}}>Add Beneficiary</h4></div>
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                   <div className="form-group col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-3" >
                          <div className="row" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                              <label className="col-md-4 col-sm-4 col-lg-2 col-xs-4 ml-xs-n5 ml-sm-n5" style={{fontStyle:'bold',alignItems:'flex-start'}}>Category</label>
              
                       <select id="category" className="form-control col-md-8 col-sm-4 col-xs-6 col-lg-5" name="category" style={{alignItems:'center'}}>
                           <option>select</option>
                           {
                               this.state.Categories.map((data)=><option value={data.id} >{data.name}</option>)
                           }
                           <option value="14">Reference</option>
                       </select>
                       <label className="col-md-2 col-sm-4 col-lg-1 col-xs-1" style={{marginLeft:10,fontSize:'18px',alignItems:'flex-end'}}><a style={{color:'#0000ff'}} onClick={this.enable_category} href="#"> Add</a></label>
                      
                    </div>
                    </div>
                      </div>
<div style={{display:'flex',justifyContent:'center'}}>
                      <div className="col-md-6 col-lg-5 col-sm-8 col-xs-12 mt-5 ml-sm-n5 ml-md-n5 ml-lg-n5 ml-xl-0">
                      {             
            this.state.inner
 }   </div> 
</div>
                </div>
                </form>                  
                             
           </div>
        );
    }
}

export default addBenificary;
