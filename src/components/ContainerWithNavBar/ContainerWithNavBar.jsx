import React from "react";
import { Container } from "react-bootstrap";
import NavBarMenu from "../NavBar/NavBar";

const ContainerWithNavBar = (props) => (
  <>
    <NavBarMenu />
    <Container fluid>{props.children}</Container>
  </>
);

export default ContainerWithNavBar;
