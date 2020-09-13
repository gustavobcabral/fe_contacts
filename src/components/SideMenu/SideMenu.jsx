import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const SideMenu = (props) => (
  <div className="side-menu">
      <Link to="/">Home</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to="/publishers">Publishers</Link>
  </div>
);

export default SideMenu;
