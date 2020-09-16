import React from "react";
import Landing from "../../components/Landing/Landing";
import { get } from "lodash/fp";
import { getUserData } from "../../utils/loginDataManager";

const buildSubTitleMessage = () =>
  `This is your Dashboard, ${get("name", getUserData())}`;

const Dashboard = (props) => (
  <Landing subtitle={buildSubTitleMessage()} {...props} />
);

export default Dashboard;
