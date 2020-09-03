import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import landingImg from "../../assets/images/landing.png";
import loginIcon from "../../assets/images/loginIcon.png";

import "./styles.css";

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Agenda" />
          <h2>Cong. Santa Rita</h2>
        </div>

        <img src={landingImg} alt="Agenda telefonica" className="hero-image" />

        <div className="buttons-container">
          <Link to="" className="login">
            <img src={loginIcon} alt="login" />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
