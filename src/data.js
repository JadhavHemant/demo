import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
// import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import {cyan600, pink600, purple600} from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  
    data : [
      {
          "name": "DashBoard",
          "url": "/dashboard",
          "icon":"fa fa-tachometer"
      },
      {
        "name": "Connects",
        "url": "/dashboard/Connects/1",
        "icon":"fa fa-users"
      },
      {
        "name":"About Passion Framework",
        "url":"http://passionframework.org",
        "icon":"fa fa-info-circle"
      },
      {
        "name": "Beneficiery",
        "children": [
          {
            "name": "Add",
            "url": "/dashboard/beneficiary",
            "icon":"fa fa-tachometer"
          },
          {
            "name": "View",
            "url": "/dashboard/view_beneficiery",
            "icon":"fa fa-tachometer"
          }
        ]
      },
      {
        "name": "Manage Project",
        "children": [
          {
            "name": "Create Project",
            "url": "/dashboard/add_project",
            "icon":"fa fa-tachometer"
          },
          {
            "name": "View Project",
            "url": "/dashboard/view_project/view",
            "icon":"fa fa-tachometer"
          },
          {
            "name": "Create Groups",
            "url": "/dashboard/add_project_groups",
            "icon":"fa fa-tachometer"


          },
          {
            "name": "View Groups",
            "url": "/dashboard/view_project_groups",
            "icon":"fa fa-tachometer"

          },
          {
            "name": "Project Management Tool",
            "url": "http://projectmanagement.pcombinator.com/client/login",
            "icon":"fa fa-tachometer"

          }
          

        ]
        },
          {
            "name": "Research",
            "children": [
              {
                "name": "Add",
                "url": "/dashboard/research_project/",
                "icon":"fa fa-tachometer"
              },
              {
                "name": "View",
                "url": "/view_project/research",                
                "icon":"fa fa-tachometer"
              },
              {
                "name": "Share Research",
                "url": "https://osf.io/",
                "icon":"fa fa-tachometer"
              }
            ]
          },
          {
            "name": "Opportunities",
            "children": [
              {
                "name": "Add",
                "url": "/dashboard/post_job/",
                "icon":"fa fa-tachometer"
              },
              {
                "name": "View",
                "url": "/dashboard/view_post_job/",
                "icon":"fa fa-tachometer"
              }
              
            ]
          },
          {
            "name": "Products",
            "children": [
              {
                "name": "Add",
                "url": "/dashboard/add_product/",
                "icon":"fa fa-tachometer"
              },
              {
                "name": "View",
                "url": "/dashboard/view_product/",
                "icon":"fa fa-tachometer"
              }
              
            ]
          },
          {
            "name": "Logout",
            "url": "/dashboard/add_product/",
            "icon":"fa fa-sign-out"
                      
          }
        
    ],
  
  menus: [
    { text: 'DashBoard', icon: <Assessment/>, link: '/dashboard' },
    // { text: 'Our leads ', icon: <Web/>, link: 'dashboard/OurLeads' },
    { text: 'Connects', icon: <GridOn/>, link: '/dashboard/Connects/1' },
    { text: 'About Passion Framework', icon: <GridOn/>, link: 'http://passionframework.org' },
    { text: 'Beneficiery', icon: <GridOn/>, link: '/dashboard/beneficiary' },
    {text: 'Project', icon: <GridOn/>, link: '/dashboard/add_project'},
    { text: 'Research', icon: <GridOn/>, link: '/dashboard/research_project/' },
    { text: 'Job', icon: <GridOn/>, link: '/dashboard/post_job/' },
    { text: 'Product', icon: <GridOn/>, link: '/dashboard/add_product/' },
    { text: 'My Groups', icon:<GridOn /> ,link: '/dashboard/view_project_groups'},
    { text: 'FAQ', icon: <GridOn/>, link: '/dashboard/table' },
    { text: 'Version Details', icon: <GridOn/>, link: '/dashboard/table' }

    // { text: 'Login Page', icon: <PermIdentity/>, link: 'dashboard/login' }
  ],
  tablePage: {
    items: [
      {id: 1, name: 'Product 1', price: '$50.00', category: 'Category 1'},
      {id: 2, name: 'Product 2', price: '$150.00', category: 'Category 2'},
      {id: 3, name: 'Product 3', price: '$250.00', category: 'Category 3'},
      {id: 4, name: 'Product 4', price: '$70.00', category: 'Category 4'},
      {id: 5, name: 'Product 5', price: '$450.00', category: 'Category 5'},
      {id: 6, name: 'Product 6', price: '$950.00', category: 'Category 6'},
      {id: 7, name: 'Product 7', price: '$550.00', category: 'Category 7'},
      {id: 8, name: 'Product 8', price: '$750.00', category: 'Category 8'}
    ]
  },
  dashBoardPage: {
    recentProducts: [
      {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
      {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
      {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
      {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
    ],
    monthlySales: [
      {name: 'Jan', uv: 3700},
      {name: 'Feb', uv: 3000},
      {name: 'Mar', uv: 2000},
      {name: 'Apr', uv: 2780},
      {name: 'May', uv: 2000},
      {name: 'Jun', uv: 1800},
      {name: 'Jul', uv: 2600},
      {name: 'Aug', uv: 2900},
      {name: 'Sep', uv: 3500},
      {name: 'Oct', uv: 3000},
      {name: 'Nov', uv: 2400},
      {name: 'Dec', uv: 2780}
    ],
    newOrders: [
      {pv: 2400},
      {pv: 1398},
      {pv: 9800},
      {pv: 3908},
      {pv: 4800},
      {pv: 3490},
      {pv: 4300}
    ],
    browserUsage: [
      {name: 'Chrome', value: 800, color: cyan600, icon: <ExpandMore/>},
      {name: 'Firefox', value: 300, color: pink600, icon: <ChevronRight/>},
      {name: 'Safari', value: 300, color: purple600, icon: <ExpandLess/>}
    ]
  }
};

export default data;
