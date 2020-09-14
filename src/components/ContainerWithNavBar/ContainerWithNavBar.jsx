import React from "react";
import { Container } from "react-bootstrap";
import NavBarMenu from "../NavBar/NavBar";

const ContainerWithNavBar = (props) => (
  <>
    <NavBarMenu />
    <Container fluid className="mt-2">{props.children}</Container>
  </>
);

export default ContainerWithNavBar;
