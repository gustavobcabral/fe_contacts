import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Publishers from "./pages/Publishers";
import Contacts from "./pages/Contacts";

function Routes() {

  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/login" component={Landing} />
      <Route path="/publishers" component={Publishers} />
      <Route path="/contacts" component={Contacts} />
    </BrowserRouter>
  );
}

export default Routes;
