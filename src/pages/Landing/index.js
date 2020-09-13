import React from "react";

import logo from "../../assets/images/logo.png";
import landingImg from "../../assets/images/landing.png";
import Login from "../../components/Login";
import "./styles.css";

class Landing extends React.Component {
  render() {
    return (
      <div id="page-landing">
        <div id="page-landing-content" className="container">
          <div className="logo-container">
            <img src={logo} alt="Agenda" />
            <h2>Cong. Santa Rita</h2>
          </div>

          <img
            src={landingImg}
            alt="Agenda telefonica"
            className="hero-image"
          />
          <div className="buttons-container">
            <Login {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
