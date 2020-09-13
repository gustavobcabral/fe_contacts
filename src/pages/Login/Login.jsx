import React from "react";
import Login from "../../components/Login/Login";
import Landing from "../../components/Landing/Landing";

const LoginPage = (props) => <Landing component={Login} {...props} />;

export default LoginPage;
