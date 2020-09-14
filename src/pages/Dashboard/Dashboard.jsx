import React from "react";
import Logout from "../../components/Logout/Logout";
import Landing from "../../components/Landing/Landing";
import { get } from "lodash/fp";
import { getUserData } from "../../utils/loginDataManager";

const buildSubTitleMessage = () =>
  `This is your Dashboard, ${get("name", getUserData())}`;

const Dashboard = (props) => (
  <Landing subtitle={buildSubTitleMessage()} component={Logout} {...props} />
);

export default Dashboard;
