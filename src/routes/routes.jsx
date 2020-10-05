import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Languages from "../pages/Languages/Languages";
import ContactsRoutes from "./modules/contacts/Contacts";
import PublishersRoutes from "./modules/publishers/Publishers";
import StatusRoutes from "./modules/status/Status";

import PrivateRoute from "../utils/privateRoute";
import PublicRoute from "../utils/publicRoute";

const Routes = () => (
  <BrowserRouter>
    <PublicRoute exact path="/" component={Home} />
    <Route exact path="/languages" component={Languages} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <ContactsRoutes />
    <PublishersRoutes />
    <StatusRoutes />
  </BrowserRouter>
);

export default Routes;
