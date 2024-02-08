import React, { Component} from 'react';
import InputContainer  from '../row_input_elements/inputs';
import SelectContainer from '../row_input_elements/select';
import APIS from '../../APIS/APIS';
class addproduct extends Component {
    constructor(props){
        super(props);
        this.state = {section:[],category:[],subcategory:[],sub_cat_id:1};
         this.handleSubmit = this.handleSubmit.bind(this);
        this.get_page_content = this.get_page_content.bind(this);
         //this.download = this.download.bind(this);
    }
    componentWillMount(){
        
          

      //  document.getElementById('name').value = "sgdsffgds";
    
    }
    

    componentDidMount(){
        this.get_page_content();
        this.setState({sub_cat_id:document.getElementById('category_id').value});
    }

    
        
    get_page_content(){
   
        let  main_id = 1;
        let sub_cat_id =1;
      //  alert(document.getElementById('section_id').value); 
     
      if(!document.getElementById('section_id').value == ""){
          main_id = document.getElementById('section_id').value;
          sub_cat_id = document.getElementById('category_id').value;
      }
 
      let url = APIS.baseurl+APIS.product_module+"4";
        
        let formData = new FormData();
        formData.append("cat_id",main_id);
        formData.append("sub_cat_id",sub_cat_id);
        fetch(url,{
         method:'POST',
         body:formData
         }).then(response=>response.json().then(res=>{
                 this.setState({section:res.product_main_category,category:res.product_category,subcategory:res.product_subcategory});
     }));
    }
    handleSubmit(e){
      ///  alert(e.target.id);
        e.preventDefault();
        let url = APIS.baseurl+APIS.product_module+"1";
        
       let formData = new FormData(document.getElementById(e.target.id));
       //alert(url);
       fetch(url,{method:'POST',body:formData}).
              then(response=>response.json()
                 .then(res=>{
                     if(res['code'] == '0'){
                         alert(res.message);
                         window.history.go(0);
                     }
                    // alert(JSON.stringify(res));
                })); 
         
    }
    
    render() {
    
        return (
            <form id="product_form" method="POST"  encType="multipart/form-data" onSubmit={(e)=>this.handleSubmit(e)}>
            <div className="d-flex justify-content-center">
                <input type="hidden" name="member_id" id="member_id" value={localStorage.getItem('token')} />
                 
               <div className="container col-md-6 col-lg-6">
               <div className="d-flex justify-content-center mb-3">
               <h4>Add Product</h4>  
               </div>
                    <div className="form-group">
                          <SelectContainer  title="Sector"  items={this.state.section} hanldleChange={this.get_page_content}  select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" name="section_id" id="section_id" required={true} />
                    </div>
                    <div className="form-group">
                         <SelectContainer  title="Category" items={this.state.category} hanldleChange= {this.get_page_content}    select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" name="category_id" id="category_id" required={true}
                     />
                    </div>
                    <div className="form-group">
                    <SelectContainer  title="Sub Category" items={this.state.subcategory} hanldleChange={this.get_page_content} select_class="form-control col-md-8 col-lg-8" label_class="col-md-4 col-lg-4" name="subCategory_id" id="subCategory_id" required={true}
                     />
                    </div>
                    <div className="form-group">
                    <InputContainer title="Organization Name" name="organization_name" id="organization_name" type="text" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4" required={true} />
                    </div>
                    <div className="form-group">
                    <InputContainer title="Website"  name="website" id="website" type="text" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4" required={true} />
                    </div>
                    <div className="form-group">
                    <InputContainer title="Contact Person" name="contact_person" id="contact_person" type="text" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4" required={true} />
                    </div>
                    <div className="form-group">
                    <InputContainer title="Mobile No" pattern="[7-9]{1}[0-9]{9}" name="contact_phone_no" id="contact_phone_no" type="text" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4" required={true} />
                    </div>
                    <div className="form-group">
                    <InputContainer title="Email" name="contact_email_id" id="contact_email_id" type="email" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4" required={true} />
                    </div>
                    <div className="form-group">
                    <InputContainer title="Product Name" name="name" id="name" type="text" class_input="form-control col-md-8 col-lg-8" class_label="col-md-4 col-lg-4" required={true} />
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="form-label col-md-4 col-lg-4">Description</label>
                            <textarea  id="description" name="description" className="form-control col-md-8 col-lg-8" row="5" required={true} />
                         </div>
                    </div>
                    <div className="form-group"><InputContainer title="Product Image"  accept={"image/*"}  type="file" class_input="form-control col-md-8 col-lg-8" class_label="label-control col-md-4 col-lg-4" name="image[]" id="image[]" required={true} />
</div>
<div className="form-group"><InputContainer title="Product Brochure" type="file" accept={"application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf"}  class_input="form-control col-md-8 col-lg-8" class_label="label-control col-md-4 col-lg-4" name="broucher_image[]" id="broucher_image[]" required={true} />
</div>
                    <div className="form-group"><InputContainer title="Product Price" type="number" step="0.01" class_input="form-control col-md-8 col-lg-8" class_label="label-control col-md-4 col-lg-4" name="price" id="price" />
</div>
<div className="d-flex justify-content-center mt-5">
               <button type="submit" className="col-md-2 col-lg-2 p-1">Save</button>  
               </div>
               </div>
            </div>
            </form>
        );
    }
}


export default addproduct;
