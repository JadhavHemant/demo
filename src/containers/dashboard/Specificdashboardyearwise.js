import React, { Component } from 'react';
import _ from 'lodash';

function mergeNames (arr) {
 //   let object=['month','total'];
//alert(JSON.stringify(arr));
    return _.chain(arr).groupBy('name').mapValues(function (v) {
        // alert(JSON.stringify(v[0]));
        return _.chain(v[0].monthwise_data).groupBy('name').mapValues(function(v){
            alert(JSON.stringify(v));
            return _.chain(v).groupBy('month').mapValues(function(v){
                        return v.map('total');
            });
        });
    }).value();
}
class Specificdashboardyearwise extends Component {

constructor(props){
    super(props);


}
componentWillMount(){
    // alert(JSON.stringify(this.props.data.ecosystem_by_yearwise));
    // if(this.props.data.ecosystem_by_yearwise != null)
    // console.log(mergeNames(this.props.data.ecosystem_by_yearwise.members_list[1].monthwise_data));
}
componentDidUpdate(){
    let response;
   // alert(JSON.stringify(this.props.data.ecosystem_by_yearwise));
    if(this.props.data.ecosystem_by_yearwise != null)
   {
     response= mergeNames(this.props.data.ecosystem_by_yearwise.members_list);
     console.log(response);
   }
//alert(JSON.stringify(response));
    

}
handleSelectChange(e){
    alert(e.target.value);
}
connects_yearwise(members_array_data){
    //alert(JSON.stringify(members_array_data));
 let total=0;
    members_array_data.members_list.map(value=> {value.monthwise_data.map(value1=>total=total+parseInt(value1.total)); });
   // alert(total);
   // return <div>Hello</div>;
        return Object.entries(members_array_data).length > 0 ? 
                      
                   <div>{ <table className="table-bordered">
                       <thead style={{height:'60px'}}>
                          <th>
                                  <div className="form-group">
                                         Categories
                                        <table className="table-borderless">
                                                 {Object.entries(members_array_data.list_categories).length > 0 ?   <tr>
                                                        <td>
                                                         <select className="form-control" onChange={this.handleSelectChange.bind(this)}>
                                                                    {Object.entries(members_array_data.list_categories).map(([key,value])=><option value={key}>{value}</option>)}
                                                         </select>
                                                         </td>
                                                    </tr>:""}

  s                                                 
                                        </table>
                                  </div>
                          </th>
                          
                          <th>
                                  <div className="form-group">
                                        Months    
                                        <table className="table-borderless w-100">
                                            <thead style={{height:'80px'}}>
                                            {members_array_data.months.length >0 ? <tr>
                                                         <td colSpan='12'>
                                                         <select className="form-control" onChange={this.handleSelectChange.bind(this)}>
                                                                    {members_array_data.months.map(value=><option>{value}</option>)}
                                                         </select>
                                                         </td>
                                                    </tr>:""}

                                                    <tr>{
                                                           members_array_data.months.map(value=>
                                                              <td>{value}</td>)
                                                         }
                                                    </tr>
                                                    </thead>
                                        </table>
                                 </div>
                          </th>
                         
                          <th>Total</th>
                         
                    </thead>
                    <tbody>
                           {members_array_data.members_list.map(value=><tr>

                                     <td style={{textAlign:'start'}}>{value.name}</td>
                                     <td>
                                         <div className="form-group">
                                         <table className="w-100 table-borderless">
                                                <tr>
                                                     {
                                                         value.monthwise_data.map( obj=>
                                                           <td width={(100/members_array_data.months.length)+"%"} style={{textAlign:'center'}}>{obj.total}</td>
                                                            )

                                                            
                                                     }
                                                     {members_array_data.months.slice(0,(members_array_data.months.length - value.monthwise_data.length)).map(value=><td width={(100/members_array_data.months.length)+"%"}>{<input type="hidden" value={value} />}</td>)}
                                                 </tr>
                                         </table>
                                         </div>
                                     </td>
                                     <td style={{textAlign:'start'}}>{value.total}</td>

                           </tr>)}


                    </tbody>
                    <tfoot><tr><td></td><td>Total</td><td style={{textAlign:'start'}}>{total}</td></tr></tfoot>

                   </table>


                        }
                 </div>:<div>No available connects</div>
}

    render() {
//alert(JSON.stringify(this.props.data));

        return (
            <div className="mt-3">
                <div className="col-md-6 col-lg-6">
                    <h5>Connects</h5>
                {this.connects_yearwise(this.props.data.members_by_yearwise)}
                </div> 
                {/* <div>{JSON.stringify(mergeNames(this.props.data.ecosystem_by_yearwise.members_list[1].monthwise_data))}</div> */}
            </div>
        );
    }
}

export default Specificdashboardyearwise;
