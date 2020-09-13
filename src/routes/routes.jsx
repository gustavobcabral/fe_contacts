import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Publishers from "../pages/Publishers/Publishers";
import Contacts from "../pages/Contacts/Contacts";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../utils/privateRoute";
import PublicRoute from "../utils/publicRoute";

const Routes = () => (
  <BrowserRouter>
    <PublicRoute path="/" exact component={Login} />
    <PublicRoute path="/login" component={Login} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/publishers" component={Publishers} />
    <PrivateRoute path="/contacts" component={Contacts} />
  </BrowserRouter>
);

export default Routes;
