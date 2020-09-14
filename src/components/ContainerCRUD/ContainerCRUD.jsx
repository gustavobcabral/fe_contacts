import React from "react";
import "./styles.css";
import { Row, Col } from "react-bootstrap";
import SideMenu from "../SideMenu/SideMenu";
import ContainerWithNavBar from "../ContainerWithNavBar/ContainerWithNavBar";

const ContainerCRUD = (props) => (
  <ContainerWithNavBar>
    <Col className="page-header">
      <h1>{props.title}</h1>
    </Col>
    <Row>
      <Col lg={2} xs={12}>
        <SideMenu {...props} />
      </Col>
      <Col lg={10} xs={12}>
        <div>{props.children}</div>
      </Col>
    </Row>
  </ContainerWithNavBar>
);

export default ContainerCRUD;
