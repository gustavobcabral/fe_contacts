import React from "react";
import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";
import SideMenu from "../SideMenu/SideMenu";

const ContainerCRUD = (props) => (
  <Container fluid>
    <Row>
      <Col className="page-header">
        <h1>{props.title}</h1>
      </Col>
    </Row>
    <Row className="page-body">
      <Col xs={2}>
        <SideMenu />
      </Col>
      <Col xs={10}>
        <div>{props.children}</div>
      </Col>
    </Row>
  </Container>
);

export default ContainerCRUD;
