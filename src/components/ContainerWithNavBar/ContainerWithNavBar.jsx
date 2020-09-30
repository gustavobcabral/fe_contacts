import React from "react";
import { Container } from "react-bootstrap";
import NavBarMenu from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const ContainerWithNavBar = (props) => (
  <>
    <NavBarMenu {...props} />
    <Container fluid className="mt-2">{props.children}</Container>
    <Footer {...props} />
  </>
);

export default ContainerWithNavBar;
