import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/login" component={LoginPage} />
    </BrowserRouter>
  );
}

export default Routes;
