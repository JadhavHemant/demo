import React,{Component} from 'react';
import {pink600} from 'material-ui/styles/colors';
import InfoBox from '../components/dashboard/InfoBox';
import APIS from '../APIS/APIS';
import * as d3 from "d3";


import DashboardReport from '../containers/dashboard/DashboardReport';
import { colors } from 'material-ui/styles';


let years,year,diff,today,date,month,t_year;
let url,url1;
let rd_selected_any=1;
let letendDate;
let bar_array_obj=[];
function inner_array_total(total,value){
  return total+parseInt(value.tcount);
}

function inner_array_total1(total,value){
  return total+parseInt(value.total);
}
class DashboardPage  extends Component {

  constructor(props){
    super(props);
    letendDate=new Date();
     letendDate.setDate(new Date().getDate()+30);
    this.state = {dashboardContent:[],specificdashboard:{},graph_content:{},rd_selected:1,echo_system:{},categories:{},currentDate:new Date().toISOString().substr(0,10),endDate:letendDate.toISOString().substr(0,10)};
     year = (new Date()).getFullYear();
     this.fetch_specific_dashboard_with_url = this.fetch_specific_dashboard_with_url.bind(this);
     // this.years = Array.from(new Array(20),(val, index) => year-index);
  

  }
  
 
  componentWillMount(){
    let url = APIS.baseurl+APIS.get_dashboard_content+"/0";
    fetch(url,{method:'GET'}).then(
      response=>response.json().then(
        res=>{
          console.log("dashboard_content",res);
            this.setState({dashboardContent:res.analysis_data});
             diff =    year - parseInt(res.year);
             years = Array.from(new Array(diff+1),(val, index) => year-index);
      
      })
    );
    url = APIS.baseurl+APIS.get_dashboard_content+"/1";
    fetch(url,{method:'GET'}).then(
      response=>response.json().then(
        res=>{
          console.log("dashboard_content",res);
         //   alert(JSON.stringify(res));
            this.setState({graph_content:res});
      })
    );
     today = new Date();
     date =  "NaN";
     month = today.getMonth();
     t_year  = today.getFullYear(); 
    this.fetch_specific_dashboard(date,month+1,t_year);
     date= today.getDay();
  }
    componentDidMount(){
 //alert(JSON.stringify(this.state.specificdashboard));
       //alert(JSON.stringify(this.state.specificdashboard));
       }
        //componentDidUpdate(){
      //   this.find_all_total(this.state.specificdashboard);
      //   this.barChart(bar_array_obj);
      // }
      componentDidUpdate(){

        this.find_all_total(this.state.specificdashboard,rd_selected_any);
    
      }

       fetch_specific_dashboard_with_url(api_url){

    fetch(api_url,{method:'GET'}).then({
    }).then(res=>{
                   res.json().then(response=>
                                            {
                                           // alert(rd_selected_any);
                                             // alert(JSON.stringify(response));
                               //              this.find_all_total(this.state.specificdashboard,rd_selected_any);

                                             this.setState({rd_selected:rd_selected_any});
                                               this.setState({specificdashboard:response});
                                             
                                          
                                               if(Object.entries(this.state.categories).length == 0 && Object.entries(this.state.echo_system).length == 0 ) 
                                               {
                                               this.setState({categories:response.echo_systems_date_wise.categories});
                                               this.setState({echo_system:response.echo_systems_date_wise.echo_systems});
                                               
                                              }
                                                                                           }
                                   );
                  });

    url = api_url;

                }
                
               
              
 

                fetch_specific_dashboard(date,month,t_year){
    
    url1 = APIS.baseurl+APIS.get_dashboard_content+"/2?search_type=2&year="+t_year;
   // alert(url1);
     url = url1;   
    fetch(url1,{method:'GET'}).then(res=>{
                     res.json().then(response=>
                                              {
                                              
                                                this.setState({rd_selected:rd_selected_any});
                                                this.setState({specificdashboard:response});
                                                this.setState({echo_system:response.echo_systems_date_wise.echo_systems});
                                                this.setState({categories:response.echo_systems_date_wise.categories});
                                                this.setState({echo_system:response.echo_systems_date_wise.echo_systems});
      //                                          this.find_all_total(this.state.specificdashboard);
                                            //    this.barChart(bar_array_obj);
                                               }
                                     );
                    });
  }
  handleDateChange(e){
  //alert(JSON.stringify(type));
  //alert(type);
  let url;  
  // let split_date = e.target.value.split('-');
   // alert(JSON.stringify(split_date));
    // let year = parseInt(split_date[0]);
    // let month = parseInt(split_date[1]);
    // let date = parseInt(split_date[2]);
    //alert(year+"/"+month+"/"+date);
    if(this.state.rd_selected == 2){
       // this.fetch_specific_dashboard(date,month,year);
       let year = e.target.value;
       url = APIS.baseurl+APIS.get_dashboard_content+"/2?year="+year+"&month=06"+"&search_type=2";
     //  alert(url);
       this.fetch_specific_dashboard_with_url(url);
     }
    else if(this.state.rd_selected == 1){
        let fdate, tdate;
            fdate = document.getElementById('in_date').value;
            tdate = document.getElementById('to_date').value;
          if(fdate != "" && tdate != "")  
          {
            url = APIS.baseurl+APIS.get_dashboard_content+"/2?fdate="+fdate+"&tdate="+tdate+"&search_type=1";
            this.fetch_specific_dashboard_with_url(url);
          
          }
      }
      else if(this.state.rd_selected == 3)
      {
        let year = e.target.value;
        url = APIS.baseurl+APIS.get_dashboard_content+"/2?year="+year+"&search_type=3";
       // alert(url);
        this.fetch_specific_dashboard_with_url(url);

      }
  }
   zeroPad(numberStr) {
   //  alert(numberStr);
    return numberStr.padStart(2, "0");
  }
  random_color(){
    const randomColor = Math.floor(Math.random()*16777215);
    const randomString=  randomColor.toString(16);
   // alert(randomColor.toString(16));
       if(randomColor < 0xffff00){
    return "#"+randomString;
       }
       else{
        randomColor();
       }
  }
  handleRadioClick(e){
    
    rd_selected_any = e.target.value;
    //alert(rd_selected_any);
    if(e.target.value == 3){
     url = APIS.baseurl+APIS.get_dashboard_content+"/2?search_type=1";
    // alert(url);
     this.fetch_specific_dashboard_with_url(url);
   
    }
   else if(e.target.value == 1){
     let t_year  = today.getFullYear(); 
     url = APIS.baseurl+APIS.get_dashboard_content+"/2?year="+t_year+"&search_type=2";
    // alert(url);
     this.fetch_specific_dashboard_with_url(url);            
                
          
   }
   else if(e.target.value == 2){
     //alert(e.target.value);
    let today = new Date();
    // let date =  "NaN";
    // let month = today.getMonth();
    let t_year  = today.getFullYear(); 
    url = APIS.baseurl+APIS.get_dashboard_content+"/2?year="+t_year+"&search_type=3";
   //alert(date+","+this.zeroPad((month+1).toString())+","+t_year);
    this.fetch_specific_dashboard_with_url(url);
   }
   
  //this.setState({rd_selected:e.target.value});
  
}
find_all_total(members_array,type){
let total;
bar_array_obj = []; 
 Object.entries(members_array).map(([key,value])=>
  {
   if(type == 2 || type == 3){
     try{
     value.members_list.map(val1=>{
     if(val1.categories.length > 0){
       total = val1.categories.reduce(inner_array_total1,0);
       bar_array_obj.push(total);
     }
   });
  }catch(error){
       console.log("find_all_total",error);
  }
    
 }
   else{
     try{
              value.members_list.map(val1=>{ if(val1.categories.length > 0){ total = val1.categories.reduce(inner_array_total,0);bar_array_obj.push(total);
        }
      });
     }catch(error){
       console.log(error);
     }
  }
}
  );
   

 this.barChart(bar_array_obj);
   //return total;
 }
barChart(data){
  //data = bar_array_obj;
const w = 300;
const h = 300;
    <div ref="chart" id="_chart">{}</div>
document.getElementById('_chart').innerHTML="";
const svg = d3
 .select(this.refs.chart)
 .append("svg")
 .attr("width", w)
 .attr("height", h)
 .attr("class", "bar");
let g= svg.append("g");
g
 .selectAll("rect")
 .data(data)
 .enter()
 .append("rect")
 .attr("fill", "#FF9A00")
 .attr("class", "sBar")
 .attr("x", (d, i) => i * 60)
 .attr("y", (d,i) => {
    return (h - 40)-d;
  })
 .attr("width", 50)
 .attr("height", (d, i) => 7 * d)
 .append("title")
 .text(d => d);
g
 .selectAll("text")
 .data(data)
 .enter()
 .append("text")
 .style("font-size", 18)
 .attr("fill", colors.blue500)
 .attr("x", (d, i) => i * 60)
 .attr("y", (d, i) => h - 35 * d - 3)
 .text(d => d);

let g1= svg.append("g");
 g1.selectAll("text")
 .data(data)
 .enter()
 .append("text")
 .style("font-size", 18)
 .attr("fill", colors.blue500)
 .attr("x", (d, i) => i*60)
 .attr("y", (d, i) => 300)
 .text(d => d);
//  svg
//  .selectAll("text")
//  .data(data)
//  .enter()
//  .append("text")
//  .style("font-size", 18)
//  .attr("fill", colors.blue500)
//  .attr("x", (d, i) => i )
//  .attr("y", (d, i) => h - 7 * d - 3)
//  .text(d => d);
    
 }

render(){
  //alert(url);
    //Object.keys(this.state.graph_content).length >  alert(JSON.stringify(this.state.graph_content.Interns[0]));

//   const line_chart= Object.entries(this.state.graph_content).map(([key,value])=> (value.length > 0 ? <div style={{width:'auto'}}>
//   {key} 
//  {<LINECHART data={value}  />  }
//   </div>:""));
  //alert(this.state.dashboardContent.length);
  const child = this.state.dashboardContent.map(value=>( <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
 
   <InfoBox url={APIS.upload_path + value.image}
   color={pink600}
   icon_style={{height:'80px',width:'80px',padding:10}}
   background_color={"#00fffff"}
   title={<div className="form-group d-flex w-100 justify-content-center" style={{color:'white'}}><div className="flex-column w-100"><h5 className="text-center">{value.name}</h5><h6 className="text-center">{value.total_count}</h6></div></div>}
value="150"/>
 
 </div>
  ));
  //alert(Object.keys(this.state.specificdashboard).length);
    return (
    <div>
      {/* <h3 style={globalStyles.navigation}>Application / Dashboard</h3> */}
         <h5>Summary Dashboard</h5>
   <div className="row">

     { this.state.dashboardContent.length > 0 ? child:""}
  

    {/* <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
      <InfoBox Icon={ThumbUp}
               color={cyan600}
               title="Likes"
               value="4231"
      />
    </div> */}
    </div>
    <div>
      <h5>Specific Dashboard</h5>
      <div className="d-flex justify-content-center">
                          <div className="custom-control custom-radio">
                                    <input type="radio" className="custom-control-input"  value="Daywise" id="rd_datewise" value="1" onClick={this.handleRadioClick.bind(this)}  name="rdFilters" /> 
                                                                 <label for="rd_datewise" className="custom-control-label" >Daywise</label></div>
                                                                 <div className="custom-control custom-radio ml-1"> <input className="custom-control-input" type="radio" value="2" name="rdFilters" id="rd_monthwise" onClick={this.handleRadioClick.bind(this)} /> <label className="custom-control-label" for="rd_monthwise">  Monthwise </label></div>
                                                                 <div className="custom-control custom-radio ml-1" onClick={this.handleRadioClick.bind(this)}>  <input className="custom-control-input" type="radio" value="3" name="rdFilters" id="rd_yearwise" onClick={this.handleRadioClick.bind(this)} /> <label className="custom-control-label" for="rd_yearwise"> YearWise </label>   </div></div>
 <div className="d-flex justify-content-center">
   {/* <div className="row align-items-center col-md-5 col-lg-5 col-xl-12"> {
     
      this.state.rd_selected == 2 ?<select className="form-control col-12" onChange={(e)=>this.handleDateChange(e)}>{years.map(value=><option value={value}>{value}</option>)}</select>:"" } </div>*/}
  
    </div> 
    {Object.keys(this.state.specificdashboard).length > 0  ?
         <DashboardReport data={this.state.specificdashboard} 
                          url={url} 
                          fetch_specific_dashboard={this.fetch_specific_dashboard_with_url} 
                          years={years} 
                          echo_systems={this.state.echo_system} 
                          categories={this.state.categories} 
                          type={rd_selected_any} 
          />:
           Object.keys(this.state.specificdashboard).length == 0 ? 
                  <div className="d-flex justify-content-center mt-5">Data Not Available</div>:
                   <DashboardReport  data={this.state.specificdashboard} url={url} fetch_specific_dashboard={this.fetch_specific_dashboard_with_url}  years={years} type={rd_selected_any} />  
                   }
    </div>
    {/* {Object.entries(this.state.specificdashboard).length > 0 ? this.find_all_total(this.state.specificdashboard,rd_selected_any):""} */}
    <div ref="chart" id="_chart">{}</div>
    </div>
    
  );
}
}

export default DashboardPage;
