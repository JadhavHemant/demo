import React, { Component } from 'react';
import ThemeDefault from '../theme-default';
import APIS from "../APIS/APIS";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 import PageBase from '../components/PageBase';



//  const styles = {
//   toggleDiv: {
//     maxWidth: 300,
//     marginTop: 40,
//     marginBottom: 5
//   },
//   toggleLabel: {
//     color: grey400,
//     fontWeight: 100
//   },
//   buttons: {
//     marginTop: 30,
//     float: 'right'
//   },
//   saveButton: {
//     marginLeft: 5
//   }
// };
const Data     = ['Afghanistan', 'Bahamas', 'China', 'Democratic Republic of the Congo','Egypt','France','German','Haiti','India'];
class Register extends Component {
  
  constructor(props) {
    super(props);
    this.state = {pointer_event:'auto',refferId:'',Categories:[],gender:['Male','Female','Transgender'],echo_systems:[{id:'id',name:'lad'}],company:'',echo_system:'', mentors_firstname:'',mentors_lastname:'',mentors_middlename:'',streetAddress:'',street_addess:'',Address:'',city:'',state:'',postcode:'',country_id:0,mentors_telephone:'',mentors_fax:'',qualification:'',mentors_grade:'',comp_sataus:'',mentors_yop:'',mentors_dob:'',tech_skill:'',proj_interest	:'',mentors_email_address:'',ref_associate:'',photograph:'',mentors_CV:'',remark:'',cvfiles:{},ppfiles:{},password:'',fields:[],errors:[],page:false ,form_names:['mentors_firstname','mentors_middlename','mentors_lastname','mentors_dob','mentors_email_address','company','street_addess','suburb','city','postcode','state','country_id','mentors_telephone','mentors_fax','qualification','mentors_grade','comp_sataus','mentors_yop','tech_skill','proj_interest','ref_associate','photograph','mentors_CV',
  'mentors_CV','remark','mentors_password','mentors_referral'] ,countries:{}
   };
  this.handleSubmit = this.handleSubmit.bind(this);  
  this.bindCV = this.bindCV.bind(this);
  this.get_echo_system = this.get_echo_system.bind(this);
}
 handleSubmit(e){
   //alert(e.target.value);
    e.preventDefault();
    if(!this.props.Isreferral){
  if(this.validateForm()){
     const formData = new FormData(document.getElementById('form-registration'));
   fetch(APIS.baseurl+APIS.user_op+"/1/0",{
      method:'POST',
      body:formData
    }).then(response => response.json().then(res =>{ 
      console.log(res);
     // alert(res.status);
      if(res.success){
        alert(res.message);
       // window.history.go(0);
      this.props.router.replace('/');
      }
      else if(res.code == 1062){
        let errors;
        errors["email"] = "*email-ID already exits .";
        alert('the given email id already exits please try with another email');
        this.setState({errors:errors});
        
      }
      else{
        alert(res.message);
      }
    }));

  }
}
else{
  let url;
  let formData;
  //alert(e.target.id);
  if(e.target.id === "form-registration")
  { 
      url = APIS.baseurl+APIS.insert_beneficiery;
      formData = new FormData(document.getElementById('form-registration'));
      formData.append('table','reffers');
   }
  else
  {
    url = APIS.baseurl+APIS.getmembers;
    formData= new FormData();
    formData.append('reffer_id',e.target.value);
  }
  fetch(url,{
    method:'POST',
    body:formData
  }).then(response=>response.json().then(res=>{
    //alert(res.status);
   if(res.length > 0)
   {
    Object.entries(res[0]).map(([keyName, value])=>{
    // alert(keyName);
     if(keyName === 'comp_sataus'){
      document.getElementById('comp_sataus').value = value;
     }
      if(keyName === 'country_id'){
      document.getElementById('country_id').value = Data[value];
     }
     if(keyName === 'mentors_yop'){
      document.getElementById('mentors_yop').value = value;
     }
     if(keyName === 'tech_skill'){
      document.getElementById('tech_skill').value = this.state.Categories[value].name;
     }
      this.setState({[keyName]:value});
    });
    //alert(JSON.stringify(res));
   }
  }));
}

}

// handleSubmit(){
//   if(this.validateForm()){
//     return true;
//   }
//   else{
//     p
//   }
// }
handleChange(e) {
    let fields = this.state.fields;
  //  console.log("val="+e.target.value);
 
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }
  bindReferralId(e){
    //alert(e.target.value);
   this.handleSubmit(e);
    this.setState({refferId:e.target.value});
   
    // e.preventDefault();
  }
bindfaxnumber(e){
    this.setState({mentors_fax:e.target.value});
 //   this.handleChange(e);
  }
  bindcompanyName(e){
    this.setState({company:e.target.value});
   // this.handleChange(e);  
}
  bindfirstName(e){
    this.setState({mentors_firstname:e.target.value});
    //this.handleChange.bind(e); 
}
  bindmiddleName(e){
    this.setState({mentors_middlename:e.target.value});
  }
  bindlastName(e){
    this.setState({mentors_lastname:e.target.value});
  }
  bindstreetAddress(e){
    this.setState({street_addess:e.target.value}); 
  }
  bindAddress(e){
    this.setState({Address:e.target.value}); 
  }
  bindCity(e){
    this.setState({city:e.target.value}); 
  }
  bindstate(e){
    this.setState({state:e.target.value}); 
  }
  bindPost(e){
    this.setState({postcode:e.target.value});
  }
  bindQualitfication(e){
    this.setState({qualification:e.target.value});
  }
  
  bindGrade(e){
    this.setState({mentors_grade:e.target.value});
  }
  completeStatus(e){
    this.setState({comp_sataus:e.target.value});
  }
  bindrba(e){
    this.setState({ref_associate:e.target.value});
  }
  yearofpassing(e){
    this.setState({mentors_yop:e.target.value});
  }
  bindtelephone(e){
    this.setState({mentors_telephone:e.target.value});
  }
  
  bindRemark(e){
    this.setState({remark:e.target.value});
  }
  bindPI(e){
   // alert(e.target.value);
    this.setState({proj_interest:e.target.value});
  }
  bindPP(event){
 
    this.setState({photograph:event.target.value});
    this.setState({ppfiles:event.target.files});
    //console.log(event.target.files);
  }
  bindTSS(e){
    this.setState({tech_skill:e.target.value});
  }
  bindDob(e){
    this.setState({mentors_dob:e.target.value});
  }
  qualification(e){
    this.setState({qualification:e.target.value});
  }
  bindEmail(e){
    this.setState({mentors_email_address:e.target.value});
  }
  bindCountry(e){
    this.setState({country_id:e.target.value});
  }
  bindPassword(e){
      this.setState({mentors_password:e.target.value});
  }
  bindecho_system(e){
    this.setState({echo_system:e.target.value});
  }
  /*bindCV(files,value){
   // alert(JSON.stringify(e.target.value));
   //e.preventDefault();
    
    this.setState({cv:value});
    this.setState({cvfiles:files});
    
    alert(JSON.stringify(files));
  
  }*/
  bindCV(event){
 // console.log(event.target.files);
  this.setState({mentors_CV:event.target.value});
  this.setState({cvfiles:event.target.files});
  }
  
  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (this.state.mentors_password === "") {
        formIsValid = false;
      //  alert(1);
        errors["password"] = "*Please enter your password.";
    }
    if(this.state.mentors_telephone === ""){
      formIsValid = false;
      errors["telNo"] = "*Please enter your Mobile No.";
      //alert(2);
    }
    if(this.state.mentors_fax === ""){
      formIsValid = false;
      errors["faxNo"] = "*Please enter your Fax Number No.";
      //alert(3);
    }

    if (typeof this.state.mentors_password !== "undefined") {
     if (!this.state.mentors_password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)){
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
        //alert(4);
      }
    
    }
    if (this.state.company === "") {
      formIsValid = false;
      errors["cname"] = "*Please enter your company Name.";
      //alert(5);
    }
    if (this.state.mentors_firstname === "") {
      formIsValid = false;
      errors["fname"] = "*Please enter your Firt Name.";
     // alert(6);
    }
    // if (this.state.mentors_middlename === "") {
    //   formIsValid = false;
    //   errors["mname"] = "*Please enter your Middle Name.";
    //   //alert(7);
    // }
    if (this.state.mentors_lastname === "") {
      formIsValid = false;
      errors["lname"] = "*Please enter your Last Name.";
      //alert(8);
    }
    if (this.state.street_addess === "") {
         formIsValid = false;
         errors["streetAddress"] = "*Please enter your streetAddress.";
        //alert(9);
        }
    if (this.state.address === "") {
         formIsValid = false;
         errors["address"] = "*Please enter your Address.";
        //alert(10);
        }
    if(this.state.city === ""){
         formIsValid = false;
         errors['city'] = "*Please enter your city";
          //alert(11);
        }
    if(this.state.state === ""){
      formIsValid = false;
      errors['state'] = "*Please enter your state";
       //alert(12);
    }
    if(this.state.country_id === 0){
      formIsValid = false;
      errors['country'] = "*Please enter your city";
        //alert(13);
    }
    if(this.state.cv === ""){
      formIsValid = false;
      errors['cv'] = "*Please select CV";
       //alert(14);
    }
    if(this.state.photograph === ""){
      formIsValid = false;
      errors['pp'] = "*Please select PP";
       //alert(15);
    }
    if(this.state.dob === ""){
      formIsValid = false;
      errors['dob'] = "*Please enter DOB";
      //alert(16);
    }
    if(this.state.qf === ""){
      formIsValid = false;
      errors['qf'] = "*Please enter enter qualification";
      //alert(17);
    }
    

        // if (typeof this.state.cname !== "undefined") {
    //  if (!this.state.cname.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["c"] = "*Please enter company Name.";
    //   }
    // }

    if (this.state.mentors_email_address === "") {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
      //alert(18);  
    }
    if (typeof this.state.mentors_email_address !== "undefined") {
      //regular expression for email validation
      const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(this.state.mentors_email_address)) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        //  alert(19);
      }
    }
  
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

componentDidMount(){
  fetch("https://api.first.org/data/v1/countries", {
	method: "GET",
})
.then(response => {
  console.log(response);
       response.json().then(res=>{

                                this.setState({countries:res.data});    
                       });
})
.catch(err => {
	console.log(err);
});
}
  componentWillMount() {

    if(this.props.Isreferral){
      this.setState({pointer_event:'none'});
//    this.setState({ctype:'text'});
document.getElementById('d_comp_status').innerHTML='<label class="col-sm-4 col-lg-4">Completion Status:</label><input class="form-control col-sm-8" name="comp_sataus" id="comp_sataus" value="" />';
document.getElementById('div_country').innerHTML=' <label class="col-sm-4 col-lg-4">Country:</label><input class="col-sm-8 form-control" name="country_id" id="country_id" />';
document.getElementById('div_yop').innerHTML='<label class="col-sm-4 col-lg-4">Year Of Passing:</label><input class="form-control col-sm-8" name="mentors_yop" id="mentors_yop"/>';
document.getElementById('div_category').innerHTML='<label class="col-sm-4 col-lg-4">Category:</label><input class="form-control col-sm-8" name="tech_skill" id="tech_skill" />';   
}
    fetch(APIS.baseurl+APIS.getcategories,{
        method:'GET'
    }).then(response => {
                          response.json().then(
                          res=> {
  //                           
                                  this.setState({Categories:res});
                                  //alert(JSON.stringify(this.state.Categories));
                               } 
                                            );
});
this.get_echo_system();
}
get_echo_system(){
let url = APIS.baseurl+APIS.get_echo_systems;
fetch(url,{method:'GET'}).then(response=>(response.json().then(res=>{localStorage.setItem("echo_systems",JSON.stringify(res));this.setState({echo_systems:res});})));
}
 render(){
 
   const status     = ['--Select--','Complete','Incomplete'];
   const year     = ['--Select--','2019','2018','2017','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004'];   
   //const project_category = ['Dot Net','C#','ADO Net','VB Dot Net','Php','Java'];
    // var year     = ['--Select--','2019','2018','2017','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004'];
   //document.getElementById('country_id') != null? this.props.Isreferral?document.getElementById('country_id').value = Data[document.getElementById('country_id').value]:'':0;
   
  return (
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <section className="wrapper" style={{backgroundImage:'url('+require("../images/images.jpeg")+')',backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'noRepeat',backgroundAttachment: 'fixed',width: '100%',
            height: 'auto',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom:'0',
           }}>
    <PageBase title="Registration Form" >
           <form onSubmit={(e)=>this.handleSubmit(e)} id="form-registration" >
             
               <input name="type" style={{visibility:"hidden",height:'0px'}}  />
                     <div className="ml-3">
                       <img alt="Passion It" src={require("../images/logo.png")}/>
                     </div>
 {
 this.props.Isreferral?  <div className="row col-md-5 mt-3" >
   <label className="col-sm-4 col-lg-4">Refferal Id:</label>
      <input  className="form-control col-sm-8 col-lg-8" name="reffer_id" value={this.state.refferId} onChange={(e)=>this.bindReferralId(e)} type="text"  placeholder="Reffer Id" />
      </div>:<div></div> 
 }
            <div className="container p-1 row col-sm-12" style={{display:'flex',justifyContent:'center',pointerEvents:this.state.pointer_event}}>
             
            <div className="form-group col-sm-6 col-lg-6  mt-3">
            <div className="row p-1">

<label className="col-sm-4 col-lg-4">Eco System:</label>
   <select className="form-control col-sm-8 col-lg-8" name="echo_system" value={this.state.echo_system} onChange={(e)=>this.bindecho_system(e)}  placeholder="" required aria-required="true" >
     <option value="">Select</option>
     {this.state.echo_systems.map(value=>(<option value={value.id}>{value.name}</option>))}
   </select>
   </div>
            <div className="row p-1">

<label className="col-sm-4 col-lg-4">Company Name:</label>
   <input className="form-control col-sm-8 col-lg-8" name="company" value={this.state.company} onChange={(e)=>this.bindcompanyName(e)} type="text" placeholder="PASSION" />
   </div>
   <div className="errorMsg">{this.state.errors.cname}</div>
             {/* {this.props.Isreferral?
   <div>
    <div><div className="row p-1">

<label className="col-sm-4 col-lg-4">Company Name:</label>
   <input className="form-control col-sm-8 col-lg-8" name="company" value={this.state.companyName} onChange={(e)=>this.bindcompanyName(e)} type="text" placeholder="PASSION" />
   </div>
   <div className="errorMsg">{this.state.errors.cname}</div></div></div>:  
             } */}
               
                     <div className="row p-1">
                     <label className="col-sm-4 col-lg-4">First Name:</label>
                     <input className="form-control col-sm-8 col-lg-8" name="mentors_firstname" value={this.state.mentors_firstname} type="text" placeholder="First Name" onChange={(e)=>this.bindfirstName(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.fname}</div>
                     <div   className="row p-1">
                     <label className="col-sm-4 col-lg-4">Middle Name:</label>
                     <input className="form-control col-sm-8 col-lg-8" name="mentors_middlename" value={this.state.mentors_middlename} type="text" placeholder="Middle Name" onChange={(e)=>this.bindmiddleName(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.mname}</div>
                     
                     <div className="row p-1">
                          <label className="col-sm-4 col-lg-4">Last Name:</label>
                          <input className="form-control col-sm-8 col-lg-8" name="mentors_lastname" value={this.state.mentors_lastname} type="text" placeholder="Last Name" onChange={(e)=>this.bindlastName(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.lname}</div>
                     <div className="row p-1">
                          <label className="col-sm-4 col-lg-4">Gender:</label>
                          <select className="form-control col-sm-8 col-lg-8" name="gender" id="gender" required aria-required="true" >
                             <option value="">Select</option>
                             {this.state.gender.map(value=>(<option value={value}>{value}</option>))}
                          </select>
                     </div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Street Address:</label>
                           <input className="form-control col-sm-8 col-sm-8" name="street_addess" value={this.state.street_addess} type="text" placeholder="Street Address" onChange={(e)=>this.bindstreetAddress(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.streetAddress}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Address:</label>
                           <textarea className="form-control col-sm-8 col-lg-8" name="address" value={this.state.Address} rows="3" type="text" placeholder="Address" onChange={(e)=>this.bindAddress(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.address}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">City:</label>
                           <input className="form-control col-sm-8 col-lg-8" name="city" rows="3" type="text" value={this.state.city} placeholder="City" onChange={(e)=>this.bindCity(e)}/>
                     </div>
                     <div className="errorMsg">{this.state.errors.city}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">State:</label>
                           <input className="form-control col-sm-8 col-lg-8" name="state" rows="3" type="text" value={this.state.state} placeholder="State" onChange={(e)=>this.bindstate(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.state}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Post/ZipCode:</label>
                           <input className="form-control col-sm-8 col-lg-8" rows="3" name="postcode" value={this.state.postcode} type="text" placeholder="Post/ZipCode" onChange={(e)=>this.bindPost(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.pcode}</div>
                     <div className="row p-1" id="div_country">
                           <label className="col-sm-4 col-lg-4">Country:</label>
                           <select className="col-sm-8 form-control" name="country_id" key={this.state.country} value={this.state.country_id}
                            onChange={(e)=>this.bindCountry(e)} required required-aria="true" >
                                    <option value="">Select</option>
                                   {Object.entries(this.state.countries).map(([key,y])=> <option key={key} value={key}>{y.country}</option>)}
                          </select>
                     </div>
                     <div className="errorMsg">{this.state.errors.country}</div>

                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Mobile Number:</label>
                           <input className="form-control col-sm-8 col-lg-8" name="mentors_telephone" rows="3" value={this.state.mentors_telephone} type="text" pattern="[7-9]{1}[0-9]{9}" placeholder="Telephone" onChange={(e)=>this.bindtelephone(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.telNo}</div>

                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Whatsapp Number:</label>
                           <input className="form-control col-sm-8 col-lg-8" name="mentors_fax" value={this.state.mentors_fax}  type="text" placeholder="whatsapp  Number" onChange={(e)=>this.bindfaxnumber(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.faxNO}</div> 

                   

                     {/* <div className="errorMsg">{this.state.errors.}</div> */}
            
                   </div>

                   {/* Right Section */}
                   
                   <div className="mt-3 col-sm-6">
                   <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Qualification:</label>
                           <input className="form-control col-sm-8 col-lg-8" rows="3" name="qualification" value={this.state.qualification} onChange={(e)=>this.bindQualitfication(e)} type="text" placeholder="Qualitfication" />
                     </div>  
                     <div className="errorMsg">{this.state.errors.qf}</div>

                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Grade:</label>
                           <input className="form-control col-sm-8 col-lg-8" rows="3" name="mentors_grade" type="text" value={this.state.mentors_grade} onChange={(e)=>this.bindGrade(e)} placeholder="" />
                     </div>
                     <div className="errorMsg">{this.state.errors.grade}</div>
                   <div className="row p-1" id="d_comp_status">
                           <label className="col-sm-4 col-lg-4">Completion Status:</label>
                           <select className="form-control col-sm-8" name="comp_sataus" id="com_staus" value={this.state.comp_sataus} onChange={(e)=>this.completeStatus(e)}>
                             {status.map((x,y)=> <option key={y}>{x}</option>)}
                           </select>
                     </div>
                     <div className="errorMsg">{this.state.errors.cstaus}</div>

                     <div className="row p-1" id="div_yop">
                           <label className="col-sm-4 col-lg-4">Year Of Passing:</label>
                           <select className="form-control col-sm-8" name="mentors_yop" value={this.state.mentors_yop} onChange={(e)=>this.yearofpassing(e)}>
            {year.map((x,y)=> <option key={y}>{x}</option>)}
                                   </select>
                     </div>
                     <div className="errorMsg">{this.state.errors.yop}</div>

                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Date Of Birth:</label>
                           <input className="form-control col-sm-8" type="date" name="mentors_dob" value={this.state.mentors_dob} onChange={(e)=>this.bindDob(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.dob}</div>

                     <div className="row p-1" id= "div_category">
                           <label className="col-sm-4 col-lg-4">Category:</label>
                           <select className="form-control col-sm-8" value={this.state.tech_skill} name="tech_skill" onChange={(e)=>this.bindTSS(e)}>
                             <option>Select</option>
                             {this.state.Categories.map((data)=>  <option value={data.id}>{data.name}</option>)}
                           </select>
                           {/* <input className="form-control col-sm-8" name="tech_skill" value={this.state.tss} type="text" onChange={(e)=>this.bindTSS(e)} /> */}
                     </div>
                     <div className="errorMsg">{this.state.errors.tss}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Project Interest:</label>
                           <input className="form-control col-sm-8" type="text" name="PI" value={this.state.proj_interest} onChange={(e)=>this.bindPI(e)} />
                           {/* <select className="form-control col-sm-8" name="PI" id="PI" multiple="multiple" >
                                   {p roject_category.map((x,y)=> <option key={y}>{x}</option>)}
                                   </select> */}
                     </div>
                     <div className="errorMsg">{this.state.errors.PI}</div>
                   <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Email ID:</label>
                           <input className="form-control col-sm-8" name="mentors_email_address	" type="text" value={this.state.mentors_email_address} onChange={(e)=>this.bindEmail(e)}/>
                     </div>
                     <div className="errorMsg">{this.state.errors.email}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Password:</label>
                          <input className="form-control col-sm-8" name="mentors_password" type="password" value={this.state.mentors_passwords} onChange={(e)=>this.bindPassword(e)}/> 
                     </div>
                     <div className="errorMsg">{this.state.errors.password}</div>
                   <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Referred by Associate:</label>
                           <input className="form-control col-sm-8" name="ref_associate" type="text" value={this.state.ref_associate} onChange={(e)=>this.bindrba(e)}/>
                     </div>
                      <div className="errorMsg">{this.state.errors.rba}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Post Photograph:</label>
                           <input name="photograph[]" className="form-control col-sm-8" type="file" multiple  onChange={(e)=>this.bindPP(e)} />
                     </div>
                     <div className="errorMsg">{this.state.errors.filePP}</div>
                     <div className="row p-1">
                           <label className="col-sm-4 col-lg-4">Post CV:</label>
                           <input name="mentors_CV[]" className="form-control col-sm-8" id="postCV" multiple  onChange={(e)=>this.bindCV(e)} type="file" />
                     </div>
                     
                     <div className="errorMsg">{this.state.errors.cv}</div>

                     <div className="row p-1">
                          <label className="col-sm-4 col-lg-4">Remark:</label>
                          <textarea className="form-control col-sm-8 col-lg-8" name="remark" value={this.state.remark} rows="3" type="text" placeholder="introduce yourself briefly" onChange={(e)=>this.bindRemark(e)}  />
                     </div>
                     <div className="errorMsg">{this.state.errors.remark}</div>
                   </div>
                </div>
                <div className="d-flex justify-content-center m-5">
                          <button type="submit" className="btn btn-primary col-sm-3 mt-4 col-lg-3 align-self-center">Save</button> 
                     </div>
               {/* </div> */}
               </form>
    </PageBase>
    </section>
</MuiThemeProvider>
  );
 }
}

export default Register;
