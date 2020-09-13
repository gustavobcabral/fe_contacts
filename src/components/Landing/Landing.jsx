import React from "react";

import logo from "../../assets/images/logo.png";
import landingImg from "../../assets/images/landing.png";
import "./styles.css";

const Landing = (props) => {
  const Component = props.component;
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Agenda" />
          <h2>Cong. Santa Rita</h2>
          {props.subtitle && <h3>{props.subtitle}</h3>}
        </div>

        <img src={landingImg} alt="Agenda telefonica" className="hero-image" />
        <div className="buttons-container">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
