import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Logout from "../pages/Logout/Logout";
import Publishers from "../pages/Publishers/Publishers";
import Contacts from "../pages/Contacts/Contacts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Languages from "../pages/Languages/Languages";
import PrivateRoute from "../utils/privateRoute";
import PublicRoute from "../utils/publicRoute";

const Routes = () => (
  <BrowserRouter>
    <PublicRoute path="/" exact component={Login} />
    <PublicRoute path="/login" component={Login} />
    <Route path="/languages" component={Languages} />
    <PrivateRoute path="/logout" component={Logout} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/publishers" component={Publishers} />
    <PrivateRoute path="/contacts" component={Contacts} />
  </BrowserRouter>
);

export default Routes;
