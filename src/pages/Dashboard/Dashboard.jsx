import React from "react";
import Logout from "../../components/Logout/Logout";
import Landing from "../../components/Landing/Landing";

const Dashboard = (props) => (
  <Landing subtitle="Dashboard" component={Logout} {...props} />
);

export default Dashboard;
