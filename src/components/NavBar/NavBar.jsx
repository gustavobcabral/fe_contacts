import React from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { get } from "lodash/fp";
import { getUserData, hasToken } from "../../utils/loginDataManager";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const MenuLogged = ({t}) => (
  <>
    <Nav className="mr-auto">
      <Nav.Link href="/contacts">Contacts</Nav.Link>
      <NavDropdown title="Administration" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/publishers">Publishers</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="/languages">{t("itemLanguages")}</Nav.Link>{" "}
    </Nav>
    <Nav>
      <NavDropdown
        title={get("name", getUserData())}
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item href="#me">My data</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </>
);

const MenuLogout = ({t}) => (
  <>
    <Nav className="mr-auto">
      <Nav.Link href="/login">{t("itemLogin")}</Nav.Link>{" "}
    </Nav>
    <Nav>
      <Nav.Link href="/languages">{t("itemLanguages")}</Nav.Link>{" "}
    </Nav>
  </>
);

const NavBarMenu = (props) => {
  const { t } = useTranslation(["navBar"]);

  return(
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Navbar.Brand href="#home">
      <Image src={logo} width="50px" alt="Agenda" roundedCircle />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      {hasToken() ? <MenuLogged t={t} /> : <MenuLogout t={t} />}
    </Navbar.Collapse>
  </Navbar>
);
}

export default NavBarMenu;
