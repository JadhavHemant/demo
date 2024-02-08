import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
// import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
import Register from './containers/Register';
import aboutus from './containers/aboutus';
import Categories from './containers/Categories';
import addBenificary from './containers/addBenificary';
import view_beneficiery from './containers/Beneficiery/view';
import student_beneficiery from './containers/Beneficiery/Edit/student';
import acadyamic_beneficiery from './containers/Beneficiery/Edit/academician';
import ngo_beneficiery from './containers/Beneficiery/Edit/ngos';
import aboutus_details from './components/popups/model';
import add_project from './containers/project/add_project';
import view_porj from './containers/project/view_projects';
import research_project from './containers/Research/add_details';
import post_jobs from './containers/Job/add_job';
import view_jobs from './containers/Job/view_jobs';
import add_products from './containers/Products/addproduct';
import ecosystem_register from './containers/echosystem_register';
import view_products from './containers/Products/viewproduct';
import user_profile from './containers/profile/userProile';
import research_project_view from './containers/Research/view_details';
import forgotpassword from './containers/forgotPassword/forgot_password';
import change_password from './containers/forgotPassword/change_password';
import verify_user from './containers/forgotPassword/verify_user';
import view_activity from './containers/Groups/activity/view_activity';
//import view_project_groups from './containers/Groups/groups';
import upload_csv from "./containers/Master/upload_csv";
import add_project_groups from './containers/Groups/add_grops';
import view_project_groups from './containers/Groups/view_groups';
import senior_partner from './containers/Beneficiery/Edit/seniorPartner';

export default (

      <Route>
            <Route path="/" component={LoginPage} />
            <Route path="/register" component={Register} />
            <Route path="/verify_user" component={verify_user} />
            <Route path="/forgot_password" component={forgotpassword} />
            <Route path="/ecosystem_register" component={ecosystem_register} />
            <Route path="/change_password/:id" component={change_password} />
            <Route path="/dashboard" component={App} history={browserHistory}>
                  <IndexRoute component={Dashboard} />
                  <Route path="dashboard" component={Dashboard} />
                  <Route path="OurLeads/:ecoId/:id/:name" component={TablePage} />
                  <Route path="Connects/:id" component={Categories} />
                  <Route path="/dashboard/view_project/:id" component={Categories} />
                  <Route path="/APF" component={aboutus} />
                  <Route path="/FAQ" component={NotFoundPage} />
                  <Route path="/dashboard/beneficiary" component={addBenificary} />
                  <Route path="/dashboard/Version Details" component={NotFoundPage} />
                  <Route path="/dashboard/senior_partner_beneficiery/:id/:value" component={senior_partner} />
                  <Route path="/dashboard/student_beneficiery/:id/:value" component={student_beneficiery} />
                  <Route path="/dashboard/acadyanamic_beneficiery/:id/:value" component={acadyamic_beneficiery} />
                  <Route path="/dashboard/ngo_beneficiery/:id/:value" component={ngo_beneficiery} />
                  <Route path="/dashboard/view_beneficiery" component={view_beneficiery} />
                  <Route path="/dashboard/aboutus" component={aboutus_details} />
                  <Route path="/dashboard/OurLeads/:id/:name/:user_id" component={TablePage} />
                  <Route path="/dashboard/add_project" component={add_project} />
                  <Route path="/dashboard/view_projects/:id/:name" component={view_porj} />
                  <Route path="/dashboard/add_project/:id/:obj" component={add_project} />
                  <Route path="/dashboard/research_project/" component={research_project} />
                  <Route path="/dashboard/post_job/" component={post_jobs} />
                  <Route path="/dashboard/view_post_job/" component={view_jobs} />
                  <Route path="/dashboard/add_product/" component={add_products} />
                  <Route path="/dashboard/view_product/" component={view_products} />
                  <Route path="/dashboard/research_view_projects/:id/:name" component={research_project_view} />
                  <Route path="/dashboard/research_project/:id/:obj" component={research_project} />
                  <Route path="/dashboard/view_project_groups" component={view_project_groups} />
                  <Route path="/dashboard/add_project_groups" component={add_project_groups} />
                  <Route path="/dashboard/view_project_groups" component={view_project_groups} />
                  <Route path="/dashboard/view_activity/:obj" component={view_activity} />
                  <Route path="/dashboard/change_password" component={change_password} />
                  <Route path="/dashaboard/profile" component={user_profile} />
                  <Route path="/dashboard/upload_csv/:type/:stype" component={upload_csv} />
            </Route>
      </Route>

);