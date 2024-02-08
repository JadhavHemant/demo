import React, { Component } from 'react';
import APIS from '../../APIS/APIS';
import '../dashboard/dashboard.scss';
//import BarChart from 'react-bar-chart';
//import * as d3 from "d3";
import _ from 'lodash';
//import { fuchsia } from 'color-name';
function map_array(obj,type){
    let group_name;     
    if(type == 2){
            group_name="year";
         }
         else{
             group_name = "month_name";
         }
    let obj1=  _.chain(obj.categories)
                    .groupBy(group_name)
                    .mapValues(function(v){
        return     _.chain(v);
        }).value();
//alert(JSON.stringify(obj1));
    return obj1;

}

let child =[];

function CalTotal(total,value){
 return total+parseInt(value.tcount);
}
function CalTotal1(total,value){
    return total+parseInt(value.total);
   }
   

function inner_array_total(total,value){
    return total+parseInt(value.tcount);
}

function inner_array_total1(total,value){
    return total+parseInt(value.total);
}



  
let objects=[];
let count=0;  
let row_index=0;
let rows_value=[];
let bar_array_obj=[];
//const margin = {top: 20, right: 20, bottom: 30, left: 40};

class DashboardReport extends Component {
    constructor(props){
        super(props);
        this.handleSelect= this.handleSelect.bind(this);
        this.state={data:[],width:250};
    }
    componentDidMount() {
     // this.barChart(this.state.data);
     //   alert(this.props.type);
     }
     componentDidUpdate(){
    // alert(JSON.stringify(this.props.data));
     }

  
      handleSelect(e){
        let url;
        //alert(e.target.id);
         if(this.props.type == 1){
             url = APIS.baseurl+APIS.get_dashboard_content+"/2?year="+e.target.value+"&month=06&search_type=2&cat_id="+e.target.id;
             this.props.fetch_specific_dashboard(url);       
        }
    }



    row_tds(items=[],type,years){
        const rows=[];
        let k=0,t=0,cellvalue,j=0,si=0;
        rows_value[row_index] = new Array();
        if(items.length >0){ 
        if(type == 3){
           j = years[0];
           t= years[years.length-1]; 
          // alert(j);
        } 
       else if(type == 2){
              j= 12;
              t=1;
          }
          else{
              j = 31;
              t=1;
          }
          
          for(let i=t;i<=j;i++){
    
            if(items.includes(i)){
               if(type == 3){
                  cellvalue = objects[k].total; 
                }
               else if(type ==  2){
                 cellvalue = objects[k].total;
               }
             else{
                 cellvalue = objects[k].tcount;
              }
            
                rows.push(<td id={row_index}><div style={{width:'100%'}}>{cellvalue}</div></td>);
                rows_value[row_index][si++]=cellvalue;
                  k=k+1;
              }
              else{
                  rows.push(<td  id={row_index}><div style={{width:'100%'}}>0</div></td>);
                  rows_value[row_index][si++]=0;
              }
          }
        
         }
          return rows;
        }
    find_td(obj,length,type,years){
       let day,k,t;
       
       if(type == 3){
          t = years[years.length-1];
          k = years[0];
          day=obj.year;
      
        }
       else if(type == 2){
             k=12;
             t=1;
             day = obj._month;
            }
        else{
            t=1;
            k = 31;
            day = obj.day;
        }
       
       for(let i=t;i<=k;i++){
           //alert(i);
           if(i == day){
             child.push(i);
             objects.push(obj);
           }
                
           }
           count = count+1;
           //alert(JSON.stringify(child));
         const row= this.row_tds(child,type,years);
         if(count == length) { 
            count=0;
            objects=[];
            child=[];
            row_index = row_index+1;    
            return row;
         }
         else {
         return "";
         }
            // ReactDOM.render(row,document.getElementById('tbdate'));
     }
     calculate_date_wise_total(type){
         let total=0,months=0;
         let tds=[];
         let rows_length = rows_value.length;
         
         if(type == 2){
             months = 12;
            }
         else{
             months = 31;
          }
          if(rows_value.length > 1){
         
            for(let k=0;k<months;k++)
            {
              try{
                for(var t=0;t<rows_length;t++){

                if(rows_value[t][k] != undefined){
                       total = total+parseInt(rows_value[t][k]);
                    }
                                  
                }
                tds.push(<td><div style={{width:'100%'}}>{total}</div>  </td>);

              total =0;
              }
              catch(error){
                console.log(error);
              }
          
           //}
         
        }
    }
    else{
 
        for(let k=0;k<=months;k++)
         {
             total = rows_value[0][k];
             if(total != undefined)
                tds.push(<td width="1%">{total}</td>);
                
         }
    }
    row_index = 0; 
    rows_value =new Array();
    return tds;
 }
     find_total(obj,type){
         if(type == 3){
            return obj.reduce(CalTotal1,0);     
         }
         if(type == 2)
         return obj.reduce(CalTotal1,0);
         else
        return obj.reduce(CalTotal,0);
     }
     
     find_all_total(members_array,type){
         //alert(type);
         let total;
         let obj={};
         
         
         if(type == 2 || type == 3){
            total= members_array.categories.reduce(inner_array_total1,0);
         }
         else
          total= members_array.categories.reduce(inner_array_total,0);
          
          obj['text'] = members_array['name'];
          obj['value'] = total;
       //   this.state.data.push(obj);
         bar_array_obj.push(total); 
          this.state.data.push(total);
         
          return total;
        }
    conntects_report(members_array,obj,type){
         const dates = ["01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
         const months =["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
       
     
    
    return(<div>{members_array!=undefined ? members_array.members_list.map(value=> 
                                               
                         <div className="mt-3 width-100">
                              <h6>{value.name}</h6>
                                    <div className="table-responsive table-responsive-lg mt-3">
                                            
                                                <table className="table-bordered" width="100%">
                                                    <thead>
                                                    
                                                         <th >{type == 1 ?<React.Fragment> Month
                                                                   <select className="form-control col-xl-12" id={value.cat_id} 
                                                                          onChange={(e)=>this.handleSelect(e)}>
                                                                              {obj.map(year=><option value={year}>{year}</option>)}
                                                                   </select></React.Fragment>:'Year'}
                                                         </th>
                                                         {type == 1 ? dates.map(value=>  <th>                                                                  
                                                                            {value}
                                                                            </th>):type == 2?months.map(value=><th>{value}</th>):obj.map(value=><th>{value}</th>)}
                                                                                                           
                                                         <th>Total</th>
                                                     </thead>
                                    
                                                     <tbody>
                                                             { Object.entries(map_array(value,type)).map(([key,value])=>  (
                                                                    <tr>
                                                                        <td width="10%">{key != 'undefined' ? key:"Members"}</td>
                                                                        
                                                                            {Object.entries(value).map(([key,obj])=> key == "__wrapped__" ? obj.map(Ivalue=>this.find_td(Ivalue,obj.length,type,this.props.years)):"")}
                                                             
                                                                        <td width="10%">{Object.entries(value).map(([key,obj])=> key == "__wrapped__" ? this.find_total(obj,type):"" )}</td> 
                                                                    </tr>))}

                                                     </tbody>
                                    
                                                     <tfoot>
                                                         <tr>
                                                              <td>Total</td>
                                                              {this.calculate_date_wise_total(type)}
                                                              <td> {this.find_all_total(value,type)}</td>
                                                         </tr>
                                                     </tfoot>
                                                 </table>
                                          </div>
                                    </div>
                                    
                                   ):""}
    </div>);
    
    
    }


    render() {
    
        const {data,years,type}=this.props;
        //alert(JSON.stringify(data));
    
    //  alert(JSON.stringify(this.state.data));
        return (
            <div>
                
                 {type == 2 ? this.conntects_report(data.members_by_yearwise,years,type):type == 1?this.conntects_report(data.members_by_datewise,years,type):this.conntects_report(data.yearwise_members_list,years,type)}   
                  <h6>Connects</h6>

                  {/* {Object.entries(this.state.data).length > 0 ? :""}; */}
            </div>
        );
    }
}

//ReactDOM.render(<TypesOfFood />, document.body)
export default DashboardReport;
