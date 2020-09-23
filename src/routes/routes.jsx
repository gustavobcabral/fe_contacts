import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Publishers from "../pages/Publishers/Publishers";
import Contacts from "../pages/Contacts/Contacts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Languages from "../pages/Languages/Languages";
import Details from "../pages/Details/Details";

import PrivateRoute from "../utils/privateRoute";
import PublicRoute from "../utils/publicRoute";

const Routes = () => (
  <BrowserRouter>
    <PublicRoute path="/" exact component={Home} />
    <Route path="/languages" component={Languages} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/publishers" component={Publishers} />
    <PrivateRoute path="/contacts" component={Contacts} />
    <PrivateRoute path="/details" component={Details} />
    {/* {`contacts/${data.phone}/details/${id_detail}` */}
  </BrowserRouter>
);

export default Routes;
