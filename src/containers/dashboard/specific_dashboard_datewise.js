import React, { Component } from 'react';
import '../../loader';
//import SelectContainer from '../row_input_elements/select';
let cat_id ,url,ecoId;
function add(total, value) {
    return total + parseInt(value.research_count);
}
function subTotal(total,value){
    return total+parseInt(value.research_count);
}
function ProjectssubTotal(total,value){
    return total+parseInt(value.project_count);
}
function Functotal(total,value){
     let t = value.categories.reduce(
         subTotal,0
     );
     return total+t; 
}
function FuncProjectstotal(total,value){
    let t = value.categories.reduce(
        ProjectssubTotal,0
    );
    return total+t; 
}
function FunProjectTotal(total,value){
    return total+parseInt(value.project_count);
}
function OpportunitysubTotal(total,value){
     return total+parseInt(value.opportunity_count);
}
function FuncOpportunitiesTotal(total,value){
  let t = value.categories.reduce(OpportunitysubTotal,0);
  return total+t;
}
function FuncOpportunityTotal(total,value){
    return total+parseInt(value.opportunity_count);
}
const style ={
    td:{
        textAlign:'center'
    }
};
function totalSubcategory(total,value){
    return total+parseInt(value.total);
}
function totalSubcategoryAllsub(total,value){
    return total+value.sub_category.reduce(totalSubcategoryAll,0);
}
function totalSubcategoryAllIn(total,value){
    let subTotal = total+ parseInt(value.total);
    return subTotal;
}
function totalSubcategoryAll(total,value){
    let mtotal =  value.objects.reduce(totalSubcategoryAllIn,0);
    return total+mtotal;
}

function products_date_wise(product_data_array,categories,subcategories){
   // alert(JSON.stringify(product_data_array));
    let child = product_data_array.length > 0 
             && Object.entries(categories).length > 0 
                && Object.entries(subcategories).length > 0 ?<div className="table-responsive">
                                                                      <table className="table-bordered" cellPadding="5px" width="100%">
                                                                                <thead>
                                                                                        <th>Category<select className="form-control"><option>Filter</option>{Object.entries(categories).map(([key,value])=>(<option value={key}>{value}</option>))}</select></th>
                                                                                        <th>SubCategory<select className="form-control"><option>Filter</option>{Object.entries(subcategories).map(([key,value])=><option value={key}>{value}</option>)}</select></th>
                                                                                        <th>Total</th>
                                                                                </thead>
                                                                                <tbody>
                                                                                {product_data_array.map(value=>(
                                                                                    <tr>
                                                                                        <td>{value.categoryName}</td>
                                                                                        <td>{<table className="table-bordered" width="100%">
                                                                                                 <thead>
                                                                                                     <th style={{backgroundColor:'transparent'}}>Name</th>
                                                                                                     <th style={{backgroundColor:'transparent'}}>Total</th>
                                                                                                 </thead>
                                                                                                 <tbody> {value.sub_category.map(obj=><tr><td>{obj.sub_categoryName}</td><td>{obj.objects.reduce(totalSubcategory,0)}</td></tr>)}
                                                                                                 </tbody>
                                                                                        </table>}</td>
                                                                                        <td>{value.sub_category.reduce(totalSubcategoryAll,0)}</td>
                                                                                    </tr>
                                                                                ))}
                                                                                
                                                                                </tbody><tfoot><td></td><td>Total</td><td>{product_data_array.reduce(totalSubcategoryAllsub,0)}</td></tfoot>
                                                                        </table>
                                                               </div>:<div className="table-responsive">
                                                                      <table className="table-bordered" cellPadding="5px" width="100%">
                                                                                <thead>
                                                                                        <th>Category<select className="form-control"><option>Filter</option>{Object.entries(categories).map(([key,value])=>(<option value={key}>{value}</option>))}</select></th>
                                                                                        <th>SubCategory<select className="form-control"><option>Filter</option>{Object.entries(subcategories).map(([key,value])=><option value={key}>{value}</option>)}</select></th>
                                                                                        <th>Total</th>
                                                                                </thead>
                                                                                <tbody><tr><td colSpan="12" style={{textAlign:'center'}}>No Products Available</td></tr></tbody></table></div>; 
    
     
      return  child;
            
            }


class specific_dashboard_datewise extends Component {
    constructor(props){
            super(props);
            this.handleSelect = this.handleSelect.bind(this);
           // alert(this.props.url);
         //   alert(JSON.stringify(this.props.echo_systems));
    }
    componentDidUpdate(){
        url = this.props.url;
           
    }
handleSelect(e){
    //let main_url=url;
    switch(e.target.id){
        case 'ecoId':
               cat_id = document.getElementById('cat_id').value;
               if(cat_id == 'Filter'){
                url = url+"&eco_system="+e.target.value;
               }
               else{
                url = url+"&eco_system="+e.target.value+"&category_id="+cat_id;
               }
              // alert(url);
               this.props.fetch_specific_dashboard(url);
               break;
        case 'cat_id':
                ecoId = document.getElementById('ecoId').value;
                if(ecoId == 'Filter'){
                 url = url+"&category_id="+e.target.value;
                }
                else{
                 url = url+"&eco_system="+ ecoId +"&category_id="+e.target.value;
                }
                //alert(url);
                this.props.fetch_specific_dashboard(url);
              break;    
    }



}

componentDidMount(){
$("#dataTable").dataTable();
}


opporturnities_date_wise(opporturnities_data_array,sectors){
   // alert(JSON.stringify(opporturnities_data_array));

let child=   opporturnities_data_array.length > 0 && Object.entries(sectors).length > 0 ?    <div className="table-responsive" ><table cellPadding="5px" className="table-bordered" width="100%">
                                                   <thead>
                                                        <tr>
                                                                 <th><div>Sector<select className="form-control"><option>Filter</option>{Object.entries(sectors).map(([key,value])=><option value={key}>{value}</option>)}</select></div></th>
                                                                 <th>Category</th>
                                                                 <th style={{textAlign:'center'}}>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {opporturnities_data_array.length> 0 ? opporturnities_data_array.map(value=> 
                                                         <tr>
                                                              <td style={{textAlign:'start',verticalAlign:'top'}}>{value.name}</td>
                                                              <td>
                                                                  <table className="table-bordered" cellPadding="5px" width="100%">
                                                                  <tr> { value.categories.map(obj=>(<td  style={{textAlign:'start'}}>{obj.job_name}</td>))} </tr>               
                                                                  </table>
                                                              </td>
                                                              
                                                              <td style={style.td}>{value.categories.reduce(FuncOpportunityTotal,0)}</td>                    
                                                        </tr>
                                                        ):<tr><td colSpan='12'>No Opportunities Available</td></tr>}
                                                    </tbody>
                                                    <tfoot><td></td><td>Total</td><td style={style.td}>{opporturnities_data_array.reduce(FuncOpportunitiesTotal,0)}</td></tfoot>
                                                
                                                </table>
            </div>:<div className="table-responsive"><table cellPadding="5px" className="table-bordered" width="100%">
                                                   <thead>
                                                        <tr>
                                                                 <th><div>Sector<select className="form-control"><option>Filter</option>{Object.entries(sectors).map(([key,value])=><option value={key}>{value}</option>)}</select></div></th>
                                                                 <th>Category</th>
                                                                 <th style={{textAlign:'center'}}>Total</th>
                                                        </tr>
                                                    </thead><tbody><tr><td colSpan="12" style={{textAlign:'center'}}>No Opportunities Available</td></tr></tbody></table></div>;
            return child;

}

researches_date_wise(research_data_array,sectors,categories){

return <div className="table-responsive"><table className="table-bordered" cellPadding="5px"  width="100%">
                                               <thead>
                                                   <tr>
                                                       <th width="30%"><div className="w-auto">Sector <select onChange={this.handleSelect.bind(this)} id="researh_sectors" className="form-control col-12"><option>Filter</option>{Object.entries(sectors).map(([key,obj])=><option value={key}>{obj}</option>)}</select></div></th>
                                                       <th width="30%"><div className="w-100">Category<select  className="form-control col-12"><option>Filter</option>{Object.entries(categories).map(([key,obj])=><option value={key}>{obj}</option>)}</select></div> </th>
                                                       <th width="30%" style={{textAlign:'center'}}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                        {
                                                            research_data_array.length >0 ? research_data_array.map(value=>
                                                                                    <tr>
                                                                                        <td width="30%" style={{textAlign:"center"}}>
                                                                                                           {value.name}
                                                                                        </td>
                                                                                                       
                                                                                        <td>
                                                                                         
                                                                                         <table cellPadding="5px" width="100%">
                                                                                                       
                                                                                                        <tr>{
                                                                                                            value.categories.map(value1=>
                                                                                                                <React.Fragment>
                                                                                                                             <td width="50%" style={{textAlign:'start'}}>{value1.area}</td>
                                                                                                                </React.Fragment>)
                                                                                                            }
                                                                                                        </tr>
                                                                                         </table>
                                                                                         
                                                                                         </td>
                                                                                         <td style={{textAlign:'center'}}>{value.categories.reduce(add,0)}</td>
                                                                                       </tr>
                                                                                    ):
                                                                                    <tr>
                                                                                        <td colSpan='12' style={{textAlign:'center'}}>No Researches Available</td>
                                                                                    </tr>
                                                        }
                                                 </tbody>
                                                <tfoot><tr><td></td><td>Total</td><td style={{textAlign:'center'}}>{research_data_array.reduce(Functotal,0)}</td></tr></tfoot>
                                            </table>
                                        </div>;
}
projects_date_wise(project_data_array,sectors,categories){
   // alert(JSON.stringify(sectors));
return <div className="table-responsive"><table cellPadding="5px" className="table-bordered"  width="100%">
                                                <thead>
                                                        <tr>
                                                            <th>Sector
                                                                <select className="form-control">
                                                                    <option>Filter</option>{Object.entries(sectors).map(([key,value])=><option value={key}>{value}</option>)}
                                                                
                                                                </select></th>
                                                            <th>Category <select className="form-control">
                                                                    <option>Filter</option>{Object.entries(categories).map(([key,value])=><option value={key}>{value}</option>)}
                                                                
                                                                </select> </th>
                                                            <th style={{textAlign:'center'}}>Total</th>
                                                        </tr>
                                                </thead>
                                                <tbody>{project_data_array.length > 0?
                                                                  project_data_array.map(value=>
                                                                                <tr>
                                                                                    <td style={{textAlign:'start'}}>{value.name}</td>
                                                                                    
                                                                                    <td><table cellPadding="5px" width="100%">
                                                                                                   <tr>{
                                                                                                          value.categories.map(obj=>
                                                                                                      
                                                                                                                  <td>{obj.day}</td>
                                                                                                            )
                                                                                                       
                                                                                                       } 
                                                                                                                                                                               
                                                                                                   </tr>
                                                                                        </table>

                                                                                    </td>
                                                                                    <td style={style.td}> {
                                                                                           value.categories.reduce(FunProjectTotal,0)
                                                                                         }
                                                                                    </td> 
                                                                                    
                                                                                </tr>
                                                                             )
                                                                
                                                            
                                                            // <td>
                                                            //     <table width="100%" className="table-borderless">{project_data_array.map(value=>value.categories.map(value1=>
                                                            //                         <tr><td style={{textAlign:'start'}}>{value1.category_name}</td>
                                                                                        
                                                            //                         </tr>))}
                                                            //     </table>
                                                            // </td>
                                                            // <td>
                                                            // <table width="100%" className="table-borderless">{project_data_array.map(value=>value.categories.map(value1=>
                                                            //                         <tr>
                                                            //                             <td>{value1.project_count}</td>
                                                            //                         </tr>))}
                                                            //     </table>
                                                            // </td>
                                                        :
                                                        <tr>
                                                            <td colSpan='12' style={{textAlign:'center'}}>No Projects Available </td>
                                                        </tr>
                                                        }
                                                 </tbody>
                                                 <tfoot><tr><td></td><td>Total</td><td style={style.td}>{project_data_array.reduce(FuncProjectstotal,0)}</td></tr></tfoot>
                                            </table>
            </div>;
}

members_table(member_data_array){
    
    return Object.keys(member_data_array.list_categories).length > 0 ? <div className="table-responsive mt-3">
                                                                      <table cellPadding="5px" className="w-100 table-bordered">
                                                                            <thead><tr><th>Category<select className="form-control" id="cat_ids"><option>Filter</option>{Object.entries(member_data_array.list_categories).map(([key,value])=><option value={key}>{value}</option>)}</select></th><th>Date<select className="form-control" name="dates" id="dates"><option>Filter</option>{member_data_array.dates.map(value=><option value={value}>{value}</option>)}</select></th><th>Total</th></tr></thead>
                                                                       <tbody>
                                                                           <tr>
                                                                                  <td width="30%">
                                                                                       
                                                                                    </td>
                                                                                    
                                                                                    <td width="60%" style={{verticalAlign:'top'}}>
                                                                                        <table cellPadding="5px" className="w-100 h-100 table-borderless" >
                                                                                            <tr>{member_data_array.members_list.map(value=>(
                                                                                                                <React.Fragment>
                                                                                                                    <td style={{verticalAlign:'top'}}>
                                                                                                                         <table cellPadding="0px" width="100%" className="table-borderless">
                                                                                                                                      <tr>
                                                                                                                                          <td >{value.name}</td>
                                                                                                                                      </tr>
                                                                                                                                      <tr>
                                                                                                                                          <td style={{display:'flex',alignItems:'center',alignContent:'center'}}>
                                                                                                                                           
                                                                                                                                          </td>
                                                                                                                                     </tr>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </React.Fragment> 
                                                                                                    ))
                                                                                                }
                                                                                            </tr>
                                                                                      </table>
                                                                                 </td>
                                                                                 <td width="10%">{}</td>
                                                                            </tr>
                                                                            <tr><td>
                                                                            <table className="table-light">{Object.entries(member_data_array.list_categories).map(([key,value1])=> 
                                                                                                <tr>
                                                                                                    <td id={key}>{value1}</td>
                                                                                                  </tr>)}
                                                                                         </table>
                                                                                </td><td style={{verticalAlign:'top'}}>   <table className="w-100 h-100 table-borderless">
                                                                                            <tr>  { member_data_array.members_list.map(value=> <td style={{verticalAlign:'top'}} > <table width="100%" className="table-borderless">
                                                                                                                                                  { value.categories.map(value=><tr>
                                                                                                                                                                <td style={{textAlign:'center',verticalAlign:'top'}}>{value.tcount}</td>
                                                                                                                                                </tr>)}
                                                                                                                                                
                                                                                                                
                                                                                            </table></td>)}</tr></table></td><td style={{verticalAlign:'top'}}><table className="table-borderless w-100">{member_data_array.category_wise_total.map(value=><tr><td>{value}</td></tr>)}</table></td></tr>
                                                                        </tbody><tfoot><tr><td></td><td>Total</td><td>{member_data_array.total}</td></tr></tfoot></table></div>:<div className="table-responsive"><table cellPadding="5px" className="w-100 table-bordered">
                                                                            <thead><tr><th>Category<select className="form-control" id="cat_ids"><option>Filter</option>{Object.entries(member_data_array.list_categories).map(([key,value])=><option value={key}>{value}</option>)}</select></th><th>Date<select className="form-control" name="dates" id="dates"><option>Filter</option>{member_data_array.dates.map(value=><option value={value}>{value}</option>)}</select></th><th>Total</th></tr></thead><tbody><tr><td colSpan="12" style={{textAlign:'center'}}>No Connects Available</td></tr></tbody></table></div>;
    }
    echo_systems_date_wise(echo_system_array){

    return  Object.entries(echo_system_array).length> 0 ?<div className="table-responsive mt-3">
        <table className="w-100 table-bordered" cellPadding="5px">
            <thead>
                <tr>
                    <th style={{verticalAlign:'top'}}> <div className="w-auto">
                             <label>Eco System</label>
                                <select className="form-control" id="ecoId" name="ecoId" onChange={(e)=>this.handleSelect(e)} ><option>Filter</option>{Object.entries(this.props.echo_systems).map(([key,value])=> <option value={key}>{value}</option>)}</select>
                                        </div>
                        
                    </th>
                    
                    
                    <th style={{verticalAlign:'top'}}>
                            <div className="w-auto"> <label>Category</label>
                                <select className="form-control"  id="cat_id" name="cat_id" onChange={(e)=>this.handleSelect(e)}><option>Filter</option>{ Object.entries(this.props.categories).map(([key,value])=> <option value={key}>{value}</option>)}
                                 
                    </select> </div>
                    <table className="table-borderless" cellPadding="5px"><tr>{Object.entries(this.props.categories).map(([key,value])=><th id={key} width="10%">{value}</th>)}</tr></table>
                    </th>
                    <th style={{verticalAlign:'top'}}>Total</th>
                </tr>
            </thead>
            <tbody>{ echo_system_array.content.length > 0 ? echo_system_array.content.map(value=> (
                          <tr>
                              <td width="20%">{value.name}</td>
                            
                               <td width="60%"><table width="100%" cellPadding="5px" className="table-borderless">
                                               <tr>{value.categories.map(value=>(
                                                       <React.Fragment>
                                                              <td>
                                                                 <table  className="table-borderless">
                                                                         <tr><td>{value.m1}</td></tr>
                                                                 </table>
                                                             </td>
                                                         </React.Fragment> ))}
                                                </tr>
                                    </table>
                                </td>
                                <td width="20%">
                                  <table className="w-100 table-borderless">
                                     <tr>
                                          <td>{value.total}</td>
                                     </tr>
                                   </table>
                               </td>
                          </tr>
                          )):<tr><td colSpan="12" style={{padding:'20px',textAlign:'center'}}>No Ecosystems Available</td></tr>}</tbody><tfoot><tr><td></td><td>Total</td><td>{echo_system_array.total}</td></tr></tfoot></table></div>:<div className="d-flex justify-content-center">No Available Data for the Month</div>
    }
    
    
    render() {
       const {data} = this.props;
      
        return (
            <div className="row mt-3" >
                <div className="form-group col-md-6 col-lg-6">   
                        <h5>Connects</h5>         
                        { this.members_table(data.members_by_datewise)}
                </div>
             <div className="form-group col-md-6 col-lg-6">
             <h5>Ecosystems</h5>    
                        <div>
                        {this.echo_systems_date_wise(data.echo_systems_date_wise)}
                        </div>
            </div>
            <div className="form-group col-md-6 col-lg-6">
               <h5>Projects</h5>
               <div>
                   {this.projects_date_wise(data.projects_by_datewise.project_datails,data.projects_by_datewise.sectors,data.projects_by_datewise.categories)}
               </div>
            </div>
            <div className="form-group col-md-6 col-lg-6">
               <h5>Research</h5>
               <div>
                   {this.researches_date_wise(data.researches_by_datewise.research_details,data.researches_by_datewise.sectors,data.researches_by_datewise.categories)}
               </div>
            </div>
            <div className="form-group col-md-6 col-lg-6">
               <h5>Opportunity</h5>
               <div>
                   {Object.entries(data.opportunity_by_datewise).length> 0 ? this.opporturnities_date_wise(data.opportunity_by_datewise.opportunity_details,data.opportunity_by_datewise.sectors):""}
               </div>
            </div>
            <div className="form-group col-md-6 col-lg-6">
                <h5>Products</h5>
                   {products_date_wise(data.products_date_wise.product_datails,data.products_date_wise.categories,data.products_date_wise.sub_category)}

            </div>
            </div>

                

        );
    }
}

export default specific_dashboard_datewise;
