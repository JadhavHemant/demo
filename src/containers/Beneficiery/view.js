import React, { Component } from 'react';
import DatatablePage from './datatable';
import APIS from  '../../APIS/APIS';

class view extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                    { 
                        columns: [
                                     {
                                            label: 'Name',
                                            field: 'name',
                                            sort: 'asc',
                                            width: 150
                                     },
                                     {
                                             label: 'Position',
                                             field: 'position',
                                             sort: 'asc',
                                            width: 270
                                     },
                                     {
                                             label: 'Office',
                                            field: 'office',
                                            sort: 'asc',
                                            width: 200
                                     },
                                     {
                                            label: 'Age',
                                           field: 'age',
                                           sort: 'asc',
                                           width: 100
                                     },
                                     {
                                        label: 'Start date',
                                        field: 'date',  
                                        sort: 'asc',
                                        width: 150
                                     },
                                     {
                                        label: 'Salary',
                                        field: 'salary',
                                        sort: 'asc',
                                        width: 100
                                     }
                                ],
                        rows:   [
                                           {
                                                name: 'Tiger Nixon',
                                                position: 'System Architect',
                                                office: 'Edinburgh',
                                                age: '61',
                                                date: '2011/04/25',
                                                salary: '$320'
                                            },
                                            {
                                                name: 'Garrett Winters',
                                                position: 'Accountant',
                                                office: 'Tokyo',
                                                age: '63',
                                                date: '2011/07/25',
                                                salary: '$170'
                                            },
                 
                                ]
                    },{ columns: [
                        {
                               label: 'Name',
                               field: 'name',
                               sort: 'asc',
                               width: 150
                        },
                        {
                                label: 'Position',
                                field: 'position',
                                sort: 'asc',
                               width: 270
                        },
                        {
                                label: 'Office',
                               field: 'office',
                               sort: 'asc',
                               width: 200
                        },
                        {
                               label: 'Age',
                              field: 'age',
                              sort: 'asc',
                              width: 100
                        },
                        {
                           label: 'Start date',
                           field: 'date',  
                           sort: 'asc',
                           width: 150
                        },
                        {
                           label: 'Salary',
                           field: 'salary',
                           sort: 'asc',
                           width: 100
                        }
                   ],
           rows:   [
                              {
                                   name: 'Tiger Nixon',
                                   position: 'System Architect',
                                   office: 'Edinburgh',
                                   age: '61',
                                   date: '2011/04/25',
                                   salary: '$320'
                               },
                               {
                                   name: 'Garrett Winters',
                                   position: 'Accountant',
                                   office: 'Tokyo',
                                   age: '63',
                                   date: '2011/07/25',
                                   salary: '$170'
                               },
    
                   ]
       }
                    
               ],
        };
    }
 componentWillMount(){
     let member_id = localStorage.getItem('token');
     let table = "beneficiary_student beneficiary_academician beneficiary_ngo beneficiery_senior_partner";
     fetch(APIS.baseurl+APIS.get_beneficiery+table+"/"+member_id,{
         method:'GET'
     }).then(response=>response.json().
                                       then(
                                                 res=>{//alert(JSON.stringify(res));
                                                   this.setState({data:res});
                                                 }
                                                 ));

 }    
    render() {
        return (
            <div>
                <DatatablePage data={this.state.data} />
            </div>
        );
    }
    }

export default view;
