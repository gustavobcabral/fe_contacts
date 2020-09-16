import React from "react";

import logo from "../../assets/images/logo.png";
import agendaTel from "../../assets/images/agendaTel.png";
import NavBarMenu from "../NavBar/NavBar";
import "./styles.css";

const Landing = (props) => {
  const Component = props.component;
  return (
    <>
      <NavBarMenu {...props} />
      <div id="page-landing">
        <div id="page-landing-content" className="container">
          <div className="logo-container">
            <img src={agendaTel} alt="Agenda" />
            <h2>Cong. Santa Rita</h2>
            {props.subtitle && <h3>{props.subtitle}</h3>}
          </div>

          <img src={logo} alt="logo" className="hero-image" />
          <div className="buttons-container">
            {props.component && <Component {...props} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
