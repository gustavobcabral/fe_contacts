import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Publishers from "../pages/Publishers/Publishers";
import ContactsList from "../pages/Contacts/ContactsList";
import Dashboard from "../pages/Dashboard/Dashboard";
import Languages from "../pages/Languages/Languages";
import ListDetailsContact from "../pages/DetailsContact/ListDetailsContact";
import EditDetailsContact from "../pages/DetailsContact/EditDetailsContact";
import NewDetailsContact from "../pages/DetailsContact/NewDetailsContact";

import PrivateRoute from "../utils/privateRoute";
import PublicRoute from "../utils/publicRoute";

const Routes = () => (
  <BrowserRouter>
    <PublicRoute exact path="/" component={Home} />
    <Route exact path="/languages" component={Languages} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/publishers" component={Publishers} />
    <PrivateRoute exact path="/contacts/" component={ContactsList} />
    <PrivateRoute
      exact
      path="/contacts/:phone/details"
      component={ListDetailsContact}
    />
    <PrivateRoute
      exact
      path="/contacts/:phone/details/new"
      component={NewDetailsContact}
    />
    <PrivateRoute
      exact
      path="/contacts/:phone/details/edit/:id"
      component={EditDetailsContact}
    />
  </BrowserRouter>
);

export default Routes;
