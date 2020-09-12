import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Publishers from "./pages/Publishers";
import Contacts from "./pages/Contacts";
import Login from "./services/login";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/publishers" component={Publishers} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}

export default Routes;
