import React from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { get } from "lodash/fp";
import { getUserData, hasToken } from "../../utils/loginDataManager";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MenuLogged = ({ t }) => (
  <>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/contacts">
      {t("contacts")}
      </Nav.Link>
      <NavDropdown title="Administration" id="collasible-nav-dropdown">
        <NavDropdown.Item as={Link} to="/publishers">
        {t("Publishers")}
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link as={Link} to="/languages">
        {t("itemLanguages")}
      </Nav.Link>{" "}
    </Nav>
    <Nav>
      <NavDropdown
        title={get("name", getUserData())}
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item as={Link} to="#me">
          My data
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/logout">
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </>
);

const MenuLogout = ({ t }) => (
  <>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/login">
        {t("itemLogin")}
      </Nav.Link>{" "}
    </Nav>
    <Nav>
      <Nav.Link as={Link} to="/languages">
        {t("itemLanguages")}
      </Nav.Link>{" "}
    </Nav>
  </>
);

const NavBarMenu = (props) => {
  const { t } = useTranslation(["navBar"]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">
        <Image src={logo} width="50px" alt="Agenda" roundedCircle />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {hasToken() ? <MenuLogged t={t} /> : <MenuLogout t={t} />}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBarMenu;
