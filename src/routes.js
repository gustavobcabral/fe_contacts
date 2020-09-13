import React from "react";
import { BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Publishers from "./pages/Publishers";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './utils/privateRoute';
import PublicRoute from './utils/publicRoute';
function Routes() {

  return (
    <BrowserRouter>
      <PublicRoute path="/" exact component={Landing} />
      <PublicRoute path="/login" component={Landing} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/publishers" component={Publishers} />
      <PrivateRoute path="/contacts" component={Contacts} />
    </BrowserRouter>
  );
}

export default Routes;
